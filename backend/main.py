"""
main.py
-------
ExamRank API – application entry point.

Responsibilities:
  - Instantiate the FastAPI application with metadata.
  - Configure CORS middleware.
  - Register all exam prediction routers.
  - Expose the root health-check endpoint.
  - Pre-warm the data cache on startup so the first real request
    is not penalised by file I/O.

Run locally:
    uvicorn main:app --reload --port 8000
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import jee, jeeadv, mhtcet, neet
from utils.loader import load_exam_data

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Startup / shutdown lifecycle
# ---------------------------------------------------------------------------

_EXAM_KEYS = ("jee", "mhtcet", "neet", "jeeadv")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Pre-load all JSON datasets into the in-memory cache during startup.
    This converts file-I/O latency from the first request to startup time,
    giving every prediction endpoint a consistently fast response.
    """
    logger.info("ExamRank API starting up — pre-warming data cache …")
    for key in _EXAM_KEYS:
        try:
            data = load_exam_data(key)
            logger.info("  ✓  %-10s  %d data points loaded.", key, len(data))
        except Exception as exc:  # noqa: BLE001
            # Log the error but do not abort startup — a missing data file
            # for one exam should not prevent the others from working.
            logger.error("  ✗  %-10s  Failed to load: %s", key, exc)

    logger.info("ExamRank API is ready.")
    yield
    logger.info("ExamRank API shutting down.")


# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="ExamRank API",
    description=(
        "Marks-to-percentile and marks-to-rank prediction API for Indian "
        "entrance examinations (JEE Main, MHT-CET, NEET, JEE Advanced). "
        "Estimates are based on historical result trend data and are not "
        "affiliated with NTA, IIT, or any official exam authority."
    ),
    version="1.0.0",
    contact={
        "name": "ExamRank",
        "url": "https://examrank.in",
    },
    license_info={
        "name": "MIT",
    },
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Vite dev server
        "http://127.0.0.1:3000",  # Alternate loopback form
        "https://examrank.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------

app.include_router(jee.router)
app.include_router(mhtcet.router)
app.include_router(neet.router)
app.include_router(jeeadv.router)

# ---------------------------------------------------------------------------
# Root endpoint
# ---------------------------------------------------------------------------

@app.get(
    "/",
    summary="Health check",
    description="Returns the running status and service name. Use this to verify the API is reachable.",
    tags=["Health"],
)
def root() -> JSONResponse:
    """Lightweight liveness probe — no database or file I/O involved."""
    return JSONResponse(
        content={
            "status": "running",
            "service": "ExamRank API",
        }
    )