from app.infrastructure.adapters.openrouter_adapter import OpenRouterAdapter

class ProviderFactory:
    @staticmethod
    def get_provider(name: str):
        providers = {
            "openrouter": OpenRouterAdapter,
        }
        

        if not (provider_class := providers.get(name.lower())):
            raise ValueError(f"Provider {name} no soportado")
        
        return provider_class()