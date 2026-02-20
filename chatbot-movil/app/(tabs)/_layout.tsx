import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ✅ Definición fuera del componente padre (S6478 fix)
const TabBarIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <Ionicons 
    name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} 
    size={24} 
    color={color} 
  />
);

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      headerStyle: { backgroundColor: '#fff' },
      headerShadowVisible: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarIcon: TabBarIcon, 
        }}
      />
    </Tabs>
  );
}