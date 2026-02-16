from abc import ABC, abstractmethod
from typing import List, Dict

class AIProvider(ABC):
    @abstractmethod
    async def generate_response(self, messages: List[Dict[str, str]]) -> str:
        pass