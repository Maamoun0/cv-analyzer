import fitz  # PyMuPDF
import docx
from pathlib import Path
from typing import Dict
import logging

class CVExtractor:
    @staticmethod
    def extract_text(file_path: Path) -> str:
        suffix = file_path.suffix.lower()
        if suffix == ".pdf":
            return CVExtractor._extract_from_pdf(file_path)
        elif suffix == ".docx":
            return CVExtractor._extract_from_docx(file_path)
        else:
            raise ValueError(f"Unsupported file type: {suffix}")

    @staticmethod
    def _extract_from_pdf(file_path: Path) -> str:
        text = ""
        try:
            with fitz.open(file_path) as doc:
                for page in doc:
                    text += page.get_text()
        except Exception as e:
            logging.error(f"PDF extraction error: {e}")
            raise
        return text

    @staticmethod
    def _extract_from_docx(file_path: Path) -> str:
        try:
            doc = docx.Document(file_path)
            return "\n".join([para.text for para in doc.paragraphs])
        except Exception as e:
            logging.error(f"DOCX extraction error: {e}")
            raise

    @staticmethod
    def segment_sections(text: str) -> Dict[str, str]:
        # Basic heuristic-based segmentation
        # In a real implementation, this would use NLP/LLM for better accuracy
        sections = {
            "summary": "",
            "experience": "",
            "education": "",
            "skills": "",
            "other": text
        }
        # Placeholder for actual segmentation logic
        return sections
