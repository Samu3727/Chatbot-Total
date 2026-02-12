from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# Importaciones actualizadas a la nueva estructura
# Asegúrate de mover tus archivos de rutas a app/infrastructure/api/routers/
from app.infrastructure.api.routers.chat_routes import router as chat_router
from app.infrastructure.api.routers.health_routes import router as health_router
# Asegúrate de mover config.py a app/core/config.py
from app.core.config import settings

app = FastAPI(
    title="OpenRouter Chatbot API",
    description="API de Chatbot multi-modelo usando OpenRouter (Arquitectura Hexagonal)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Frontend Web
        "http://localhost:8081",  # Expo Metro
        "http://192.168.*.*:8081",  # Expo en red local
        "*"  # Permitir todos los orígenes en desarrollo
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

app.include_router(health_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")