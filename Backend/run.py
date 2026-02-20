import uvicorn
from src.infrastructure.config.settings import settings

if __name__ == "__main__":
    # Importante: host 0.0.0.0 es vital para que tu celular vea el server
    # Port suele ser 8000
    uvicorn.run(
        "src.main:app", 
        host=settings.api_host, 
        port=settings.api_port, 
        reload=True
    )