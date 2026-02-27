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
    event_name:  Optional[str]  = Field(None, example="Annual Sports Day")
    date:        Optional[str]  = Field(None, example="2025-03-15")
    time:        Optional[str]  = Field(None, example="09:00 AM")
    department:  Optional[str]  = Field(None, example="Physical Education")
    chief_guest: Optional[str]  = Field(None, example="Dr. A. Ramesh, Principal")
    description: Optional[str]  = Field(None, example="Custom body content for the circular.")


class CircularResponse(BaseModel):
    message:     str
    event_id:    int
    preview:     Optional[dict] = None  # AI-generated content sections
    download_url: str


# ─── Proposal ────────────────────────────────────────────────────────────────

class ProposalRequest(BaseModel):
    proposal_date:    Optional[str] = Field(None, example="2025-03-01")
    from_name:        Optional[str] = Field(None, example="Dr. J. Doe")
    from_designation: Optional[str] = Field(None, example="Assistant Professor")
    department:       Optional[str] = Field(None, example="BCA")
    event_name:       Optional[str] = Field(None, example="Workshop on AI")
    event_topic:      Optional[str] = Field(None, example="Machine Learning")
    target_audience:  Optional[str] = Field(None, example="All BCA Students")
    event_date:       Optional[str] = Field(None, example="2025-03-15")
    event_time:       Optional[str] = Field(None, example="10:00 AM")
    venue:            Optional[str] = Field(None, example="College Auditorium")
    resource_person:  Optional[str] = Field(None, example="Mr. X, Industry Expert")
    short_description: Optional[str] = Field(None, example="Practical training on ML models.")


class ProposalResponse(BaseModel):
    message:      str
    event_id:     int
    preview:      Optional[dict] = None
    download_url: str


# ─── Event Report ────────────────────────────────────────────────────────────

class ReportResponse(BaseModel):
    message:      str
    event_id:     int
    preview:      Optional[dict] = None
    download_url: str


# ─── Image meta (returned after upload) ───────────────────────────────────────

class ImageMeta(BaseModel):
    image_path:    str
    latitude:      Optional[float] = None
    longitude:     Optional[float] = None
    location_name: Optional[str]   = None

    model_config = {"from_attributes": True}
