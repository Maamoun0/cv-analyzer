# 🚀 CV Analyzer: Precision AI-Powered Career Optimization

**Architected and Developed by:** Ahmed Maamoun

![Banner](https://img.shields.io/badge/AI-Powered-indigo?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)

**CV Analyzer** is a high-performance platform I designed from the ground up to help job seekers crack the ATS (Applicant Tracking System) code. Using a complex hybrid architecture of Next.js and FastAPI, I integrated GPT-4o and Claude 3 to provide instant ATS scoring, detailed SWOT analysis, and context-aware professional rewrites.

---

## ✨ Key Engineering Features

- 🧠 **Multi-Step AI Analysis pipeline**: I engineered a deep extraction system using GPT-4o that strictly minimizes hallucinations and ensures accurate data parsing from complex PDF structures.
- 📊 **Dynamic ATS Scoring Engine**: A real-time feedback loop evaluating keywords, formatting, and industry relevance.
- 🎯 **Semantic Job Matching**: I utilized OpenAI Embeddings to perform high-dimensional vector comparisons between a candidate's CV and specific job descriptions.
- ✍️ **Interactive AI Rewrites**: Built a custom "Accept/Reject" workflow to give users granular control over Claude 3 generated text improvements.
- 🌙 **Premium UI/UX**: I designed a dark-themed, high-performance interface with glassmorphism and fluid micro-animations to ensure a premium user experience.

---

## 📸 Platform Previews

*(Screenshots are stored in `./assets/screenshots/`)*

| Landing Page | Analysis Dashboard |
| :---: | :---: |
| <img src="./assets/screenshots/landing_page.png" alt="Landing Page" width="350"/> | <img src="./assets/screenshots/dashboard.png" alt="Dashboard" width="350"/> |

---

## 🧠 Technical Challenges I Overcame

Building a reliable AI-wrapper is difficult; ensuring it provides consistent, production-level output is even harder. Here are some challenges I solved:

1. **Unpredictable AI JSON Outputs:**
   - *Challenge:* GPT-4o sometimes breaks JSON formatting when returning complex nested structures (like a full CV SWOT analysis).
   - *Solution:* I implemented strict Pydantic models in FastAPI combined with retry-logic and temperature tuning to force consistent, strongly-typed JSON responses from the LLMs.
2. **Heavy Document Processing Blocks the Event Loop:**
   - *Challenge:* Parsing large PDFs with `PyMuPDF` blocks the main thread, leading to slow API responses.
   - *Solution:* I decoupled the document processing and AI generation by implementing a background task queue using **Celery** and **Redis**, ensuring the FastAPI endpoints remain lightning-fast and responsive.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI (Python), Celery, Redis
- **AI Integration**: OpenAI GPT-4o, Anthropic Claude 3, OpenAI Embeddings
- **Data Processing**: PyMuPDF & python-docx

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- Redis Server (Running locally or via Docker)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Maamoun0/cv-analyzer.git
   cd cv-analyzer
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env # Add your OpenAI and Anthropic API keys
   uvicorn src.api.main:app --reload
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 👨‍💻 The Creator

**Ahmed Maamoun**
- GitHub: [@Maamoun0](https://github.com/Maamoun0)
- LinkedIn: [Ahmed Maamoun](https://linkedin.com/in/your-linkedin-profile)

## 📄 License
All rights reserved © 2026 - **Ahmed Maamoun**.
