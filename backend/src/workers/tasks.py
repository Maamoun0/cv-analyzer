from src.workers.config import celery_app
from src.services.extractor import CVExtractor
from src.services.analyzer import CVAnalyzer
from src.services.storage import get_job_path
import asyncio
import logging

@celery_app.task(name="process_cv_analysis")
def process_cv_analysis(job_id: str, file_path: str, jd_text: str = None):
    logging.info(f"Starting analysis for job {job_id}")
    
    try:
        # 1. Extract Text
        extractor = CVExtractor()
        text = extractor.extract_text(file_path)
        
        # 2. Analyze (Async wrapper for sync Celery)
        analyzer = CVAnalyzer()
        loop = asyncio.get_event_loop()
        result = loop.run_until_complete(analyzer.analyze_cv(text, jd_text))
        
        # 3. Save result (In a real app, this would update a DB)
        # For MVP session-only, we might store it in a JSON file or Redis
        logging.info(f"Job {job_id} completed successfully")
        return result
        
    except Exception as e:
        logging.error(f"Job {job_id} failed: {e}")
        return {"error": str(e)}
