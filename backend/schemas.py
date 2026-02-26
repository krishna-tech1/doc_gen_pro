"""
schemas.py — Pydantic v2 request / response schemas.
All schemas follow the naming convention: <Entity><Action>Schema.
"""

from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


# ─── SDG ─────────────────────────────────────────────────────────────────────

class SDGGoalSchema(BaseModel):
    id:          int
    number:      int
    name:        str
    description: str

    model_config = {"from_attributes": True}


# ─── Circular ────────────────────────────────────────────────────────────────

class CircularRequest(BaseModel):
    event_name:  str            = Field(..., example="Annual Sports Day")
    date:        str            = Field(..., example="2025-03-15")
    end_date:    Optional[str]  = Field(None, example="2025-03-16")
    time:        Optional[str]  = Field(None, example="09:00 AM")
    department:  str            = Field(..., example="Physical Education")
    chief_guest: str            = Field(..., example="Dr. A. Ramesh, Principal")
    description: Optional[str]  = Field(None, example="Custom body content for the circular.")


class CircularResponse(BaseModel):
    message:     str
    event_id:    int
    preview:     dict  # AI-generated content sections
    download_url: str


# ─── Proposal ────────────────────────────────────────────────────────────────

class ProposalRequest(BaseModel):
    event_name:      str   = Field(..., example="National Science Symposium")
    objectives:      str   = Field(..., example="Promote research culture among students")
    target_audience: str   = Field(..., example="Undergraduate and postgraduate students")
    budget:          float = Field(..., example=50000.0)


class ProposalResponse(BaseModel):
    message:      str
    event_id:     int
    preview:      dict
    download_url: str


# ─── Event Report ────────────────────────────────────────────────────────────

class ReportResponse(BaseModel):
    message:      str
    event_id:     int
    preview:      dict
    download_url: str


# ─── Image meta (returned after upload) ───────────────────────────────────────

class ImageMeta(BaseModel):
    image_path:    str
    latitude:      Optional[float] = None
    longitude:     Optional[float] = None
    location_name: Optional[str]   = None

    model_config = {"from_attributes": True}
