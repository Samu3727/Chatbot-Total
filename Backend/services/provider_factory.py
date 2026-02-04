from .openrouter_provider import OpenRouterProvider

class ProviderFactory:
    @staticmethod
    def get_provider(name: str):
        providers = {
            "openrouter": OpenRouterProvider,
        }
        provider_class = providers.get(name.lower())
        if not provider_class:
            raise ValueError(f"Provider {name} no soportado")
        return provider_class()