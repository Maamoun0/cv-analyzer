# Feature Specification: CV Analyzer

**Feature Branch**: `001-cv-analyzer`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User description: "Production-ready CV Analyzer with AI-first architecture, multi-step analysis, ATS scoring, and job matching."

## Clarifications

### Session 2026-05-05

- Q: User Tier Limits (Free vs Pro) → A: Credit-based (2 free analyses total)
- Q: Data Persistence (Storage Strategy) → A: Local/Ephemeral (Filesystem storage)
- Q: AI Rewrite Workflow → A: Interactive Suggestions (Inline "Accept/Reject")
- Q: Error Handling Strategy (External APIs) → A: Graceful Degradation (Inform user + retry)
- Q: Data Retention Policy → A: Session-only (Results are ephemeral and lost after the browser session)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Instant CV Analysis & ATS Scoring (Priority: P1)

A user uploads their CV to understand why it might be rejected by automated systems. The system extracts text, analyzes it using AI, and provides a score with specific feedback.

**Why this priority**: This is the core value proposition. Without analysis, the tool has no purpose for the user.

**Independent Test**: Can be fully tested by uploading a standard PDF CV and receiving a score and at least 3 actionable suggestions.

**Acceptance Scenarios**:

1. **Given** a user is on the upload page, **When** they upload a valid PDF or DOCX CV, **Then** the system displays a "Processing" state and eventually shows an ATS score breakdown.
2. **Given** a processed CV, **When** the user views the results, **Then** they see specific sections for "Strengths", "Weaknesses", and "Formatting Suggestions".

---

### User Story 2 - Job-Specific Optimization (Priority: P2)

A user provides both their CV and a specific Job Description (JD) to see how well they match and identify missing keywords or skills.

**Why this priority**: High value for job seekers targeting specific roles, allowing them to tailor their CV.

**Independent Test**: Can be tested by providing a CV and a JD string; the system must return a "match percentage" and a "skill gap" list.

**Acceptance Scenarios**:

1. **Given** a user has an uploaded CV, **When** they paste a Job Description and click "Match", **Then** the system calculates a semantic similarity score.
2. **Given** a match result, **When** analyzing the "Skill Gap", **Then** the system lists specific keywords found in the JD but missing from the CV.

---

### User Story 3 - AI-Powered Content Improvement (Priority: P3)

A user wants to improve a specific weak section of their CV (e.g., Summary or Experience) based on AI suggestions.

**Why this priority**: Closes the loop from "finding problems" to "fixing them," increasing user retention.

**Independent Test**: Can be tested by selecting a "Weakness" suggestion and triggering a "Rewrite" action.

**Acceptance Scenarios**:

1. **Given** a CV analysis result with a identified weakness, **When** the user requests an "AI Rewrite", **Then** the system provides a revised version of that text that incorporates missing keywords.

---

### Edge Cases

- **Scanned Documents**: How does the system handle PDFs that are just images (no selectable text)? [Assumption: Basic OCR fallback provided]
- **Unsupported Languages**: How does the system handle languages other than English or Arabic? [Assumption: Detects language and informs user if unsupported]
- **Large Files**: What happens when a user uploads a file exceeding the size limit (e.g., 10MB)?
- **AI Service Downtime**: System MUST inform users of service issues and attempt up to 3 automatic retries with exponential backoff before reporting a final failure.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support file uploads in PDF and DOCX formats.
- **FR-002**: System MUST extract text from documents while preserving basic section hierarchy.
- **FR-003**: System MUST perform multi-step AI analysis: 1. Structure Extraction, 2. ATS Scoring, 3. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats).
- **FR-004**: System MUST calculate an ATS score based on: Section Completeness (20%), Keyword Match (40%), Formatting (20%), and Experience Relevance (20%).
- **FR-005**: System MUST support Job Description matching via semantic embeddings and cosine similarity.
- **FR-006**: System MUST support both Arabic and English languages for extraction and analysis.
- **FR-007**: System MUST handle long-running analysis tasks asynchronously via a background queue with persistent status tracking.
- **FR-010**: System MUST implement automatic retry logic for failed AI service calls to ensure process resilience.
- **FR-008**: System MUST allow users to view history of previous analyses performed within the current active session.
- **FR-009**: System MUST enforce a credit-based limit for Free users, allowing a maximum of 2 CV analyses total before requiring a Pro upgrade.

### Key Entities

- **CV Document**: Represents the physical file, its metadata, and the normalized extracted text.
- **Job Description**: The target job text provided by the user for comparison.
- **Analysis Result**: A collection of scores, skill gaps, and AI-generated suggestions linked to a CV and optionally a JD.
- **User Profile**: Contains user identification, historical analyses, and subscription tier.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users receive an initial ATS score within 15 seconds of completing a CV upload.
- **SC-002**: Text extraction accuracy (Word Error Rate) is less than 5% for standard professional CV layouts.
- **SC-003**: 75% of users who receive "Skill Gap" suggestions successfully re-upload an improved CV.
- **SC-004**: System successfully detects and processes 100% of English and Arabic documents without character encoding issues.

## Assumptions

- Users provide valid professional documents (not corrupted or password-protected).
- AI models (OpenAI/Claude) are available via API with stable response times.
- The MVP focuses on Individual users; B2B API features are deferred to a later phase.
- Data retention: Results are ephemeral and are not persisted beyond the active browser session.
- CV documents and analysis artifacts are stored on the local filesystem for the MVP.
- The "AI Rewrite" feature uses an interactive workflow where users review and "Accept/Reject" each suggested improvement.

