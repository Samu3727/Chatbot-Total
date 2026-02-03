import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { AxiosChatService } from '../services/AxiosChatService';
import { useChat } from '../hooks/useChat';
import { ChatInput } from '../components/ChatInput';
import { ChatMessages } from '../components/ChatMessages';

export default function ChatScreen() {

    const chatService = new AxiosChatService();

    const { messages, isLoading, sendMessage } = useChat(chatService);

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#f5f5f5'
    },
});