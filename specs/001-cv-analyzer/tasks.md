---

description: "Task list for CV Analyzer implementation"
---

# Tasks: CV Analyzer

**Input**: Design documents from `/specs/001-cv-analyzer/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `backend/` and `frontend/` project directories
- [ ] T002 Initialize FastAPI project in `backend/` with dependencies (PyMuPDF, python-docx, celery, redis, openai, anthropic)
- [ ] T003 Initialize Next.js 14 project in `frontend/` with shadcn/ui and Tailwind CSS
- [ ] T004 [P] Configure `.env` templates for both `backend/` and `frontend/`
- [ ] T005 [P] Setup basic layout and theme in `frontend/src/app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T006 [P] Implement Redis connection and Celery worker configuration in `backend/src/workers/config.py`
- [x] T007 [P] Setup local storage directory and helper functions in `backend/src/services/storage.py`
- [x] T008 [P] Implement base API routing and shared error handlers in `backend/src/api/main.py`
- [x] T009 Create Pydantic models for `UserSession` and `AnalysisJob` in `backend/src/models/schemas.py`
- [x] T010 [P] Implement basic API client with fetch/axios in `frontend/src/services/api.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Instant CV Analysis & ATS Scoring (Priority: P1) 🎯 MVP

**Goal**: Allow users to upload a CV and receive an instant ATS score and SWOT analysis.

**Independent Test**: Upload a valid PDF to `/api/v1/upload`, poll `/api/v1/analysis/{id}`, and verify the final `AnalysisResult` contains a score and suggestions.

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement CV text extraction service (PDF/DOCX) in `backend/src/services/extractor.py`
- [x] T012 [P] [US1] Implement multi-step AI analysis pipeline (Extraction -> Scoring -> SWOT) in `backend/src/services/analyzer.py`
- [x] T013 [US1] Create Celery task for processing analysis in `backend/src/workers/tasks.py`
- [x] T014 [US1] Implement `/api/v1/upload` endpoint in `backend/src/api/endpoints/upload.py`
- [x] T015 [US1] Implement `/api/v1/analysis/{job_id}` endpoint in `backend/src/api/endpoints/analysis.py`
- [x] T016 [US1] Build upload component with file validation in `frontend/src/components/UploadForm.tsx`
- [x] T017 [US1] Create Results Dashboard with ATS score visualization in `frontend/src/components/AnalysisDashboard.tsx`
- [x] T018 [US1] Implement session-based credit tracking (2 free) in `backend/src/services/credits.py`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Job-Specific Optimization (Priority: P2)

**Goal**: Compare CV against a Job Description to find match scores and skill gaps.

**Independent Test**: Provide a JobID and a JD string to `/api/v1/match` and verify return of a match percentage and missing keywords.

### Implementation for User Story 2

- [x] T019 [P] [US2] Implement semantic embedding and cosine similarity logic in `backend/src/services/matching.py`
- [x] T020 [US2] Implement `/api/v1/match` endpoint in `backend/src/api/endpoints/match.py`
- [x] T021 [US2] Create Job Description input field and match results UI in `frontend/src/components/JobMatcher.tsx`
- [x] T022 [US2] Integrate skill gap visualization in `frontend/src/components/SkillGapList.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - AI-Powered Content Improvement (Priority: P3)

**Goal**: Interactive "Accept/Reject" workflow for AI-suggested CV rewrites.

**Independent Test**: Trigger a rewrite for a text block, see the suggestion, and verify it can be "accepted" into the local view.

### Implementation for User Story 3

- [x] T023 [P] [US3] Implement AI rewrite service with context-aware prompting in `backend/src/services/rewriter.py`
- [x] T024 [US3] Implement `/api/v1/rewrite` endpoint in `backend/src/api/endpoints/rewrite.py`
- [x] T025 [US3] Create interactive rewrite component with "Accept/Reject" buttons in `frontend/src/components/RewriteTool.tsx`
- [x] T026 [US3] Implement local session-only CV state management for edits in `frontend/src/store/cvStore.ts`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T027 [P] Implement automatic retry logic for failed AI calls in `backend/src/services/ai_client.py`
- [x] T028 Add loading skeletons and transition animations in `frontend/src/components/ui/`
- [x] T029 Implement responsive design tweaks for mobile CV viewing
- [x] T030 Final validation run of `quickstart.md` local setup

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T001-T003) - BLOCKS all user stories.
- **User Story 1 (P1)**: Depends on Foundational (T006-T010).
- **User Story 2 (P2)**: Depends on US1 (T011-T015) for extracted CV data.
- **User Story 3 (P3)**: Depends on US1 (T011-T015) for analysis context.
- **Polish (Final Phase)**: Depends on all user stories.

### Parallel Opportunities

- **T004, T005** can run while backend/frontend are being initialized.
- **T006, T007, T008** are parallelizable foundational backend tasks.
- **T011, T012** (Core AI services) can be developed in parallel.
- **T016, T017** (Frontend UI) can be developed in parallel once foundational API client (T010) is ready.
- Once **US1** is functional, **US2** and **US3** can be developed in parallel by different team members.

---

## Parallel Example: User Story 1

```bash
# Core AI services (different files)
Task: "Implement CV text extraction service in backend/src/services/extractor.py"
Task: "Implement multi-step AI analysis pipeline in backend/src/services/analyzer.py"

# UI Development
Task: "Build upload component in frontend/src/components/UploadForm.tsx"
Task: "Create Results Dashboard in frontend/src/components/AnalysisDashboard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (Redis/Celery + Storage).
3. Complete Phase 3: User Story 1 (Upload + Score).
4. **STOP and VALIDATE**: Verify end-to-end CV analysis works.

### Incremental Delivery

1. Add User Story 2 (Job Matching) for targeted optimization.
2. Add User Story 3 (AI Rewrite) for actionable improvements.
3. Apply final polish and error handling resilience.

