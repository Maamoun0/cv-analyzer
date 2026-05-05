from src.services.storage import save_upload, init_storage
from src.workers.tasks import process_cv_analysis
from src.services.credits import use_credit, get_remaining_credits
from uuid import uuid4
from fastapi import APIRouter, UploadFile, File, HTTPException, Header

router = APIRouter()

@router.post("/upload")
async def upload_cv(file: UploadFile = File(...), x_session_id: str = Header("default-session")):
    if get_remaining_credits(x_session_id) <= 0:
        raise HTTPException(status_code=429, detail="No credits remaining for this session.")
    
    init_storage()
    job_id = uuid4()
    
    # Save file
    content = await file.read()
    file_path = save_upload(job_id, content, file.filename)
    
    # Use credit
    use_credit(x_session_id)
    
    # Trigger background task
    process_cv_analysis.delay(str(job_id), str(file_path))
    
    return {"job_id": str(job_id), "status": "PROCESSING"}
