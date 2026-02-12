from pydantic import BaseModel
from typing import Optional
import uuid

class ChatRequest(BaseModel):
    conversation_id: Optional[str] = None
    message: str
    
    def __init__(self, **data):
        super().__init__(**data)
        # Generar un conversation_id si no se proporciona
        if not self.conversation_id:
            self.conversation_id = str(uuid.uuid4())

class ChatResponse(BaseModel):
    response: str
    status: str = "success"
    conversation_id: str = ""