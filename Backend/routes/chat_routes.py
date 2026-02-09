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
        return ChatResponse(
            response=reply,
            conversation_id=request.conversation_id
        )
    except ValueError as e:
        # Errores de validación o configuración (API key, etc.)
        error_message = str(e)
        print(f"❌ Error de validación: {error_message}")
        raise HTTPException(
            status_code=400, 
            detail=error_message
        )
    except Exception as e:
        # Otros errores inesperados
        error_message = str(e)
        print(f"❌ Error inesperado en chat_endpoint: {error_message}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error interno del servidor: {error_message}"
        )