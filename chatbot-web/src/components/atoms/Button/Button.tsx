import type { ReactNode } from 'react';
import styles from './Button.module.css'

interface PropsButton {
    children: ReactNode,
    handleClick?: () => void
    type?: "submit" | "button" | "reset"
}

const Button=({ children, handleClick, type = "button"}: PropsButton) => {
    return (
        <button type={type} className={styles.button} onClick={handleClick}>{children}</button>
    )
}

export default Button;