import React from 'react';
import { render } from '@testing-library/react-native';
import { MessageBubble } from '../MessageBubble';

describe('MessageBubble', () => {
  const mockMessage = {
    id: '1',
    text: 'Hola, este es un mensaje de prueba',
    isUser: true,
    timestamp: new Date('2024-01-01T12:00:00'),
  };

  it('debe renderizarse correctamente con mensaje de usuario', () => {
    const { getByText } = render(<MessageBubble message={mockMessage} />);
    expect(getByText('Hola, este es un mensaje de prueba')).toBeTruthy();
  });

  it('debe renderizarse correctamente con mensaje del bot', () => {
    const botMessage = { ...mockMessage, isUser: false };
    const { getByText } = render(<MessageBubble message={botMessage} />);
    expect(getByText('Hola, este es un mensaje de prueba')).toBeTruthy();
  });

  it('debe mostrar la hora formateada correctamente', () => {
    const { getByText } = render(<MessageBubble message={mockMessage} />);
    // La hora debe mostrarse en formato local
    expect(getByText(/\d{1,2}:\d{2}/)).toBeTruthy();
  });

  it('debe renderizar mensajes largos', () => {
    const longMessage = {
      ...mockMessage,
      text: 'A'.repeat(500),
    };
    const { getByText } = render(<MessageBubble message={longMessage} />);
    expect(getByText('A'.repeat(500))).toBeTruthy();
  });

  it('debe renderizar emojis correctamente', () => {
    const emojiMessage = {
      ...mockMessage,
      text: '¡Hola! 👋 ¿Cómo estás? 😊',
    };
    const { getByText } = render(<MessageBubble message={emojiMessage} />);
    expect(getByText('¡Hola! 👋 ¿Cómo estás? 😊')).toBeTruthy();
  });
});
