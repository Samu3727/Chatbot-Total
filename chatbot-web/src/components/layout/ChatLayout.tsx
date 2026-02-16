import type { ReactNode } from 'react';
import styles from './chatLayout.module.css';

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <main className={styles.layout}>
      {children}
    </main>
  );
};

export default ChatLayout;
