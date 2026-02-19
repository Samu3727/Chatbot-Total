from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from routes.chat_routes import router as chat_router
from routes.health_routes import router as health_router
from fastapi.middleware.cors import CORSMiddleware
from config import settings

app = FastAPI(
    title="OpenRouter Chatbot API",
    description="API de Chatbot multi-modelo usando OpenRouter",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Frontend Web
        "http://localhost:8081",  # Expo Metro
        "http://10.189.249.192:8081",  # Expo en red local
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

if __name__ == "__main__":
    import uvicorn
    # Usar 0.0.0.0 para permitir conexiones desde la red local y emuladores
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)