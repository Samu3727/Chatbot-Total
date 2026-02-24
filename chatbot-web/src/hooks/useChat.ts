import { useState, useCallback } from 'react';
import { Message } from '../models/message';
import { sendQuestion } from '../services/chat.service';

export const useChat = (conversationId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback(async (text: string) => {
        // 1. Agregar mensaje del usuario localmente
        const userMsg: Message = {
            id: crypto.randomUUID(),
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        // 2. Consultar a la API
        setIsTyping(true);
        try {
            const apiResponse = await sendQuestion({
                conversation_id: conversationId,
                message: text
            });

            // 3. Transformar respuesta de API a nuestro modelo Message
            const botMsg: Message = {
                id: crypto.randomUUID(),
                text: apiResponse.response,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error al contactar al bot:", error);
            // Aquí podrías agregar un mensaje de error visual para el usuario
        } finally {
            setIsTyping(false);
        }
    }, [conversationId]);

    return { messages, sendMessage, isTyping };
};