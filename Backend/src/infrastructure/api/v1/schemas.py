from pydantic import BaseModel, Field
from typing import Optional
import uuid

class ChatRequest(BaseModel):
    # Si el dispositivo no envía un ID, creamos uno nuevo automáticamente
    conversation_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    message: str

class ChatResponse(BaseModel):
    response: str
    status: str = "success"
    conversation_id: str