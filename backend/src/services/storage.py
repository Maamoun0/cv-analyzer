import os
import shutil
from pathlib import Path
from uuid import UUID

STORAGE_PATH = Path(os.getenv("LOCAL_STORAGE_PATH", "./storage"))

def init_storage():
    STORAGE_PATH.mkdir(parents=True, exist_ok=True)

def save_upload(file_id: UUID, content: bytes, filename: str) -> Path:
    job_dir = STORAGE_PATH / str(file_id)
    job_dir.mkdir(parents=True, exist_ok=True)
    file_path = job_dir / filename
    with open(file_path, "wb") as f:
        f.write(content)
    return file_path

def get_job_path(file_id: UUID) -> Path:
    return STORAGE_PATH / str(file_id)

def cleanup_job(file_id: UUID):
    job_dir = get_job_path(file_id)
    if job_dir.exists():
        shutil.rmtree(job_dir)
