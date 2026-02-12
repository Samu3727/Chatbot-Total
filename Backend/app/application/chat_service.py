from typing import Optional
from app.application.ports import AIProvider
from datetime import datetime

class ChatService:
    def __init__(self, provider: AIProvider):
        self.provider = provider
        # Nota: En producción, esto se movería a un ChatRepository (DB/Redis)
        self.conversations = {}

    async def process_chat(self, conversation_id: str, user_message: str, model: Optional[str] = None) -> str:
        if conversation_id not in self.conversations:
            self.conversations[conversation_id] = []

        current_datetime = datetime.now().strftime("%d de %B de %Y a las %H:%M:%S")
        system_message = {
            "role": "system", 
    "content": (
        f"CONTEXTO: La fecha y hora actual es {current_datetime}. "
        "IDENTIDAD: Eres el Asistente Virtual oficial de este sistema. "
        "REGLAS CRÍTICAS: "
        "1. Responde de forma extremadamente concisa y directa. "
        "2. No des introducciones largas sobre quién eres o qué puedes hacer a menos que te lo pregunten explícitamente. "
        "3. Habla siempre en español. "
        "4. Si te preguntan la hora o fecha, usa el CONTEXTO proporcionado arriba."
    )
        }

        if self.conversations[conversation_id] and self.conversations[conversation_id][0]["role"] == "system":
            self.conversations[conversation_id][0] = system_message
        else:
            self.conversations[conversation_id].insert(0, system_message)

        self.conversations[conversation_id].append({"role": "user", "content": user_message})

        response = await self.provider.generate_response(
            messages=self.conversations[conversation_id],
            model=model
        )

        self.conversations[conversation_id].append({"role": "assistant", "content": response})
        
        return response