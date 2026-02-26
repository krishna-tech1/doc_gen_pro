"""
routes/report.py — POST /generate-report

Accepts multipart form data because images are uploaded alongside text fields.
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
from services.document_service import generate_report
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
    1. Save uploaded images and extract GPS data.
    2. Fetch SDG details from DB (optional).
    3. Generate AI-improved formal summary.
    4. Persist Event + Image records (optional - continues if DB fails).
    5. Build and return DOCX report.
    """
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # ── Save images & extract geo-data ────────────────────────────────────────
    saved_images: List[dict] = []
    saved_paths:  List[str]  = []

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
        saved_paths.append(dest)

    # ── SDG lookup ────────────────────────────────────────────────────────────
    sdg = None
    sdg_description = ""
    sdg_name        = ""
    sdg_number      = ""
    
    try:
        sdg = db.query(SDGGoal).filter(SDGGoal.id == sdg_id).first()
        sdg_description = sdg.description if sdg else ""
        sdg_name        = sdg.name        if sdg else ""
        sdg_number      = sdg.number      if sdg else ""
    except Exception as db_err:
        print(f"[Report] SDG lookup error: {db_err}")

    # derive location name from first image with GPS data (fallback: On Campus)
    location_name = next(
        (img["location_name"] for img in saved_images if img["location_name"]),
        "On Campus",
    )

    # ── AI generation ─────────────────────────────────────────────────────────
    context = {
        "event_title":      event_title,
        "summary":          summary,
        "num_participants": str(num_participants),
        "sdg_goal":         f"SDG {sdg_number} – {sdg_name}",
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
        
        # ── Persist Images ────────────────────────────────────────────────────────
        for img in saved_images:
            db.add(Image(
                event_id      = event.id,
                image_path    = img["path"],
                latitude      = img["latitude"],
                longitude     = img["longitude"],
                location_name = img["location_name"],
            ))
        db.commit()
        event_id = event.id
    except Exception as db_err:
        print(f"[Report] DB error (non-fatal): {db_err}")
        db.rollback()

    # ── Generate DOCX ─────────────────────────────────────────────────────────
    report_data = {
        "event_title":      event_title,
        "summary":          summary,
        "num_participants": num_participants,
        "date":             date or "",
        "location_name":    location_name,
        "sdg_number":       sdg_number,
        "sdg_name":         sdg_name,
    }
    doc_path = generate_report(report_data, ai_content, saved_paths, sdg_description)
    filename = os.path.basename(doc_path)

    return {
        "message":      "Event report generated successfully.",
        "event_id":     event_id or 0,
        "preview":      ai_content,
        "location":     location_name,
        "download_url": f"/generated/{filename}",
    }


@router.get("/download/{filename}")
def download_report(filename: str):
    path = os.path.join("generated", filename)
    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )
