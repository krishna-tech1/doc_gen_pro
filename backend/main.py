"""
main.py — FastAPI application entry point.

Responsibilities:
  - Register all routers
  - Configure CORS
  - Create DB tables on startup
  - Seed SDG goals if not yet present
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

from database import engine, SessionLocal, Base
import models  # ensure all models are registered before create_all
from utils.sdg_seeder import seed_sdg_goals

# Route modules
from routes import circular, proposal, report, sdg

load_dotenv()

# ── App instance ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Institutional Document Automation System",
    description="Automates generation of Circulars, Proposals, and Event Reports.",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
frontend_origin = os.getenv("FRONTEND_ORIGIN", "")
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://doc-gen-pro.vercel.app",
]

# Add external origin if defined and not already in list
if frontend_origin and frontend_origin not in allowed_origins:
    allowed_origins.append(frontend_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Static files (uploaded images, generated docs) ────────────────────────────
os.makedirs("uploads", exist_ok=True)
os.makedirs("generated", exist_ok=True)
app.mount("/uploads",   StaticFiles(directory="uploads"),   name="uploads")
app.mount("/generated", StaticFiles(directory="generated"), name="generated")

# ── Startup: create tables + seed SDG data ────────────────────────────────────
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            seed_sdg_goals(db)
        finally:
            db.close()
        print("[Startup] Database tables created and SDG goals seeded.")
    except Exception as exc:
        print(f"[Startup] WARNING: Could not connect to database: {exc}")
        print("[Startup] App is running without a database. Set DATABASE_URL in .env to enable full functionality.")

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(circular.router, prefix="/generate-circular", tags=["Circular"])
app.include_router(proposal.router, prefix="/generate-proposal", tags=["Proposal"])
app.include_router(report.router,   prefix="/generate-report",   tags=["Report"])
app.include_router(sdg.router,      prefix="/sdg-goals",         tags=["SDG"])


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "Institutional Document Automation System is running."}