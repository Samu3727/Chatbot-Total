import React from 'react';
import { BubbleContainer } from '../../atoms/BubbleContainer/BubbleContainer';
import { MessageText } from '../../atoms/MessageText/MessageText';
import { Timestamp } from '../../atoms/Timestamp/Timestamp';

// ✅ Definimos una interfaz clara con tipos primitivos
// Esto permite que la molécula sea agnóstica al modelo del dominio
interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  text, 
  isUser, 
  timestamp 
}) => {
  // SonarQube: Validación básica de datos
  if (text === undefined || text === null) return null;

  return (
    <BubbleContainer isUser={isUser}>
      <MessageText isUser={isUser}>{text}</MessageText>
      <Timestamp date={timestamp} />
    </BubbleContainer>
  );
};