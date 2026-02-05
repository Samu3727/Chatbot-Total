import { useState } from 'react';
import { IChatService } from '../services';
import { Message } from '../models';

/**
 * Hook personalizado para manejar la lógica del chat.
 * Implementa Single Responsibility: solo maneja estado y lógica del chat.
 * Implementa Dependency Inversion: depende de IChatService, no de Axios directamente.
 */
export const useChat = (chatService: IChatService) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Crear mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    // Agregar mensaje del usuario
    setMessages(prev => [userMessage, ...prev]);
    setIsLoading(true);

    try {
      // Obtener respuesta del servicio
      const responseText = await chatService.sendMessage(text, 'user123');

      // Crear mensaje del bot
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      // Agregar mensaje del bot
      setMessages(prev => [botMessage, ...prev]);
    } catch (error) {
      console.error('[useChat] Error:', error);

      // Crear mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [errorMessage, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
