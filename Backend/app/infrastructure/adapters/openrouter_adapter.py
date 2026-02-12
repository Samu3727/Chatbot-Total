import httpx
from typing import List, Dict, Optional
from app.application.ports import AIProvider
from app.core.config import settings

class OpenRouterAdapter(AIProvider):
    def __init__(self):
        self.api_key = settings.openrouter_api_key
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"

    async def generate_response(
        self, 
        messages: List[Dict[str, str]], 
        model: Optional[str] = None
    ) -> str:
        
        selected_model = model or settings.default_model
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",
        }

        payload = {
            "model": selected_model,
            "messages": messages
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    self.base_url, 
                    headers=headers, 
                    json=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                data = response.json()
                

                return data["choices"][0]["message"]["content"]
            
            except Exception as e:
                return f"Error al conectar con OpenRouter: {str(e)}"