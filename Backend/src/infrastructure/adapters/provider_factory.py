from src.infrastructure.adapters.openrouter_provider import OpenRouterProvider

class ProviderFactory:
    @staticmethod
    def get_provider(name: str):
        providers = {
            "openrouter": OpenRouterProvider,
        }
        
        if provider_class := providers.get(name.lower()):
            
            return provider_class()
            
        
        raise ValueError(f"Provider {name} no soportado")