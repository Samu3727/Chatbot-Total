import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageBubble from './MessageBubble';

describe('MessageBubble', () => {
  it('should render user message', () => {
    render(<MessageBubble text="Hola usuario" sender="user" />);
    expect(screen.getByText('Hola usuario')).toBeInTheDocument();
  });

  it('should render bot message', () => {
    render(<MessageBubble text="Hola bot" sender="bot" />);
    expect(screen.getByText('Hola bot')).toBeInTheDocument();
  });
});