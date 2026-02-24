from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from src.core.application.use_cases.process_chat import ChatService
from src.infrastructure.adapters.openrouter_provider import OpenRouterProvider
from src.infrastructure.api.v1.routes.chat_routes import router as chat_router
from src.infrastructure.api.v1.routes.health_routes import router as health_router

app = FastAPI(
    title="OpenRouter Chatbot API",
    description="API de Chatbot con Arquitectura Hexagonal",
    version="1.0.0"
)

ai_provider = OpenRouterProvider()
chat_service_instance = ChatService(provider=ai_provider)

app.state.chat_service = chat_service_instance

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

app.include_router(health_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")