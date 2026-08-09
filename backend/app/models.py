from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func

from .database import Base


class RSVP(Base):
    __tablename__ = "rsvps"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    guests = Column(Integer, nullable=False, default=1)
    attending = Column(Boolean, nullable=False, default=True)
    message = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
