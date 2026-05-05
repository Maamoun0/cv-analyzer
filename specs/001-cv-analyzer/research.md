# Research & Technical Decisions: CV Analyzer

## Decision 1: Hybrid Tech Stack (Next.js + FastAPI)
**Status**: Confirmed
**Rationale**: Next.js 14 provides the best-in-class frontend experience and SEO, while FastAPI is essential for the Python-centric AI ecosystem (PyMuPDF, spaCy, LangChain).
**Alternatives Considered**: 
- **Full Next.js**: Rejected because Python libraries for PDF parsing and NLP are more robust than JS counterparts.
- **Django**: Rejected in favor of FastAPI's asynchronous performance for AI processing.

## Decision 2: Multi-Step AI Pipeline
**Status**: Confirmed
**Rationale**: Instead of a single large prompt, the system will use multiple smaller calls:
1. Extraction & Structuring
2. ATS Scoring & Section Analysis
3. SWOT & Suggestion Generation
This reduces hallucinations and allows for better error handling/retries at each step.
**Alternatives Considered**: Single prompt extraction (prone to data loss in complex layouts).

## Decision 3: Document Extraction Libraries
**Status**: Confirmed
**Decision**: PyMuPDF (PDF), python-docx (DOCX).
**Rationale**: These libraries are mature and handle complex layouts better than generic OCR for text-based documents. OCR (Tesseract) will remain a fallback for scanned images.

## Decision 4: Asynchronous Processing (Celery + Redis)
**Status**: Confirmed
**Rationale**: Processing a CV can take up to 15 seconds. Async processing prevents blocking the main thread and allows the frontend to poll or receive updates via WebSockets/SSE.

## Decision 5: Session-Only Storage
**Status**: Confirmed
**Rationale**: As per user clarification, results are ephemeral. This simplifies the MVP by removing the need for complex database migrations and user account persistence, focusing on immediate value delivery.

