import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# BASE_DIR apunta a la raíz del proyecto (donde suele estar el .env)
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

class Settings(BaseSettings):
    # Configuración de IA
    openrouter_api_key: str = ""
    default_model: str = "openrouter/auto"

    # Configuración de Red (Para SonarQube)
    api_host: str = "0.0.0.0" 
    api_port: int = 8000

    model_config = SettingsConfigDict(
        # Buscamos el .env en la raíz del proyecto
        env_file=os.path.join(BASE_DIR, ".env"),
        env_file_encoding='utf-8',
        extra='ignore'
    )

settings = Settings()