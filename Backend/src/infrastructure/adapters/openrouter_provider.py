import httpx
import logging
from src.domain.ports.ai_provider import AIProvider
from src.infrastructure.config.settings import settings

# Configuración de logging para cumplir con estándares de observabilidad
logger = logging.getLogger(__name__)

class OpenRouterProvider(AIProvider):
    """
    Adaptador de infraestructura para la integración con OpenRouter.
    Cumple con la interfaz AIProvider definida en el dominio.
    """

    def __init__(self):
        self.api_key = str(settings.openrouter_api_key).strip()
        # Mover esto a settings.py es preferible para SonarQube
        self.base_url = getattr(settings, "openrouter_base_url", "https://openrouter.ai/api/v1/chat/completions")
        self.timeout = 30.0

    async def generate_response(self, messages: list[dict[str, str]]) -> str:
        """
        Envía el historial completo de mensajes a OpenRouter.
        """
        self._validate_config()
        
        sanitized_messages = self._sanitize_messages(messages)
        headers = self._build_headers()
        payload = {
            "model": str(settings.default_model or "openrouter/auto").strip(),
            "messages": sanitized_messages
        }

        try:
            async with httpx.AsyncClient(follow_redirects=True) as client:
                response = await client.post(
                    self.base_url,
                    headers=headers,
                    json=payload,
                    timeout=self.timeout
                )
                response.raise_for_status()
                data = response.json()
                return str(data["choices"][0]["message"]["content"])

        except httpx.HTTPStatusError as e:
            error_msg = self._handle_http_error(e)
            logger.error("HTTP Error connecting to OpenRouter: %s", error_msg)
            raise ValueError(error_msg) from e
        except httpx.RequestError as e:
            logger.error("Network error connecting to OpenRouter: %s", str(e))
            raise ValueError(f"Error de conexión con OpenRouter: {str(e)}") from e
        except (KeyError, IndexError) as e:
            logger.error("Unexpected response format from OpenRouter: %s", str(e))
            raise ValueError("El formato de respuesta de OpenRouter no es el esperado.") from e

    def _validate_config(self) -> None:
        """Valida que la API Key sea válida antes de la petición."""
        if not self.api_key or "your-key-here" in self.api_key:
            raise ValueError("API Key de OpenRouter no configurada en el archivo .env")

    def _sanitize_messages(self, messages: list[dict[str, str]]) -> list[dict[str, str]]:
        """Limpia los mensajes para enviar solo lo que la API espera (role y content)."""
        return [
            {
                "role": str(m.get("role", "user")), 
                "content": str(m.get("content", ""))
            }
            for m in messages
        ]

    def _build_headers(self) -> dict[str, str]:
        """Construye los headers requeridos por OpenRouter."""
        return {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "https://github.com/tu-usuario/chatbot-total",
            "X-Title": "ChatBot Hexagonal",
            "Content-Type": "application/json"
        }

    def _handle_http_error(self, e: httpx.HTTPStatusError) -> str:
        """Mapea códigos de estado HTTP a mensajes legibles."""
        status = e.response.status_code
        error_map = {
            401: "API Key inválida.",
            403: "Acceso denegado (Verifica el saldo en OpenRouter).",
            422: f"Error de formato en el payload: {e.response.text}",
            429: "Límite de solicitudes (Rate limit) excedido."
        }
        return error_map.get(status, f"Error inesperado en OpenRouter ({status})")