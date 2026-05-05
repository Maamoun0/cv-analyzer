import os
import json
from typing import Dict, Any
from openai import OpenAI
from anthropic import Anthropic
import logging

class CVAnalyzer:
    def __init__(self):
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.claude_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    async def analyze_cv(self, text: str, jd_text: str = None) -> Dict[str, Any]:
        try:
            # Step 1: Extract & Structure (using GPT-4o)
            structured_data = await self._step_structure_extraction(text)
            
            # Step 2: Scoring & Feedback
            analysis = await self._step_scoring_and_swot(structured_data, jd_text)
            
            return analysis
        except Exception as e:
            logging.error(f"AI Analysis error: {e}")
            raise

    async def _step_structure_extraction(self, text: str) -> Dict[str, Any]:
        prompt = f"Extract and structure the following CV text into JSON format with keys: summary, experience, education, skills.\n\nText:\n{text}"
        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a professional CV parser. Output only valid JSON."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def _step_scoring_and_swot(self, structured_data: Dict[str, Any], jd_text: str = None) -> Dict[str, Any]:
        jd_context = f"\n\nTarget Job Description:\n{jd_text}" if jd_text else ""
        prompt = f"Analyze this structured CV and provide an ATS score (0-100), SWOT analysis (Strengths, Weaknesses, Opportunities, Threats), and specific suggestions.{jd_context}\n\nData:\n{json.dumps(structured_data)}"
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a senior HR expert. Provide a detailed analysis in JSON format with keys: ats_score, breakdown, strengths, weaknesses, suggestions, skill_gap."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
