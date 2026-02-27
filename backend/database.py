"""
database.py — SQLAlchemy engine + session factory for Neon PostgreSQL.
SSL is enforced via connect_args so that plain psycopg2 URLs work too.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load variables from the .env file sitting next to this module
load_dotenv()

DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./fallback.db")

if not os.getenv("DATABASE_URL"):
    print("[Database] WARNING: DATABASE_URL not found in .env. Using local SQLite.")

# Neon requires SSL; inject sslmode if not already present in the URL
connect_args: dict = {}
if not DATABASE_URL.startswith("sqlite"):
    if "neon.tech" in DATABASE_URL or "sslmode" not in DATABASE_URL:
        connect_args["sslmode"] = "require"

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,          # keeps the connection healthy on long idle
    pool_size=5,
    max_overflow=10,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# ── Dependency injected into every route that needs a DB session ──────────────
def get_db():
    """Yield a database session and always close it afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()