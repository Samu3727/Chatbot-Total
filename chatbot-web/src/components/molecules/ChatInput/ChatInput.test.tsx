import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from './ChatInput';

describe('ChatInput', () => {
  it('should render input and button', () => {
    render(
      <ChatInput value="" onChange={() => {}} onSend={() => {}} />
    );
    expect(screen.getByPlaceholderText('Escribe un mensaje...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onSend when button is clicked', () => {
    const onSend = vi.fn();
    render(
      <ChatInput value="" onChange={() => {}} onSend={onSend} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onSend).toHaveBeenCalled();
  });

  it('should call onSend when Enter is pressed in input', () => {
    const onSend = vi.fn();
    render(
      <ChatInput value="" onChange={() => {}} onSend={onSend} />
    );
    fireEvent.keyDown(screen.getByPlaceholderText('Escribe un mensaje...'), { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onSend).toHaveBeenCalled();
  });
});