"""
UPDATED ROUTES REFERENCE
Complete updated route files using the template system

Copy-paste ready examples for your routes.
"""

# ============================================================================
# UPDATED routes/circular.py
# ============================================================================

UPDATED_CIRCULAR_PY = '''
"""
routes/circular.py — POST /generate-circular using template system
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
from services.template_processor import process_circular_template

router = APIRouter()


@router.post("", response_model=CircularResponse)
def create_circular(payload: CircularRequest, db: Session = Depends(get_db)):
    """
    Generate institutional circular using template system.
    
    1. Generate AI content for the circular.
    2. Persist an Event record (optional - continues if DB fails).
    3. Build DOCX using template system.
    4. Return preview JSON + download URL.
    """
    context = {
        "title":       payload.title,
        "date":        payload.date,
        "time":        payload.time,
        "venue":       payload.venue,
        "department":  payload.department,
        "chief_guest": payload.chief_guest,
    }

    # ── AI generation ─────────────────────────────────────────────────────────
    ai_content = generate_content("circular", context)

    # ── Persist to DB (optional) ──────────────────────────────────────────────
    event_id = None
    try:
        event = Event(
            title      = payload.title,
            department = payload.department,
            date       = payload.date,
            venue      = payload.venue,
            ai_content = json.dumps(ai_content),
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        event_id = event.id
    except Exception as db_err:
        print(f"[Circular] DB error (non-fatal): {db_err}")
        db.rollback()

    # ── Generate DOCX using template ──────────────────────────────────────────
    doc_path = process_circular_template(
        title=payload.title,
        date=payload.date,
        time=payload.time,
        venue=payload.venue,
        department=payload.department,
        chief_guest=payload.chief_guest or "Faculty Coordinator",
        ai_content=ai_content
    )
    
    filename = os.path.basename(doc_path)

    return CircularResponse(
        message      = "Circular generated successfully.",
        event_id     = event_id or 0,
        preview      = ai_content,
        download_url = f"/generated/{filename}",
    )


@router.get("/download/{filename}")
def download_circular(filename: str):
    """Download generated circular."""
    path = os.path.join("generated", filename)
    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )
'''

# ============================================================================
# UPDATED routes/proposal.py
# ============================================================================

UPDATED_PROPOSAL_PY = '''
"""
routes/proposal.py — POST /generate-proposal using template system
"""

import json
import os
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database import get_db
from schemas import ProposalRequest, ProposalResponse
from models import Event
from services.ai_service import generate_content
from services.template_processor import process_proposal_template

router = APIRouter()


@router.post("", response_model=ProposalResponse)
def create_proposal(payload: ProposalRequest, db: Session = Depends(get_db)):
    """
    Generate event proposal using template system.
    
    1. AI expands objectives into formal language.
    2. Persist Event record (optional - continues if DB fails).
    3. Build DOCX using template system.
    4. Return preview + download URL.
    """
    context = {
        "event_name":      payload.event_name,
        "objectives":      payload.objectives,
        "target_audience": payload.target_audience,
        "budget":          str(payload.budget),
    }

    ai_content = generate_content("event proposal", context)

    # ── Persist to DB (optional) ──────────────────────────────────────────────
    event_id = None
    try:
        event = Event(
            title      = payload.event_name,
            ai_content = json.dumps(ai_content),
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        event_id = event.id
    except Exception as db_err:
        print(f"[Proposal] DB error (non-fatal): {db_err}")
        db.rollback()

    # ── Generate DOCX using template ──────────────────────────────────────────
    doc_path = process_proposal_template(
        event_name=payload.event_name,
        objectives=payload.objectives,
        target_audience=payload.target_audience,
        budget=payload.budget,
        ai_content=ai_content
    )
    
    filename = os.path.basename(doc_path)

    return ProposalResponse(
        message      = "Proposal generated successfully.",
        event_id     = event_id or 0,
        preview      = ai_content,
        download_url = f"/generated/{filename}",
    )


@router.get("/download/{filename}")
def download_proposal(filename: str):
    """Download generated proposal."""
    path = os.path.join("generated", filename)
    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )
'''

# ============================================================================
# UPDATED routes/report.py (Simplified version)
# ============================================================================

UPDATED_REPORT_PY = '''
"""
routes/report.py — POST /generate-report using template system
"""

from __future__ import annotations
import json
import os
import shutil
import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, Form, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database import get_db
from models import Event, Image, SDGGoal
from services.ai_service import generate_content
from services.template_processor import process_report_template
from services.geo_service import extract_gps, reverse_geocode

router = APIRouter()
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "uploads")


@router.post("")
async def create_report(
    event_title:      str            = Form(...),
    summary:          str            = Form(...),
    num_participants: int            = Form(...),
    sdg_id:           int            = Form(...),
    date:             Optional[str]  = Form(None),
    images:           List[UploadFile] = File(default=[]),
    db:               Session        = Depends(get_db),
):
    """
    Generate event report using template system.
    
    1. Save uploaded images and extract GPS data.
    2. Fetch SDG details from DB (optional).
    3. Generate AI-improved formal summary.
    4. Build DOCX using template system.
    """
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # ── Save images & extract geo-data ────────────────────────────────────────
    saved_images: List[dict] = []
    
    for upload in images:
        ext      = os.path.splitext(upload.filename)[1] or ".jpg"
        filename = f"{uuid.uuid4().hex}{ext}"
        dest     = os.path.join(UPLOAD_DIR, filename)

        with open(dest, "wb") as f:
            shutil.copyfileobj(upload.file, f)

        lat, lon       = extract_gps(dest)
        location_name  = reverse_geocode(lat, lon) if lat and lon else None

        saved_images.append({
            "path":          dest,
            "latitude":      lat,
            "longitude":     lon,
            "location_name": location_name,
        })

    # ── SDG lookup ────────────────────────────────────────────────────────────
    sdg = None
    try:
        sdg = db.query(SDGGoal).filter(SDGGoal.id == sdg_id).first()
    except Exception as db_err:
        print(f"[Report] SDG lookup error: {db_err}")

    location_name = next(
        (img["location_name"] for img in saved_images if img["location_name"]),
        "On Campus",
    )

    # ── AI generation ─────────────────────────────────────────────────────────
    context = {
        "event_title":      event_title,
        "summary":          summary,
        "num_participants": str(num_participants),
        "sdg_goal":         f"SDG {sdg.number} – {sdg.name}" if sdg else "",
        "location":         location_name,
    }
    ai_content = generate_content("event report", context)

    # ── Persist Event ─────────────────────────────────────────────────────────
    event_id = None
    try:
        event = Event(
            title      = event_title,
            date       = date,
            venue      = location_name,
            sdg_id     = sdg_id,
            ai_content = json.dumps(ai_content),
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        event_id = event.id

        # Persist images
        for img in saved_images:
            db.add(Image(
                event_id      = event.id,
                image_path    = img["path"],
                latitude      = img["latitude"],
                longitude     = img["longitude"],
                location_name = img["location_name"],
            ))
        db.commit()

    except Exception as db_err:
        print(f"[Report] DB error (non-fatal): {db_err}")
        db.rollback()

    # ── Generate DOCX using template ──────────────────────────────────────────
    doc_path = process_report_template(
        event_title=event_title,
        summary=summary,
        num_participants=num_participants,
        sdg_info={
            'number': sdg.number if sdg else '',
            'title': sdg.name if sdg else '',
            'description': sdg.description if sdg else ''
        },
        ai_content=ai_content,
        location=location_name
    )
    
    filename = os.path.basename(doc_path)

    return {
        "message":      "Report generated successfully.",
        "event_id":     event_id or 0,
        "preview":      ai_content,
        "download_url": f"/generated/{filename}",
    }


@router.get("/download/{filename}")
def download_report(filename: str):
    """Download generated report."""
    path = os.path.join("generated", filename)
    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )
'''

if __name__ == '__main__':
    print(__doc__)
    print("\n" + "="*70)
    print("COPY THESE UPDATED ROUTES")
    print("="*70)
