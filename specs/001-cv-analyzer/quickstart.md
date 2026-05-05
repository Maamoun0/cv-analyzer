# Quickstart Guide: CV Analyzer

## Prerequisites
- Node.js 18+ (for Next.js)
- Python 3.11+ (for FastAPI)
- Redis server (for Celery)
- OpenAI & Anthropic API Keys

## Local Setup

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env      # Add your API keys
uvicorn src.api.main:app --reload
```

### 2. Worker (Celery)
```bash
# In a new terminal
cd backend
celery -A src.workers.tasks worker --loglevel=info
```

### 3. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## First Analysis
1. Open `http://localhost:3000`.
2. Upload a sample CV (PDF or DOCX).
3. Wait for the processing to complete (approx. 10-15s).
4. View your ATS score and AI suggestions.

## Development Workflow
- **Spec**: `specs/001-cv-analyzer/spec.md`
- **Design**: `specs/001-cv-analyzer/plan.md`
- **Tasks**: `specs/001-cv-analyzer/tasks.md` (to be generated)

