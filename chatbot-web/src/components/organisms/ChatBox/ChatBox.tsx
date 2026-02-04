import ChatInput from '../../molecules/ChatInput/ChatInput';
import MessageList, { type Message } from '../MessageList/MessageList';
import styles from './chatBox.module.css';

interface ChatBoxProps {
  messages: Message[];
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
}

const ChatBox = ({
  messages,
  message,
  setMessage,
  onSend
}: ChatBoxProps) => {
  return (
    <div className={styles.chatBox}>
      <MessageList messages={messages} />
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={onSend}
      />
    </div>
  );
};

export default ChatBox;
