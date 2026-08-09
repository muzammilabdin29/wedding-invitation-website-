from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class RSVPCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=120)
    guests: int = Field(..., ge=1, le=10)
    attending: bool
    message: str | None = Field(default=None, max_length=500)


class RSVPOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    guests: int
    attending: bool
    message: str | None
    created_at: datetime


class RSVPSummary(BaseModel):
    total_responses: int
    total_attending_guests: int
    accepted: int
    declined: int
