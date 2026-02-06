from .ai_provider import AIProvider

class ChatService:
    def __init__(self, provider: AIProvider):
        self.provider = provider
        self.conversations = {}

    async def process_chat(self, conversation_id: str, user_message: str) -> str:
        if conversation_id not in self.conversations:
            self.conversations[conversation_id] = []

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