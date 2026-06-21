import math
from typing import Literal

from pydantic import BaseModel, Field, field_validator

class PredictionRequest(BaseModel):
    marks: float = Field(..., description="Candidate's raw marks for the exam.", examples=[140])

    @field_validator("marks")
    @classmethod
    def marks_must_be_finite(cls, v: float) -> float:
        if not math.isfinite(v):
            raise ValueError("marks must be a finite number.")
        return v

ConfidenceLabel = Literal["High", "Medium", "Low"]
ExamKey = Literal["jee", "mhtcet", "neet", "jeeadv"]


class PredictionResponse(BaseModel):
    exam: ExamKey = Field(..., description="Exam identifier.")
    marks: float = Field(..., description="Marks submitted by the candidate.")

    percentile_min: float | None = Field(default=None, ge=0.0, le=100.0, description="Lower-bound percentile estimate.")
    percentile_avg: float | None = Field(default=None, ge=0.0, le=100.0, description="Average percentile estimate.")
    percentile_max: float | None = Field(default=None, ge=0.0, le=100.0, description="Upper-bound percentile estimate.")

    rank_min: int | None = Field(default=None, ge=1, description="Best-case rank estimate.")
    rank_avg: int | None = Field(default=None, ge=1, description="Average rank estimate.")
    rank_max: int | None = Field(default=None, ge=1, description="Worst-case rank estimate.")

    confidence: ConfidenceLabel = Field(..., description="'High' | 'Medium' | 'Low'")
    message: str = Field(..., description="Human-readable summary.")

class ErrorResponse(BaseModel):
    detail: str = Field(..., description="Human-readable error message.")