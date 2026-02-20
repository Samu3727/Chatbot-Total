import React from 'react';
import { Text } from 'react-native';
import { styles } from './MessageText.styles';

interface Props {
  children: string;
  isUser: boolean;
}

export const MessageText: React.FC<Props> = ({ children, isUser }) => (
  <Text style={[styles.text, isUser ? styles.user : styles.bot]}>
    {children}
  </Text>
);