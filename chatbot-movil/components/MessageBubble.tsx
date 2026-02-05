import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../models';

/**
 * Componente para renderizar un mensaje individual.
 * Implementa Single Responsibility: solo renderiza un mensaje.
 */
interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View
      style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={message.isUser ? styles.userText : styles.botText}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#E9ECEF',
    alignSelf: 'flex-start',
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  botText: {
    color: '#000000',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
