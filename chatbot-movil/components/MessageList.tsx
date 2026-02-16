import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Message } from '../models';
import { MessageBubble } from './MessageBubble';

/**
 * Componente para renderizar la lista de mensajes.
 * Implementa Single Responsibility: solo maneja la lista de mensajes.
 */
interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
      keyExtractor={item => item.id}
      inverted
      contentContainerStyle={styles.messagesList}
    />
  );
};

const styles = StyleSheet.create({
  messagesList: {
    padding: 10,
  },
});
