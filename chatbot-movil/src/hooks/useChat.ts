import { useState, useEffect, useCallback } from 'react';
import * as Crypto from 'expo-crypto';
import { IChatService } from '../services';
import { IdentityService } from '../services/IdentityService';
import { Message } from '../models';

export const useChat = (chatService: IChatService) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Carga inicial del ID persistente
  useEffect(() => {
    let isMounted = true;
    
    const initSession = async () => {
      try {
        const id = await IdentityService.getOrCreateId();
        if (isMounted) {
          setConversationId(id);
        }
      } catch (error) {
        console.error(`[useChat] Error inicializando sesión:`, error);
      }
    };

    initSession();
    return () => { isMounted = false; };
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    // Bloqueo de seguridad: No enviar si no hay texto o el ID no ha cargado
    if (!text.trim() || !conversationId) return;

    const userMessage: Message = {
      id: Crypto.randomUUID(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [userMessage, ...prev]);
    setIsLoading(true);

    try {
      // ✅ Se envía el ID que ya está bloqueado en el estado
      const response = await chatService.sendMessage(text.trim(), conversationId);

      const botMessage: Message = {
        id: Crypto.randomUUID(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [botMessage, ...prev]);
    } catch (error: unknown) {
      // SonarQube: Transformamos la excepción en un mensaje de UI
      const detail = error instanceof Error ? error.message : 'Error de conexión';
      console.error(`[useChat] Error: ${detail}`);

      const errorMessage: Message = {
        id: Crypto.randomUUID(),
        text: `Error: No pude conectar con el asistente (${detail})`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [errorMessage, ...prev]);
    } finally {
      setIsLoading(false);
    }
  }, [chatService, conversationId]);

  return { 
    messages, 
    isLoading, 
    sendMessage,
    isReady: !!conversationId // Indica a la UI si ya puede habilitar el botón
  };
};