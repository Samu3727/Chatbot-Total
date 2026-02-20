import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chatService } from '../../src/services';
import { Message, ChatResponse } from '../../src/models';
import { MessageList } from '../../src/components/organisms';
import { ChatInput } from '../../src/components/molecules';
import { styles } from '../../src/styles/ChatScreen.styles';

const IS_IOS = Platform.OS === 'ios';
const KEYBOARD_OFFSET = 90;

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const insets = useSafeAreaInsets();

    const createBotMessage = (content: string | ChatResponse): Message => ({
        id: (Date.now() + 1).toString(),
        text: typeof content === 'string' ? content : content.response,
        isUser: false,
        timestamp: new Date(),
    });

    const handleSendMessage = useCallback(async (text: string) => {
        const trimmedText = text.trim();
        if (isLoading || !trimmedText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: trimmedText,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [userMessage, ...prev]);
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(trimmedText);
            const botMessage = createBotMessage(response);
            setMessages(prev => [botMessage, ...prev]);
        } catch (error) {
            const errorFeedback = createBotMessage("No pude conectarme al servidor. Por favor, verifica tu conexión.");
            setMessages(prev => [errorFeedback, ...prev]);
            console.error("Critical Chat Service Error:", error instanceof Error ? error.message : error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <KeyboardAvoidingView
            style={[styles.container, { paddingBottom: insets.bottom }]}
            behavior={IS_IOS ? 'padding' : undefined}
            keyboardVerticalOffset={IS_IOS ? KEYBOARD_OFFSET : 0}
        >
            <View style={styles.flex}>
                <MessageList messages={messages} />
            </View>

            <ChatInput
                onSend={handleSendMessage}
                isLoading={isLoading}
            />
        </KeyboardAvoidingView>
    );
}