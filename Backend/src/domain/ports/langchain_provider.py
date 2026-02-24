from .ai_provider import AIProvider
from langchain_openai import ChatOpenAI
from config import settings
from typing import List, Dict

class LangChainProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.openrouter_api_key
        self.model_name = settings.default_model
        
        # Validar API key
        api_key_str = str(self.api_key).strip()
        if not api_key_str or api_key_str == "sk-or-v1-your-key-here" or api_key_str == "":
            raise ValueError(
                "API Key de OpenRouter no configurada. "
                "Por favor edita el archivo Backend/.env y añade tu OPENROUTER_API_KEY válida. "
                "Obtén una en: https://openrouter.ai/keys"
            )
        
        # Configurar ChatOpenAI con la URL de OpenRouter
        self.llm = ChatOpenAI(
            model=self.model_name,
            openai_api_key=api_key_str,
            openai_api_base="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "http://localhost:8000",
            },
            temperature=0.7,
            timeout=30.0
        )
    
    async def generate_response(self, messages: List[Dict[str, str]]) -> str:
        try:
            # Convertir formato de mensajes al formato de LangChain
            langchain_messages = []
            for msg in messages:
                role = msg["role"]
                content = msg["content"]
                
                if role == "system":
                    from langchain_core.messages import SystemMessage
                    langchain_messages.append(SystemMessage(content=content))
                elif role == "user":
                    from langchain_core.messages import HumanMessage
                    langchain_messages.append(HumanMessage(content=content))
                elif role == "assistant":
                    from langchain_core.messages import AIMessage
                    langchain_messages.append(AIMessage(content=content))
            
            # Invocar el modelo
            response = await self.llm.ainvoke(langchain_messages)
            return response.content
            
        except Exception as e:
            error_msg = str(e)
            if "401" in error_msg or "Unauthorized" in error_msg:
                raise ValueError("API Key inválida. Verifica tu OPENROUTER_API_KEY en Backend/.env")
            elif "429" in error_msg:
                raise ValueError("Límite de solicitudes excedido. Intenta de nuevo más tarde.")
            else:
                raise ValueError(f"Error de OpenRouter: {error_msg}")