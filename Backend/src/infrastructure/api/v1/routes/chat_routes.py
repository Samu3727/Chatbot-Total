from fastapi import APIRouter, Depends, HTTPException
from functools import lru_cache
from src.core.application.use_cases.process_chat import ChatService
from src.infrastructure.adapters.provider_factory import ProviderFactory
from src.infrastructure.api.v1.schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["Chat"])

@lru_cache()
def get_shared_chat_service():
    provider = ProviderFactory.get_provider("openrouter")
    return ChatService(provider)

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest,
    service: ChatService = Depends(get_shared_chat_service)
):
    try:
        response_text = await service.process_chat(
            conversation_id=request.conversation_id,
            user_message=request.message
        )
        
        return ChatResponse(
            response=response_text,
            status="success",
            conversation_id=request.conversation_id
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        import logging
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")