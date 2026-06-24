from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, status

from schemas.prediction import ExamKey, PredictionRequest, PredictionResponse
from services.predictor import predict

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/predict", tags=["JEE Main"])

_EXAM_KEY: ExamKey = "jee"
_MIN_MARKS: float = -75.0
_MAX_MARKS: float = 300.0


@router.post(
    "/jee",
    response_model=PredictionResponse,
    summary="Estimate JEE Main percentile and rank",
    description=(
        "Submit raw JEE Main marks (range −75 to 300) and receive an "
        "estimated percentile and all-India rank derived from historical "
        "normalization trends."
    ),
    responses={
        422: {"description": "Marks outside the valid range or non-numeric input."},
        500: {"description": "Internal server error (e.g. data file unavailable)."},
    },
)
def predict_jee(payload: PredictionRequest) -> PredictionResponse:
   
    marks = payload.marks

    if marks < _MIN_MARKS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"JEE Main marks cannot be less than {int(_MIN_MARKS)}. "
                f"Received: {marks}."
            ),
        )

    if marks > _MAX_MARKS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"JEE Main marks cannot exceed {int(_MAX_MARKS)}. "
                f"Received: {marks}."
            ),
        )

    try:
        result = predict(_EXAM_KEY, marks)
    except FileNotFoundError as exc:
        logger.error("JEE data file missing: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="JEE Main dataset is unavailable. Please try again later.",
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected error during JEE prediction: %s", exc)
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