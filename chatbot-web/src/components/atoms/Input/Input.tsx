import styles from "./input.module.css"

interface PropsInput {
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
    type?: 'text' | 'number' | 'email' | 'password',
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange, placeholder, type = 'text', onKeyDown }: PropsInput) => {
    return (
        <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown}/>
    )
}

export default Input;