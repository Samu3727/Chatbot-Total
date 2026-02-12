from abc import ABC, abstractmethod
from typing import List, Dict, Optional

class AIProvider(ABC):
    @abstractmethod
    async def generate_response(
        self, 
        messages: List[Dict[str, str]], 
        model: Optional[str] = None
    ) -> str:
        pass