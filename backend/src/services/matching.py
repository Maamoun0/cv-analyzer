import os
import numpy as np
from openai import OpenAI
from typing import List, Dict, Any

class JobMatcher:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def get_embedding(self, text: str):
        response = self.client.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        )
        return response.data[0].embedding

    def cosine_similarity(self, v1: List[float], v2: List[float]) -> float:
        v1 = np.array(v1)
        v2 = np.array(v2)
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

    async def calculate_match(self, cv_text: str, jd_text: str) -> Dict[str, Any]:
        # 1. Get embeddings
        cv_emb = self.get_embedding(cv_text)
        jd_emb = self.get_embedding(jd_text)
        
        # 2. Calculate similarity
        similarity = self.cosine_similarity(cv_emb, jd_emb)
        
        # 3. Use AI to detect specific skill gaps (since cosine similarity is too broad)
        gap_analysis = await self._detect_skill_gaps(cv_text, jd_text)
        
        return {
            "match_score": round(similarity * 100, 1),
            "skill_gap": gap_analysis.get("missing_skills", []),
            "relevance_summary": gap_analysis.get("summary", "")
        }

    async def _detect_skill_gaps(self, cv_text: str, jd_text: str) -> Dict[str, Any]:
        import json
        prompt = f"Compare this CV with the Job Description. Identify missing skills and provide a brief relevance summary.\n\nCV:\n{cv_text[:2000]}\n\nJD:\n{jd_text[:2000]}"
        
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a recruitment specialist. Output JSON with keys: missing_skills (list), summary (string)."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
