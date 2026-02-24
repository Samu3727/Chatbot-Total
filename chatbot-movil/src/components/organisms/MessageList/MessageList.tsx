import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Message } from '../../../models';
import { MessageBubble } from '../../molecules';
import { styles } from './MessageList.styles';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  
  /**
   * ✅ Renderizado optimizado.
   * Sincronizado con la interfaz de MessageBubbleProps:
   * - text (string)
   * - isUser (boolean)
   * - timestamp (Date)
   */
  const renderItem: ListRenderItem<Message> = useCallback(({ item }) => (
    <MessageBubble 
      text={item.text} 
      isUser={item.isUser} 
      timestamp={item.timestamp} 
    />
  ), []);

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      inverted 
      contentContainerStyle={styles.listContainer}
      // ✅ Optimizaciones de rendimiento para listas largas
      removeClippedSubviews={true} 
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      // ✅ Accesibilidad para cumplimiento de estándares (SonarQube)
      accessibilityLabel="Lista de mensajes del chat"
    />
  );
};