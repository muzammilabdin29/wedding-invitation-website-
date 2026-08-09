import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import rsvp

# Create tables on startup (fine for SQLite / small projects; use Alembic
# migrations for larger production databases).
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Aarav & Diya Wedding Invitation API",
    description="Backend API powering the wedding invitation website (RSVP handling).",
    version="1.0.0",
)

# Configure allowed origins via env var, comma separated. Defaults to "*"
# for local development.
origins_env = os.getenv("CORS_ORIGINS", "*")
origins = ["*"] if origins_env == "*" else [o.strip() for o in origins_env.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rsvp.router)


@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "wedding-invitation-api"}


@app.get("/", tags=["Health"])
def root():
    return {"message": "Aarav & Diya Wedding Invitation API is running. See /docs for API docs."}
