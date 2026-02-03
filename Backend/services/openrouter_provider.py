import httpx
from .ai_provider import AIProvider
from config import settings

class OpenRouterProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.openrouter_api_key
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"

    async def generate_response(self, prompt: str) -> str:
        api_key = str(self.api_key or settings.openrouter_api_key).strip()
        model_name = str(settings.default_model or "openrouter/auto").strip()
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": "http://localhost:8000",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model_name,
            "messages": [{"role": "user", "content": prompt}]
        }
        
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.post(
                self.base_url, 
                headers=headers, 
                json=payload, 
                timeout=30.0
            )
            
            response.raise_for_status()
            
            data = response.json()
            return data['choices'][0]['message']['content']