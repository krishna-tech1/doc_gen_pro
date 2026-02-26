"""
routes/circular.py — POST /generate-circular
"""

import json
import os
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database import get_db
from schemas import CircularRequest, CircularResponse
from models import Event
from services.ai_service import generate_content
from services.document_service import generate_circular

try:
    from docx2pdf import convert
    import pythoncom
except ImportError:
    convert = None

router = APIRouter()


@router.post("", response_model=CircularResponse)
def create_circular(payload: CircularRequest, db: Session = Depends(get_db)):
    """
    1. Generate AI content for the circular.
    2. Persist an Event record (optional - continues if DB fails).
    3. Build a DOCX file.
    4. Return preview JSON + download URL.
    """
    context = {
        "event_name":  payload.event_name,
        "date":        payload.date,
        "department":  payload.department,
        "chief_guest": payload.chief_guest,
        "description": payload.description,
    }

    # ── AI generation (Only if description is not provided) ───────────────────
    ai_content = None
    if not payload.description:
        ai_content = generate_content("circular", context)

    # ── Persist to DB (optional) ──────────────────────────────────────────────
    event_id = None
    try:
        event = Event(
            title      = payload.event_name,
            department = payload.department,
            date       = payload.date,
            venue      = "College Premises",
            ai_content = json.dumps(ai_content) if ai_content else "Custom Body Used",
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        event_id = event.id
    except Exception as db_err:
        print(f"[Circular] DB error (non-fatal): {db_err}")
        db.rollback()

    # ── Generate DOCX & Convert to PDF ─────────────────────────────────────────
    doc_path = generate_circular(payload.model_dump(), ai_content)
    
    if convert:
        pdf_path = doc_path.replace('.docx', '.pdf')
        try:
            # Conversion happens in-process. Since we're running async/fastapi,
            # we should technically run this in a threadpool to not block the event loop.
            # COM interactions require apartment initialization per thread:
            pythoncom.CoInitialize()
            convert(doc_path, pdf_path)
            # Remove the docx to keep only pdf if desired, or skip it.
            filename = os.path.basename(pdf_path)
        except Exception as e:
            import traceback
            traceback.print_exc()
            with open("error_log.txt", "w") as f:
                f.write(traceback.format_exc())
            print(f"[Circular] PDF conversion error: {e}")
            filename = os.path.basename(doc_path) # Fallback to docx
    else:
        filename = os.path.basename(doc_path)

    return CircularResponse(
        message      = "Circular generated successfully.",
        event_id     = event_id or 0,
        preview      = ai_content,
        download_url = f"/generated/{filename}",
    )


@router.get("/download/{filename}")
def download_circular(filename: str):
    path = os.path.join("generated", filename)
    
    media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    if filename.endswith(".pdf"):
        media_type = "application/pdf"
        
    return FileResponse(
        path,
        media_type=media_type,
        filename=filename,
    )
