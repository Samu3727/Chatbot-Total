import React from 'react';
import { Text } from 'react-native';
import { styles } from './Timestamp.styles';

export const Timestamp: React.FC<{ date: string | Date }> = ({ date }) => {
  const time = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return <Text style={[styles.time, styles.alignRight]}>{time}</Text>;
};