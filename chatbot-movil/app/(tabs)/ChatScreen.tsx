import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useChat } from '../hooks';
import { MessageList } from '../components/MessageList';
import { ChatInput } from '../components/ChatInput';
import { AxiosChatService } from '../services/AxiosChatService';

/**
 * Pantalla principal del chat.
 * Implementa Composición: usa componentes más pequeños.
 * Implementa Dependency Inversion: usa el hook con el servicio inyectado.
 */
export default function ChatScreen() {
  // Crear instancia del servicio (podría venir de un contexto)
  const chatService = new AxiosChatService();

  // Usar el hook personalizado
  const { messages, isLoading, sendMessage } = useChat(chatService);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
