import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../src/styles/ModalScreen.styles';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.content}>
        <Text style={styles.title}>Asistente Inteligente</Text>
        <View style={styles.separator} />

        <Text style={styles.description}>
          Bienvenido a tu centro de ayuda. ¿En qué puedo apoyarte hoy?
        </Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>• Consultas de información general</Text>
          <Text style={styles.listItem}>• Soporte técnico paso a paso</Text>
          <Text style={styles.listItem}>• Gestión de tus preferencias</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}