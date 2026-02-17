from .ai_provider import AIProvider
from datetime import datetime

class ChatService:
    def __init__(self, provider: AIProvider):
        self.provider = provider,
        self.conversations = {}

    async def process_chat(self, conversation_id: str, user_message: str) -> str:
        if conversation_id not in self.conversations:
            # Inicializar conversación vacía
            self.conversations[conversation_id] = []

        # Actualizar fecha y hora actual en cada mensaje
        current_datetime = datetime.now().strftime("%d de %B de %Y a las %H:%M:%S")
        system_message = {
            "role": "system",
            "content": f"Eres un asistente útil y amigable. La fecha y hora actual es {current_datetime}. Responde siempre en español de manera clara y concisa."
        }

        # Si ya existe un mensaje del sistema, actualizarlo; sino, agregarlo al inicio
        if self.conversations[conversation_id] and self.conversations[conversation_id][0]["role"] == "system":
            self.conversations[conversation_id][0] = system_message
        else:
            self.conversations[conversation_id].insert(0, system_message)

        # Guardar el mensaje del usuario
        self.conversations[conversation_id].append({
            "role": "user",
            "content": user_message
        })

        # Generar una respuesta usando todo el historial
        response = await self.provider.generate_response(
            self.conversations[conversation_id]
        )

        # Guardar la respuesta del modelo
        self.conversations[conversation_id].append({
            "role": "assistant",
            "content": response
        })


        return response