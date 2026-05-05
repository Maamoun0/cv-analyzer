import os
from anthropic import Anthropic
from typing import Dict, Any

class CVRewriter:
    def __init__(self):
        self.client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    async def suggest_rewrite(self, section_text: str, context: str) -> str:
        prompt = f"""
        Human: You are a professional CV writer. Improve the following CV section based on the provided context. 
        Maintain a professional, action-oriented tone. Use strong verbs and quantify achievements where possible.
        
        Section Text:
        {section_text}
        
        Target Context/Role:
        {context}
        
        Provide only the improved text. No explanations.
        
        Assistant:"""
        
        response = self.client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
