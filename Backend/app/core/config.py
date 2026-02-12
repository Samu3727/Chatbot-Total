import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Ajuste: Subimos 3 niveles para llegar desde app/core/config.py hasta la raíz
BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    openrouter_api_key: str = ""
    default_model: str = "openrouter/auto"

    model_config = SettingsConfigDict(
        # Ahora BASE_DIR apunta correctamente a la carpeta donde está .env
        env_file=os.path.join(BASE_DIR, ".env"),
        env_file_encoding='utf-8',
        extra='ignore'
    )

settings = Settings()