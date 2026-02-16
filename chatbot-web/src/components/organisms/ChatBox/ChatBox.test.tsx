import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatBox from './ChatBox';

describe('ChatBox', () => {
  it('should render input and message list', () => {
    render(
      <ChatBox
        messages={[{ text: 'Hola', sender: 'user' }]}
        message="Mensaje"
        setMessage={() => {}}
        onSend={() => {}}
      />
    );
    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe un mensaje...')).toBeInTheDocument();
  });
});