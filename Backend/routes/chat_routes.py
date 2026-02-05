from fastapi import APIRouter, HTTPException, Depends
from models import ChatRequest, ChatResponse
from services import ChatService, ProviderFactory, AIProvider

router = APIRouter(tags=["Chat"])

def get_ai_provider() -> AIProvider:
    return ProviderFactory.get_provider("openrouter")

def get_chat_service(provider: AIProvider = Depends(get_ai_provider)) -> ChatService:
    return ChatService(provider=provider)

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest, 
    service: ChatService = Depends(get_chat_service)
):
    try:
        reply = await service.process_chat(request.message)
        return ChatResponse(response=reply)
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail="Error interno al procesar la solicitud de chat."
        )