import { useState } from 'react';
import ChatLayout from '../layout/ChatLayout';
import ChatBox from '../organisms/ChatBox/ChatBox';
import type { Message } from '../organisms/MessageList/MessageList';
import { sendQuestion } from '../../services/chat.service';
import { getUserId } from '../../utils/user';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const usuario_id = getUserId();

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await sendQuestion({
        usuario_id,
        pregunta: userMessage.text
      });

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: response.respuesta,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: '❌ Error al comunicarse con el bot',
          sender: 'bot'
        }
      ]);
    }
  };

  return (
    <ChatLayout>
      <ChatBox
        messages={messages}
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </ChatLayout>
  );
};

export default ChatPage;
