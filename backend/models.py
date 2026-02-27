"""
models.py — SQLAlchemy ORM models.

Tables:
  sdg_goals  — static reference table for the 17 UN SDGs
  events     — core record for every generated document
  images     — uploaded images with optional geo-tag data
"""

from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, DateTime,
    Float, ForeignKey, func,
)
from sqlalchemy.orm import relationship
from database import Base


class SDGGoal(Base):
    """UN Sustainable Development Goals — seeded once at startup."""
    __tablename__ = "sdg_goals"

    id          = Column(Integer, primary_key=True, index=True)
    number      = Column(Integer, unique=True, nullable=False)
    name        = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)

    # back-ref
    events = relationship("Event", back_populates="sdg_goal")


class Event(Base):
    """Master record created whenever any document is generated."""
    __tablename__ = "events"

    id         = Column(Integer, primary_key=True, index=True)
    title      = Column(String(255), nullable=True)
    department = Column(String(120), nullable=True)
    date       = Column(String(50), nullable=True)   # store as ISO string
    venue      = Column(String(255), nullable=True)
    sdg_id     = Column(Integer, ForeignKey("sdg_goals.id"), nullable=True)
    ai_content = Column(Text, nullable=True)        # JSON blob of AI sections
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationships
    sdg_goal = relationship("SDGGoal", back_populates="events")
    images   = relationship("Image", back_populates="event", cascade="all, delete-orphan")


class Image(Base):
    """Images uploaded alongside an event report."""
    __tablename__ = "images"

    id            = Column(Integer, primary_key=True, index=True)
    event_id      = Column(Integer, ForeignKey("events.id"), nullable=False)
    image_path    = Column(String(512), nullable=False)
    latitude      = Column(Float, nullable=True)
    longitude     = Column(Float, nullable=True)
    location_name = Column(String(255), nullable=True)

    event = relationship("Event", back_populates="images")
