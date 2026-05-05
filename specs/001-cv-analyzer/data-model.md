# Data Model: CV Analyzer

## Entities

### UserSession (Ephemeral)
- **ID**: UUID (primary key)
- **CreditsRemaining**: Integer (Default: 2)
- **ActiveJobs**: List of AnalysisJob IDs
- **CreatedAt**: Timestamp

### AnalysisJob
- **ID**: UUID
- **SessionID**: UUID (Relation)
- **Status**: Enum (PENDING, UPLOADING, PROCESSING, ANALYZING, COMPLETED, FAILED)
- **FileType**: Enum (PDF, DOCX)
- **FilePath**: String (Local temporary path)
- **Progress**: Float (0.0 to 1.0)
- **ErrorMessage**: String (Optional)

### CVData
- **JobID**: UUID (Relation)
- **RawText**: String
- **Sections**: JSON (Header, Experience, Education, Skills, Summary)
- **Language**: String (en/ar)

### AnalysisResult
- **JobID**: UUID (Relation)
- **ATSScore**: Integer (0-100)
- **ScoreBreakdown**: JSON (Completeness, Keywords, Formatting, Relevance)
- **Strengths**: List of Strings
- **Weaknesses**: List of Strings
- **Suggestions**: List of Objects { category, text, impact }
- **SkillGap**: List of Strings (if JD provided)

## State Transitions (AnalysisJob)
1. **PENDING**: Created upon file selection.
2. **UPLOADING**: File is being written to local storage.
3. **PROCESSING**: Text extraction and normalization in progress.
4. **ANALYZING**: AI models are generating scores and feedback.
5. **COMPLETED**: All results saved and ready for display.
6. **FAILED**: Encountered an unrecoverable error (e.g., corrupted file, API timeout after retries).

