from fastapi import APIRouter
from src.workers.config import celery_app
from celery.result import AsyncResult

router = APIRouter()

@router.get("/analysis/{job_id}")
async def get_analysis(job_id: str):
    result = AsyncResult(job_id, app=celery_app)
    
    if result.ready():
        return {
            "job_id": job_id,
            "status": "COMPLETED",
            "result": result.result
        }
    
    return {
        "job_id": job_id,
        "status": result.status,
        "progress": 0.5  # Placeholder
    }
