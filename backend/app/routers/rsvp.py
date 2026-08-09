from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/rsvp", tags=["RSVP"])


@router.post("", response_model=schemas.RSVPOut, status_code=201)
def submit_rsvp(payload: schemas.RSVPCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_rsvp(db, payload)
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Could not save RSVP: {exc}")


@router.get("", response_model=list[schemas.RSVPOut])
def get_rsvps(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.list_rsvps(db, skip=skip, limit=limit)


@router.get("/summary", response_model=schemas.RSVPSummary)
def get_rsvp_summary(db: Session = Depends(get_db)):
    return crud.get_summary(db)
