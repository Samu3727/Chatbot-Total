import ReactMarkdown from 'react-markdown';
import styles from "./messageBubble.module.css"

export type Sender = 'user' | 'bot';

interface PropsMessageBubble {
    text: string,
    sender: Sender
}

const MessageBubble = ({ text, sender }: PropsMessageBubble) => {
    return (
        <div className={`${styles.bubble} ${styles[sender]}`}>
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    )
}

export default MessageBubble;