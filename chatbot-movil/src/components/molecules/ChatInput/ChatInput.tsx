import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator // ✅ Importamos el spinner nativo
} from 'react-native';
import { styles } from './ChatInput.styles';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean; // ✅ Cambiado de 'disabled' a 'isLoading' para coincidir con el padre
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    // Si hay texto y no estamos cargando, enviamos
    if (inputText.trim() && !isLoading) {
      onSend(inputText.trim());
      setInputText('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Escribe un mensaje..."
        placeholderTextColor="#999"
        multiline
        maxLength={500}
        editable={!isLoading} // ✅ Deshabilitar mientras carga
      />
      <TouchableOpacity
        style={[
          styles.sendButton, 
          (isLoading || !inputText.trim()) && styles.sendButtonDisabled
        ]}
        onPress={handleSend}
        disabled={isLoading || !inputText.trim()}
      >
        {/* ✅ Si está cargando mostramos el spinner, si no, el texto */}
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.sendButtonText}>Enviar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};