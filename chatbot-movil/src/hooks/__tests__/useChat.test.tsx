import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useChat } from '../useChat';
import { IChatService } from '../../services';

// Mock del servicio de chat
const mockChatService: IChatService = {
  sendMessage: jest.fn(),
};

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe inicializarse con estado vacío', () => {
    const { result } = renderHook(() => useChat(mockChatService));

    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('debe enviar mensaje y recibir respuesta exitosamente', async () => {
    (mockChatService.sendMessage as jest.Mock).mockResolvedValue('Respuesta del bot');

    const { result } = renderHook(() => useChat(mockChatService));

    await act(async () => {
      await result.current.sendMessage('Hola');
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
      expect(result.current.messages[1].text).toBe('Hola');
      expect(result.current.messages[1].isUser).toBe(true);
      expect(result.current.messages[0].text).toBe('Respuesta del bot');
      expect(result.current.messages[0].isUser).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('debe manejar errores al enviar mensajes', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (mockChatService.sendMessage as jest.Mock).mockRejectedValue(
      new Error('Error de conexión')
    );

    const { result } = renderHook(() => useChat(mockChatService));

    await act(async () => {
      await result.current.sendMessage('Hola');
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
      expect(result.current.messages[0].text).toContain('Error: Error de conexión');
      expect(result.current.isLoading).toBe(false);
    });

    consoleErrorSpy.mockRestore();
  });

  it('no debe enviar mensajes vacíos', async () => {
    const { result } = renderHook(() => useChat(mockChatService));

    await act(async () => {
      await result.current.sendMessage('   ');
    });

    expect(result.current.messages).toHaveLength(0);
    expect(mockChatService.sendMessage).not.toHaveBeenCalled();
  });

  it('debe cambiar isLoading durante el envío', async () => {
    (mockChatService.sendMessage as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve('Respuesta'), 100))
    );

    const { result } = renderHook(() => useChat(mockChatService));

    act(() => {
      result.current.sendMessage('Test');
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('debe generar IDs únicos para cada mensaje', async () => {
    (mockChatService.sendMessage as jest.Mock).mockResolvedValue('Respuesta');

    const { result } = renderHook(() => useChat(mockChatService));

    await act(async () => {
      await result.current.sendMessage('Mensaje 1');
    });

    await act(async () => {
      await result.current.sendMessage('Mensaje 2');
    });

    await waitFor(() => {
      const ids = result.current.messages.map(m => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
