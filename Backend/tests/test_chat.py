import pytest
from httpx import AsyncClient, ASGITransport
from app.infrastructure.api.main import app
from unittest.mock import patch

@pytest.mark.asyncio
async def test_chat_endpoint_mocked():
    with patch("services.openrouter_provider.OpenRouterProvider.generate_response") as mock_gen:
        mock_gen.return_value = "Esta es una respuesta de prueba sin gastar créditos"
        
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.post("/api/v1/chat", json={"message": "Hola"})
        
        assert response.status_code == 200
        assert response.json()["response"] == "Esta es una respuesta de prueba sin gastar créditos"