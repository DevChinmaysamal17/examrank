from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, status

from schemas.prediction import ExamKey, PredictionRequest, PredictionResponse
from services.predictor import predict

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/predict", tags=["NEET UG"])

_EXAM_KEY: ExamKey = "neet"
_MIN_MARKS: float = -180.0
_MAX_MARKS: float = 720.0


@router.post(
    "/neet",
    response_model=PredictionResponse,
    summary="Estimate NEET UG all-India rank",
    description=(
        "Submit raw NEET UG marks (range −180 to 720) and receive an "
        "estimated all-India rank based on historical result patterns."
    ),
    responses={
        422: {"description": "Marks outside the valid range or non-numeric input."},
        500: {"description": "Internal server error (e.g. data file unavailable)."},
    },
)
def predict_neet(payload: PredictionRequest) -> PredictionResponse:
    """
    Predict NEET UG all-India rank for the given marks.

    - **marks**: Raw score between −180 and 720.
    """
    marks = payload.marks

    if marks < _MIN_MARKS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"NEET marks cannot be less than {int(_MIN_MARKS)}. "
                f"Received: {marks}."
            ),
        )

    if marks > _MAX_MARKS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"NEET marks cannot exceed {int(_MAX_MARKS)}. "
                f"Received: {marks}."
            ),
        )

    try:
        result = predict(_EXAM_KEY, marks)
    except FileNotFoundError as exc:
        logger.error("NEET data file missing: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="NEET dataset is unavailable. Please try again later.",
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected error during NEET prediction: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while computing the prediction.",
        ) from exc

    return PredictionResponse(
        exam=_EXAM_KEY,
        marks=marks,
        percentile_min=result.percentile_min,
        percentile_avg=result.percentile_avg,
        percentile_max=result.percentile_max,
        rank_min=result.rank_min,
        rank_avg=result.rank_avg,
        rank_max=result.rank_max,
        confidence=result.confidence,
        message=result.message,
    )