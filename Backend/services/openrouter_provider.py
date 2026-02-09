import httpx
from .ai_provider import AIProvider
from config import settings

class OpenRouterProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.openrouter_api_key
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"

    async def generate_response(self, messages: list[dict]) -> str:
        api_key = str(self.api_key).strip()
        
        # Validar que la API key esté configurada
        if not api_key or api_key == "sk-or-v1-your-key-here" or api_key == "":
            raise ValueError(
                "API Key de OpenRouter no configurada. "
                "Por favor edita el archivo Backend/.env y añade tu OPENROUTER_API_KEY válida. "
                "Obtén una en: https://openrouter.ai/keys"
            )
        
        model_name = str(settings.default_model or "openrouter/auto").strip()

        headers = {
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": "http://localhost:8000",
            "Content-Type": "application/json"
        }

        payload = {
            "model": model_name,
            "messages": messages
        }

        try:
            async with httpx.AsyncClient(follow_redirects=True) as client:
                response = await client.post(
                    self.base_url,
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )

                response.raise_for_status()
                data = response.json()

                return data["choices"][0]["message"]["content"]
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                raise ValueError("API Key inválida. Verifica tu OPENROUTER_API_KEY en Backend/.env")
            elif e.response.status_code == 429:
                raise ValueError("Límite de solicitudes excedido. Intenta de nuevo más tarde.")
            else:
                raise ValueError(f"Error de OpenRouter ({e.response.status_code}): {e.response.text}")
        except httpx.RequestError as e:
            raise ValueError(f"Error de conexión con OpenRouter: {str(e)}")