from .ai_provider import AIProvider

class ChatService:
    def __init__(self, provider: AIProvider):
        self.provider = provider

    async def process_chat(self, user_message: str) -> str:
        return await self.provider.generate_response(user_message)