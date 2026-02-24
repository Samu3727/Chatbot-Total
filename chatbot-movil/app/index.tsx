import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageList } from '../src/components/organisms/MessageList/MessageList';
import { ChatInput } from '../src/components/molecules/ChatInput/ChatInput';
import { useChat } from '../src/hooks/useChat'; // ✅ Importamos el hook
import { chatService } from '../src/services';
import { styles } from '../src/styles/ChatScreen.styles';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  // ✅ Usamos toda la lógica del hook (ID persistente, mensajes, carga, etc.)
  const { messages, isLoading, sendMessage, isReady } = useChat(chatService);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        }
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <MessageList messages={messages} />

        {/* ✅ Pasamos sendMessage del hook y usamos isReady */}
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading || !isReady}
        />
      </KeyboardAvoidingView>
    </View>
  );
}