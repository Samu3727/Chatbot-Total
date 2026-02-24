import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ChatInput } from '../ChatInput';

describe('ChatInput', () => {
  it('debe renderizarse correctamente', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatInput onSend={mockOnSend} isLoading={false} />
    );

    expect(getByPlaceholderText('Escribe un mensaje...')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('debe llamar onSend cuando se presiona el botón con texto', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatInput onSend={mockOnSend} isLoading={false} />
    );

    const input = getByPlaceholderText('Escribe un mensaje...');
    const sendButton = getByText('Enviar');

    fireEvent.changeText(input, 'Hola mundo');
    fireEvent.press(sendButton);

    expect(mockOnSend).toHaveBeenCalledWith('Hola mundo');
  });

  it('debe limpiar el input después de enviar', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatInput onSend={mockOnSend} isLoading={false} />
    );

    const input = getByPlaceholderText('Escribe un mensaje...');
    const sendButton = getByText('Enviar');

    fireEvent.changeText(input, 'Test message');
    fireEvent.press(sendButton);

    expect(input.props.value).toBe('');
  });

  it('no debe enviar mensajes vacíos', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatInput onSend={mockOnSend} isLoading={false} />
    );

    const input = getByPlaceholderText('Escribe un mensaje...');
    const sendButton = getByText('Enviar');

    fireEvent.changeText(input, '   ');
    fireEvent.press(sendButton);

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('debe deshabilitar el input cuando isLoading es true', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatInput onSend={mockOnSend} isLoading={true} />
    );

    const input = getByPlaceholderText('Escribe un mensaje...');
    expect(input.props.editable).toBe(false);
    expect(getByText('...')).toBeTruthy();
  });

  it('no debe enviar mensajes cuando isLoading es true', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatInput onSend={mockOnSend} isLoading={true} />
    );

    const input = getByPlaceholderText('Escribe un mensaje...');
    const sendButton = getByText('...');

    fireEvent.changeText(input, 'Test');
    fireEvent.press(sendButton);

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('debe respetar el límite de 500 caracteres', () => {
    const mockOnSend = jest.fn();
    const { getByPlaceholderText } = render(
      <ChatInput onSend={mockOnSend} isLoading={false} />
    );

    const input = getByPlaceholderText('Escribe un mensaje...');
    expect(input.props.maxLength).toBe(500);
  });
});
