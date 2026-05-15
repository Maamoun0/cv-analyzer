# 🚀 CV Analyzer: Beat the ATS with AI
### Precision-engineered to help job seekers crack the code.

**Developed by Ahmed Maamoun**

---

## 💡 Project Origin
After seeing how many qualified developers get rejected by automated filters (ATS), I decided to build a tool that levels the playing field. **CV Analyzer** isn't just a parser—it's a career strategist that looks at your experience through the eyes of an LLM.

---

## 📸 Interface Spotlight

<div align="center">
  <img src="./assets/screenshots/landing_page.png" width="100%" />
</div>

<br/>

| Analysis Dashboard | Feedback Report |
| :--- | :--- |
| <img src="./assets/screenshots/dashboard.png" width="400"/> | <img src="./assets/screenshots/dashboard.png" width="400"/> |

---

## 🛠 What it does
*   **Deep Extraction:** Uses GPT-4o to parse complex PDF structures with high fidelity.
*   **SWOT Analysis:** Get an honest breakdown of your Strengths, Weaknesses, Opportunities, and Threats.
*   **Semantic Matching:** Uses vector embeddings to see how well you *actually* fit a job description.
*   **Smart Rewrites:** Context-aware suggestions using Claude 3 Opus.

---

## 🧠 Dev Log: Scaling the Engine
One of the most annoying parts of building this was dealing with **Inconsistent JSON**. LLMs love to "chat" even when you ask for pure data.

**The Fix:** I moved the backend to **FastAPI** and implemented strict **Pydantic Validation**. If the AI returns a malformed response, the system catchers the error and automatically triggers a "Repair Request" to the model, ensuring the frontend always gets the exact data structure it expects. No more crashed dashboards.

---

## 🏗 Technology Blueprint
*   **Frontend:** Next.js 14 & Shadcn/UI
*   **Intelligence:** OpenAI (GPT-4o) & Anthropic (Claude 3)
*   **Processing:** FastAPI & Celery (for background PDF parsing)

---

## 🚦 Setup
1. `git clone https://github.com/Maamoun0/cv-analyzer.git`
2. `pip install -r backend/requirements.txt`
3. `npm install --prefix frontend`
4. Add your API keys to `.env` and run `npm run dev`.

---

### 👋 Connectivity
Built by **Ahmed Maamoun**. 
[GitHub](https://github.com/Maamoun0) | [LinkedIn](https://linkedin.com/in/your-linkedin-profile)

*Empowering careers with code.*
