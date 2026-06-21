from __future__ import annotations

import bisect
import logging
import math
from dataclasses import dataclass

from utils.loader import DataPoint, load_exam_data

SMALL_GAP_MARKS: float = 5.0

EXACT_TOLERANCE: float = 0.5



logger = logging.getLogger(__name__)


SMALL_GAP_MARKS: float = 5.0

@dataclass(frozen=True)
class PredictionResult:
    percentile_avg: float | None   # clamped to [0.0, 100.0]
    percentile_min: float | None
    percentile_max: float | None
    rank_avg: int | None           # clamped to [1, ∞)
    rank_min: int | None
    rank_max: int | None
    confidence: str                # "High" | "Medium" | "Low"
    message: str

def _lerp(x0: float, y0: float, x1: float, y1: float, x: float) -> float:
    """
    Linear interpolation / extrapolation.

    Returns y such that (x, y) lies on the line through (x0, y0) and (x1, y1).
    Safe when x0 == x1 (returns y0 in that degenerate case).
    """
    if math.isclose(x0, x1):
        return y0
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0)


def _find_brackets(
    data: list[DataPoint], marks: float
) -> tuple[DataPoint, DataPoint, bool, bool]:
    """
    Locate the two data points that bracket *marks*.

    Returns:
        (lower, upper, is_exact, is_outside)

        is_exact   – marks is within EXACT_TOLERANCE of lower or upper.
        is_outside – marks is outside [data[0].marks, data[-1].marks].
    """
    # Extract sorted marks list for bisect
    marks_list = [dp["marks"] for dp in data]

    # bisect_left gives insertion index for marks
    idx = bisect.bisect_left(marks_list, marks)

    # --- Exact hit (or within tolerance) ---
    if 0 <= idx < len(data) and math.isclose(data[idx]["marks"], marks, abs_tol=EXACT_TOLERANCE):
        # Pick the immediately adjacent point for the "upper" bracket
        upper_idx = min(idx + 1, len(data) - 1)
        return data[idx], data[upper_idx], True, False

    # Also check the point just before the insertion index
    if idx > 0 and math.isclose(data[idx - 1]["marks"], marks, abs_tol=EXACT_TOLERANCE):
        lower_idx = idx - 1
        upper_idx = min(idx, len(data) - 1)
        return data[lower_idx], data[upper_idx], True, False

    # --- Below minimum ---
    if idx == 0:
        return data[0], data[1], False, True

    # --- Above maximum ---
    if idx >= len(data):
        return data[-2], data[-1], False, True

    # --- Normal interpolation bracket ---
    return data[idx - 1], data[idx], False, False


def _assign_confidence(
    is_exact: bool,
    is_outside: bool,
    lower: DataPoint,
    upper: DataPoint,
) -> str:
    """Return the appropriate confidence label."""
    if is_outside:
        return "Low"
    if is_exact:
        return "High"
    gap = upper["marks"] - lower["marks"]
    return "High" if gap <= SMALL_GAP_MARKS else "Medium"


def _build_message(confidence: str, is_outside: bool, is_exact: bool) -> str:
    """Generate a human-readable explanation for the result."""
    if is_exact:
        return "Estimated using an exact match in historical trend data."
    if is_outside:
        return (
            "Marks are outside the known historical data range. "
            "Estimate is extrapolated and carries low confidence."
        )
    if confidence == "High":
        return (
            "Marks fall very close to known historical data points. "
            "Estimate is highly reliable."
        )
    return (
        "Marks are interpolated between two historical data points. "
        "Estimated using historical trends."
    )


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def predict(exam_key: str, marks: float) -> PredictionResult:
    """
    Generate a percentile and rank prediction for *marks* in *exam_key*.

    Args:
        exam_key: Dataset identifier ("jee", "mhtcet", "neet", "jeeadv").
        marks:    Candidate's raw marks (already range-validated by the router).

    Returns:
        A frozen PredictionResult dataclass.

    Raises:
        FileNotFoundError: Propagated from loader if the data file is missing.
        ValueError: Propagated from loader if the data file is malformed.
    """
    data = load_exam_data(exam_key)

    lower, upper, is_exact, is_outside = _find_brackets(data, marks)

    def _interp_percentile(key: str) -> "float | None":
        lo, hi = lower.get(key), upper.get(key)
        if lo is None or hi is None:
            return None
        raw = _lerp(lower["marks"], lo, upper["marks"], hi, marks)
        return round(max(0.0, min(100.0, raw)), 2)

    def _interp_rank(key: str) -> "int | None":
        lo, hi = lower.get(key), upper.get(key)
        if lo is None or hi is None:
            return None
        raw = _lerp(lower["marks"], float(lo), upper["marks"], float(hi), marks)
        return max(1, round(raw))

    percentile_avg = _interp_percentile("percentile_avg")
    percentile_min = _interp_percentile("percentile_min")
    percentile_max = _interp_percentile("percentile_max")
    rank_avg       = _interp_rank("rank_avg")
    rank_min       = _interp_rank("rank_min")
    rank_max       = _interp_rank("rank_max")

    confidence = _assign_confidence(is_exact, is_outside, lower, upper)
    message = _build_message(confidence, is_outside, is_exact)

    logger.debug(
        "predict(exam=%s, marks=%s) → percentile_avg=%s, rank_avg=%s, confidence=%s",
        exam_key, marks, percentile_avg, rank_avg, confidence,
    )

    return PredictionResult(
        percentile_avg=percentile_avg,
        percentile_min=percentile_min,
        percentile_max=percentile_max,
        rank_avg=rank_avg,
        rank_min=rank_min,
        rank_max=rank_max,
        confidence=confidence,
        message=message,
    )