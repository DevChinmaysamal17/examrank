"""
utils/loader.py
---------------
Responsible for reading and caching the historical data JSON files
that back the prediction engine.

Design decisions:
  - Data is loaded once at first access and held in a module-level
    cache dictionary (simple, zero-dependency memoization).
  - Files are resolved relative to this file's location so the
    server can be launched from any working directory.
  - Validation is performed at load time so startup fails fast if
    a data file is malformed, rather than crashing at request time.
"""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import TypedDict

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Types
# ---------------------------------------------------------------------------

class DataPoint(TypedDict):
    """A single row in a historical data file."""

    marks: float
    percentile_min: float | None
    percentile_avg: float | None
    percentile_max: float | None
    rank_min: int | None
    rank_avg: int | None
    rank_max: int | None


# ---------------------------------------------------------------------------
# Internals
# ---------------------------------------------------------------------------

# Resolved path to the /data directory (sibling of /utils)
_DATA_DIR: Path = Path(__file__).resolve().parent.parent / "data"

# In-memory cache: exam_key → sorted list of DataPoints
_CACHE: dict[str, list[DataPoint]] = {}


def _validate_row(row: object, index: int, filename: str) -> DataPoint:
    """
    Assert that a JSON row has the required numeric fields.
    Raises ValueError with a descriptive message on failure.
    """
    if not isinstance(row, dict):
        raise ValueError(
            f"{filename}[{index}]: expected an object, got {type(row).__name__}."
        )

    if "marks" not in row:
        raise ValueError(f"{filename}[{index}]: missing required field: marks.")

    if not isinstance(row["marks"], (int, float)):
        raise ValueError(
            f"{filename}[{index}].marks: expected a number, "
            f"got {type(row['marks']).__name__}."
        )

    def _opt_float(key: str) -> "float | None":
        v = row.get(key)
        if v is None:
            return None
        if not isinstance(v, (int, float)):
            raise ValueError(
                f"{filename}[{index}].{key}: expected a number or null, "
                f"got {type(v).__name__}."
            )
        return float(v)

    def _opt_int(key: str) -> "int | None":
        v = row.get(key)
        if v is None:
            return None
        if not isinstance(v, (int, float)):
            raise ValueError(
                f"{filename}[{index}].{key}: expected a number or null, "
                f"got {type(v).__name__}."
            )
        return int(v)

    return DataPoint(
        marks=float(row["marks"]),
        percentile_min=_opt_float("percentile_min"),
        percentile_avg=_opt_float("percentile_avg"),
        percentile_max=_opt_float("percentile_max"),
        rank_min=_opt_int("rank_min"),
        rank_avg=_opt_int("rank_avg"),
        rank_max=_opt_int("rank_max"),
    )


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def load_exam_data(exam_key: str) -> list[DataPoint]:
    """
    Return the historical dataset for *exam_key*, loading from disk
    on the first call and returning the cached copy on subsequent calls.

    The returned list is always sorted ascending by marks.

    Args:
        exam_key: One of "jee", "mhtcet", "neet", "jeeadv".

    Raises:
        FileNotFoundError: If the corresponding JSON file does not exist.
        ValueError: If the JSON file is malformed or contains invalid rows.
        json.JSONDecodeError: If the file is not valid JSON.
    """
    if exam_key in _CACHE:
        return _CACHE[exam_key]

    filepath = _DATA_DIR / f"{exam_key}.json"

    if not filepath.exists():
        raise FileNotFoundError(
            f"Data file not found: {filepath}. "
            f"Expected a file named '{exam_key}.json' in the data/ directory."
        )

    logger.info("Loading data file: %s", filepath)

    with filepath.open("r", encoding="utf-8") as fh:
        raw: object = json.load(fh)

    if not isinstance(raw, list):
        raise ValueError(
            f"{filepath.name}: top-level value must be a JSON array, "
            f"got {type(raw).__name__}."
        )

    if len(raw) < 2:
        raise ValueError(
            f"{filepath.name}: dataset must contain at least 2 data points "
            f"for interpolation to work; found {len(raw)}."
        )

    validated: list[DataPoint] = [
        _validate_row(row, i, filepath.name) for i, row in enumerate(raw)
    ]

    # Always sort by marks so binary search assumptions hold
    validated.sort(key=lambda dp: dp["marks"])

    _CACHE[exam_key] = validated
    logger.info(
        "Loaded %d data points for exam '%s' (marks range: %s – %s).",
        len(validated),
        exam_key,
        validated[0]["marks"],
        validated[-1]["marks"],
    )
    return validated


def clear_cache() -> None:
    """
    Evict all cached datasets.
    Useful in tests or when data files are hot-reloaded.
    """
    _CACHE.clear()
    logger.info("Data cache cleared.")