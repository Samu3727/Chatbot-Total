from src.domain.ports.ai_provider import AIProvider
from datetime import datetime

class ChatService:
    _conversations_storage = {}

    def __init__(self, provider: AIProvider):
        self.provider = provider

    async def process_chat(self, conversation_id: str, user_message: str) -> str:
        # 1. Verificar o crear historial
        if conversation_id not in self._conversations_storage:
            self._conversations_storage[conversation_id] = []
        
        history = self._conversations_storage[conversation_id]

        # 2. Configurar fecha y hora (Indentado dentro de la función)
        ahora = datetime.now()
        fecha_formateada = ahora.strftime("%A, %d de %B de %Y")
        hora_formateada = ahora.strftime("%H:%M:%S")

        system_message = {
            "role": "system", 
            "content": (
                f"Eres un asistente amigable de Davivienda. "
                f"Fecha actual: {fecha_formateada}. "
                f"Hora actual: {hora_formateada}. "
                "Debes usar el historial previo para responder, responde con mensajes cortos."
            )
        }

        # 3. Lógica de mensajes
        if not history:
            history.append(system_message)
        else:
            history[0] = system_message
        
        history.append({"role": "user", "content": user_message})

        try:
            response = await self.provider.generate_response(history)
            history.append({"role": "assistant", "content": response})
            return response
        except Exception as e:
            if history and history[-1]["role"] == "user":
                history.pop()
            print(f"Error en ChatService: {str(e)}")
            raise e