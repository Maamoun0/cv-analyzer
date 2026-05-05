from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.services.matching import JobMatcher
from src.services.extractor import CVExtractor
from src.services.storage import get_job_path
import os

router = APIRouter()

class MatchRequest(BaseModel):
    job_id: str
    jd_text: str

@router.post("/match")
async def match_cv_to_jd(request: MatchRequest):
    # 1. Find the CV file
    from uuid import UUID
    job_dir = get_job_path(UUID(request.job_id))
    if not job_dir.exists():
        raise HTTPException(status_code=404, detail="Job not found or file expired.")
    
    # Get the first file in the directory (the CV)
    files = list(job_dir.glob("*"))
    if not files:
        raise HTTPException(status_code=404, detail="CV file not found.")
    
    file_path = files[0]
    
    # 2. Extract text again (simplification for MVP instead of a DB)
    extractor = CVExtractor()
    text = extractor.extract_text(file_path)
    
    # 3. Perform matching
    matcher = JobMatcher()
    result = await matcher.calculate_match(text, request.jd_text)
    
    return result
