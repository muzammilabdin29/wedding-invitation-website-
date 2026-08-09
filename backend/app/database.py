import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Default to a local SQLite file so the project runs with zero external
# services. Set DATABASE_URL (e.g. postgresql://user:pass@host/db) to use
# Postgres/MySQL/etc in production.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data/wedding.db")

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}
    os.makedirs("./data", exist_ok=True)

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
