from fastapi import APIRouter

router = APIRouter()

@router.get("/health", tags=["Health"])
async def health_check():
    """
    Verifica que el servidor esté funcionando.
    """
    return {
        "status": "online",
        "message": "Chatbot API is running smoothly",
        "version": "1.0.0"
    }