import axios, { isAxiosError } from 'axios';
import { AxiosChatService } from '../AxiosChatService';

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock de isAxiosError
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  isAxiosError: jest.fn(),
}));

const mockedIsAxiosError = isAxiosError as jest.MockedFunction<typeof isAxiosError>;

describe('AxiosChatService', () => {
  let service: AxiosChatService;
  const mockApiUrl = 'http://test-api.com';

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AxiosChatService(mockApiUrl, 5000);
    mockedIsAxiosError.mockReturnValue(false);
  });

  it('debe enviar mensaje exitosamente', async () => {
    const mockResponse = {
      data: {
        status: 'success',
        response: 'Respuesta del servidor',
        conversation_id: 'user123',
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await service.sendMessage('Hola', 'user123');

    expect(result).toBe('Respuesta del servidor');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${mockApiUrl}/api/v1/chat`,
      {
        message: 'Hola',
        conversation_id: 'user123',
      },
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('debe manejar errores del servidor (status: error)', async () => {
    const mockResponse = {
      data: {
        status: 'error',
        response: '',
        conversation_id: 'user123',
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    await expect(service.sendMessage('Hola', 'user123')).rejects.toThrow(
      'Error del servidor'
    );
  });

  it('debe manejar errores de red', async () => {
    const networkError = {
      isAxiosError: true,
      request: {},
      message: 'Network Error',
      name: 'AxiosError',
      config: {},
      toJSON: () => ({}),
    };
    
    mockedIsAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(networkError);

    await expect(service.sendMessage('Hola', 'user123')).rejects.toThrow(
      'No se pudo conectar con el servidor'
    );
  });

  it('debe manejar timeout', async () => {
    const timeoutError = {
      isAxiosError: true,
      code: 'ECONNABORTED',
      message: 'timeout of 5000ms exceeded',
      name: 'AxiosError',
      config: {},
      toJSON: () => ({}),
    };
    
    mockedIsAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(timeoutError);

    await expect(service.sendMessage('Hola', 'user123')).rejects.toThrow(
      'La solicitud tardó demasiado tiempo. Intenta de nuevo.'
    );
  });

  it('debe manejar errores HTTP (4xx, 5xx)', async () => {
    const httpError = {
      isAxiosError: true,
      response: {
        status: 500,
        data: { detail: 'Error interno del servidor' },
        statusText: 'Internal Server Error',
        headers: {},
        config: {},
      },
      message: 'Request failed with status code 500',
      name: 'AxiosError',
      config: {},
      toJSON: () => ({}),
    };
    
    mockedIsAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(httpError);

    await expect(service.sendMessage('Hola', 'user123')).rejects.toThrow(
      'Error del servidor (500)'
    );
  });

  it('debe usar valores por defecto para apiUrl y timeout', () => {
    const defaultService = new AxiosChatService();
    expect(defaultService).toBeDefined();
  });

  it('debe incluir logs de depuración', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    const mockResponse = {
      data: {
        status: 'success',
        response: 'Test',
        conversation_id: 'user123',
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    await service.sendMessage('Hola', 'user123');

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('[AxiosChatService]')
    );

    consoleLogSpy.mockRestore();
  });

  it('debe manejar respuesta con status diferente de success', async () => {
    const mockResponse = {
      data: {
        status: 'failed',
        response: '',
        conversation_id: 'user123',
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    await expect(service.sendMessage('Hola', 'user123')).rejects.toThrow(
      'Error del servidor'
    );
  });
});
