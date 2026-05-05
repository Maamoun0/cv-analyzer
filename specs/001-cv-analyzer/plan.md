# Implementation Plan: CV Analyzer

**Branch**: `001-cv-analyzer` | **Date**: 2026-05-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-cv-analyzer/spec.md`

## Summary

A production-ready CV Analyzer using an AI-first architecture. The system provides multi-step analysis (ATS scoring, SWOT, skill gaps) and interactive AI-powered rewrites. It features a hybrid tech stack with Next.js for the frontend and FastAPI for high-performance AI processing, utilizing Celery for asynchronous task management.

## Technical Context

**Language/Version**: Next.js 14 (App Router, TypeScript), Python 3.11+  
**Primary Dependencies**: OpenAI GPT-4o, Anthropic Claude, PyMuPDF, python-docx, Celery, Redis, shadcn/ui, Tailwind CSS  
**Storage**: Local Filesystem (for CVs and ephemeral session data), PostgreSQL (optional for persistent user data)  
**Testing**: Playwright (E2E), pytest (Backend Unit/Integration)  
**Target Platform**: Web (Vercel/Railway)  
**Project Type**: web-application  
**Performance Goals**: Initial ATS analysis delivered within 15 seconds of upload.  
**Constraints**: Session-only data retention; 2 free credits per user.  
**Scale/Scope**: MVP focused on individual professional job seekers.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Rich Aesthetics**: Plan includes shadcn/ui and modern design patterns.
- [x] **AI-First**: Core logic is built around multi-step LLM processing.
- [x] **Reliability**: Automatic retries and exponential backoff planned for API failures.
- [x] **Transparency**: Interactive "Accept/Reject" workflow for AI suggestions.

## Project Structure

### Documentation (this feature)

```text
specs/001-cv-analyzer/
├── plan.md              # This file
├── research.md          # Tech decisions and rationale
├── data-model.md        # Entity definitions and state transitions
├── quickstart.md        # Setup and local run instructions
├── contracts/           # API schemas and interface definitions
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/             # FastAPI routes
│   ├── services/        # AI parsing and processing logic
│   ├── workers/         # Celery tasks
│   └── models/          # Data schemas
└── tests/

frontend/
├── src/
│   ├── components/      # UI components (shadcn)
│   ├── pages/           # App router pages
│   ├── services/        # API client
│   └── store/           # Zustand state management
└── tests/
```

**Structure Decision**: A decoupled Web Application structure (Frontend/Backend) is selected to allow independent scaling of the FastAPI workers and the Next.js frontend, and to facilitate the hybrid Python/Node environment required for AI processing.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multi-step AI | Higher accuracy, reduced hallucinations | Single prompt is too prone to errors for professional CVs |
| Celery/Redis | Async processing of large files | Synchronous requests would timeout and degrade UX |

