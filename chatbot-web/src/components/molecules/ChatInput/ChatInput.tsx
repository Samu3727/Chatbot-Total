import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input";
import styles from './ChatInput.module.css'

interface PropsChatInput {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onSend: () => void;
}

const ChatInput = ({ value, placeholder = "Escribe un mensaje...", onChange, onSend }: PropsChatInput) => {
    return (
        <aside className={styles.chatInput}>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={e => e.key === 'Enter' && onSend()}
            />
            <Button handleClick={onSend}><i className="fa-solid fa-paper-plane"></i></Button>
        </aside>
    )
}

export default ChatInput;