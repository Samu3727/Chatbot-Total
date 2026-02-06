from fastapi import APIRouter, HTTPException, Depends
from models import ChatRequest, ChatResponse
from services import ChatService, ProviderFactory, AIProvider

router = APIRouter(tags=["Chat"])

provider: AIProvider = ProviderFactory.get_provider("openrouter")
chat_service = ChatService(provider=provider)

def get_chat_service() -> ChatService:
    return chat_service

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest, 
    service: ChatService = Depends(get_chat_service)
):
    try:
        reply = await service.process_chat(
            request.conversation_id,
            request.message
        )
        return ChatResponse(response=reply)
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=str(e)
        )