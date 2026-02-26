"""
routes/sdg.py — GET /sdg-goals
Returns all 17 SDG goals for the frontend dropdown.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import SDGGoal
from schemas import SDGGoalSchema

router = APIRouter()


@router.get("", response_model=List[SDGGoalSchema])
def list_sdg_goals(db: Session = Depends(get_db)):
    """Return all SDG goals ordered by number."""
    return db.query(SDGGoal).order_by(SDGGoal.number).all()
