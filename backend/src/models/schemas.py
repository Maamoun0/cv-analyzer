from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime

class JobStatus(str, Enum):
    PENDING = "PENDING"
    UPLOADING = "UPLOADING"
    PROCESSING = "PROCESSING"
    ANALYZING = "ANALYZING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class AnalysisResultSchema(BaseModel):
    ats_score: int
    breakdown: Dict[str, int]
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[Dict[str, str]]
    skill_gap: Optional[List[str]] = None

class AnalysisJobSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    status: JobStatus = JobStatus.PENDING
    progress: float = 0.0
    error_message: Optional[str] = None
    result: Optional[AnalysisResultSchema] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserSessionSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    credits_remaining: int = 2
    active_jobs: List[UUID] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
