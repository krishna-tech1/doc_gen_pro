"""
routes/proposal.py — POST /generate-proposal
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
from services.document_service import generate_proposal

router = APIRouter()


@router.post("", response_model=ProposalResponse)
def create_proposal(payload: ProposalRequest, db: Session = Depends(get_db)):
    """
    1. AI expands the short objectives into formal language.
    2. Persist an Event record (optional - continues if DB fails).
    3. Build a DOCX proposal.
    4. Return preview + download URL.
    """
    context = payload.model_dump()
    ai_content = None # Using fixed template now

    # ── Persist to DB (optional) ──────────────────────────────────────────────
    event_id = None
    final_title = payload.event_name or "Untitled Proposal"
    try:
        event = Event(
            title      = final_title,
            ai_content = json.dumps(ai_content),
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        event_id = event.id
    except Exception as db_err:
        print(f"[Proposal] DB error (non-fatal): {db_err}")
        db.rollback()

    doc_path = generate_proposal(payload.model_dump(), ai_content)
    filename = os.path.basename(doc_path)

    return ProposalResponse(
        message      = "Proposal generated successfully.",
        event_id     = event_id or 0,
        preview      = ai_content,
        download_url = f"/generated/{filename}",
    )


@router.get("/download/{filename}")
def download_proposal(filename: str):
    path = os.path.join("generated", filename)
    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )
