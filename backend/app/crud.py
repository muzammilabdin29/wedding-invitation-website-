from sqlalchemy.orm import Session
from sqlalchemy import func

from . import models, schemas


def create_rsvp(db: Session, rsvp: schemas.RSVPCreate) -> models.RSVP:
    db_rsvp = models.RSVP(
        full_name=rsvp.full_name.strip(),
        guests=rsvp.guests,
        attending=rsvp.attending,
        message=rsvp.message,
    )
    db.add(db_rsvp)
    db.commit()
    db.refresh(db_rsvp)
    return db_rsvp


def list_rsvps(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.RSVP)
        .order_by(models.RSVP.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_summary(db: Session) -> dict:
    total_responses = db.query(func.count(models.RSVP.id)).scalar() or 0
    accepted = (
        db.query(func.count(models.RSVP.id))
        .filter(models.RSVP.attending.is_(True))
        .scalar()
        or 0
    )
    declined = total_responses - accepted
    total_attending_guests = (
        db.query(func.coalesce(func.sum(models.RSVP.guests), 0))
        .filter(models.RSVP.attending.is_(True))
        .scalar()
        or 0
    )
    return {
        "total_responses": total_responses,
        "total_attending_guests": total_attending_guests,
        "accepted": accepted,
        "declined": declined,
    }
