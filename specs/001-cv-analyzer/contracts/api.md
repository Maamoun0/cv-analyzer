# API Contracts: CV Analyzer

## Base URL
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

## Endpoints

### 1. Upload CV
`POST /api/v1/upload`
- **Request**: Multipart form data (`file`: PDF/DOCX)
- **Response** (202 Accepted):
  ```json
  {
    "job_id": "uuid-v4",
    "status": "PENDING"
  }
  ```

### 2. Get Analysis Status/Results
`GET /api/v1/analysis/{job_id}`
- **Response**:
  ```json
  {
    "job_id": "uuid-v4",
    "status": "COMPLETED",
    "progress": 1.0,
    "result": {
      "ats_score": 85,
      "breakdown": { "keywords": 90, "formatting": 80 },
      "suggestions": [...],
      "cv_data": { "raw_text": "...", "sections": {} }
    }
  }
  ```

### 3. Match with Job Description
`POST /api/v1/match`
- **Request**:
  ```json
  {
    "job_id": "uuid-v4",
    "jd_text": "Required skills: Python, React..."
  }
  ```
- **Response**:
  ```json
  {
    "match_score": 0.78,
    "skill_gap": ["React"]
  }
  ```

### 4. AI Rewrite Section
`POST /api/v1/rewrite`
- **Request**:
  ```json
  {
    "section_text": "I like coding.",
    "context": "Professional summary for a senior role"
  }
  ```
- **Response**:
  ```json
  {
    "suggested_text": "Results-driven senior developer with expertise in scalable systems."
  }
  ```

## Error Codes
- `400`: Unsupported file type or file too large.
- `404`: Job ID not found.
- `429`: Credit limit reached (2 free analyses).
- `503`: AI Service unavailable after retries.

