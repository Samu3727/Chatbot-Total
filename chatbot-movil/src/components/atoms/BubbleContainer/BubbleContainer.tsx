import React from 'react';
import { View } from 'react-native';
import { styles } from './BubbleContainer.styles';

export const BubbleContainer: React.FC<{ children: React.ReactNode; isUser: boolean }> = ({ children, isUser }) => (
  <View style={[styles.container, isUser ? styles.user : styles.bot]}>
    {children}
  </View>
);