  it('should not send empty message', async () => {
    render(<ChatPage />);
    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    // No debe aparecer ningún mensaje de usuario ni bot
    expect(screen.queryByText('Hola')).not.toBeInTheDocument();
    expect(screen.queryByText('Hola bot')).not.toBeInTheDocument();
    expect(screen.queryByText(/Error al comunicarse/)).not.toBeInTheDocument();
  });
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('../../services/chat.service', () => ({
  sendQuestion: vi.fn().mockResolvedValue({ response: 'Hola bot' })
}));
vi.mock('../../utils/user', () => ({
  getUserId: () => 'test-user-id'
}));

import ChatPage from './ChatPage';

describe('ChatPage', () => {
  it('should render layout and input', () => {
    render(<ChatPage />);
    expect(screen.getByPlaceholderText('Escribe un mensaje...')).toBeInTheDocument();
  });

  it('should send user message and receive bot response', async () => {
    render(<ChatPage />);
    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.click(button);
    expect(await screen.findByText('Hola bot')).toBeInTheDocument();
    expect(screen.getByText('Hola')).toBeInTheDocument();
  });

  it('should show error if sendQuestion fails', async () => {
    // Fuerza el mock a fallar
    const chatService = await import('../../services/chat.service');
    (chatService.sendQuestion as any).mockRejectedValueOnce(new Error('fail'));
    render(<ChatPage />);
    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'Error' } });
    fireEvent.click(button);
    expect(await screen.findByText(/Error al comunicarse con el bot/)).toBeInTheDocument();
  });
});