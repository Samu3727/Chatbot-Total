import axios, { AxiosError } from 'axios';
import { IChatService } from './IChatService';
import { ChatResponse } from '../models';

/**
 * Implementación del servicio de chat usando Axios.
 * Implementa Open/Closed: se puede extender creando nuevas implementaciones
 * (por ejemplo, FetchChatService) sin modificar el código existente.
 */
export class AxiosChatService implements IChatService {
  private apiUrl: string;
  private timeout: number;

  /**
   * @param apiUrl URL base del servidor (default: http://10.230.104.192:8000)
   * @param timeout Timeout para las peticiones en ms (default: 30000)
   */
  constructor(
    apiUrl: string = 'http://10.230.104.192:8000',
    timeout: number = 30000
  ) {
    this.apiUrl = apiUrl;
    this.timeout = timeout;
  }

  async sendMessage(message: string, userId: string = 'user123'): Promise<string> {
    try {
      console.log(`[AxiosChatService] Enviando mensaje a: ${this.apiUrl}/chat`);
      console.log(`[AxiosChatService] Mensaje: ${message}`);

      const response = await axios.post<ChatResponse>(
        `${this.apiUrl}/chat`,
        {
          message,
          user_id: userId,
        },
        {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('[AxiosChatService] Respuesta recibida:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.error || 'Error desconocido del servidor');
      }

      return response.data.response;
    } catch (error) {
      console.error('[AxiosChatService] Error:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          throw new Error(`Error del servidor: ${axiosError.response.status}`);
        } else if (axiosError.request) {
          throw new Error('No se pudo conectar al servidor');
        }
      }

      throw new Error(
        error instanceof Error ? error.message : 'Error desconocido'
      );
    }
  }
}
