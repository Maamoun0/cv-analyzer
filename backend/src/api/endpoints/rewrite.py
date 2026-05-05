from fastapi import APIRouter
from pydantic import BaseModel
from src.services.rewriter import CVRewriter

router = APIRouter()

class RewriteRequest(BaseModel):
    section_text: str
    context: str

@router.post("/rewrite")
async def rewrite_cv_section(request: RewriteRequest):
    rewriter = CVRewriter()
    suggestion = await rewriter.suggest_rewrite(request.section_text, request.context)
    return {"suggested_text": suggestion}
