import MessageBubble from "../../molecules/MessageBubble/MessageBubble";
import { Message } from "../../../models/message"; // 👈 Importado desde models
import styles from "./messageList.module.css";

interface PropsMessageList {
    messages: Message[];
}

const MessageList = ({ messages }: PropsMessageList) => {
    return (
        <section className={styles.list}>
            {messages.map((message) => (
                <MessageBubble
                    // Si el ID es único (UUID), no necesitas el index. 
                    // SonarQube prefiere IDs puros para evitar re-renders innecesarios.
                    key={message.id} 
                    text={message.text}
                    sender={message.sender}
                />
            ))}
        </section>
    );
}

export default MessageList;