import MessageBubble, { type Sender } from "../../molecules/MessageBubble/MessageBubble";
import styles from "./messageList.module.css";

export interface Message {
    id: string,
    text: string,
    sender: Sender
}

interface PropsMessageList {
    messages: Message[];
}

const MessageList = ({ messages }: PropsMessageList) => {
    return (
        <section className={styles.list}>
            {messages.map(message => (
                <MessageBubble
                    key={message.id}
                    text={message.text}
                    sender={message.sender}
                />
            ))}
        </section>
    )
}

export default MessageList