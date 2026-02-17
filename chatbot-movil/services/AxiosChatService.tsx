import axios, { AxiosError, isAxiosError } from 'axios';
import { IChatService } from './IChatService';
import { ChatResponse } from '../models';

// Obtener la URL del API desde las variables de entorno
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.189.249.192:8000';

/**
 * Implementación del servicio de chat usando Axios.
 * Implementa Open/Closed: se puede extender creando nuevas implementaciones
 * (por ejemplo, FetchChatService) sin modificar el código existente.
 */
export class AxiosChatService implements IChatService {
  private apiUrl: string;
  private timeout: number;

  /**
   * @param apiUrl URL base del servidor (default: variable de entorno o http://localhost:8000)
   * @param timeout Timeout para las peticiones en ms (default: 30000)
   */
  constructor(
    apiUrl: string = API_BASE_URL,
    timeout: number = 30000
  ) {
    this.apiUrl = apiUrl;
    this.timeout = timeout;
  }

  async sendMessage(message: string, conversationId: string = 'user123'): Promise<string> {
    try {
      console.log(`[AxiosChatService] Enviando mensaje a: ${this.apiUrl}/api/v1/chat`);
      console.log(`[AxiosChatService] Mensaje: ${message}`);

      const response = await axios.post<ChatResponse>(
        `${this.apiUrl}/api/v1/chat`,
        {
          message,
          conversation_id: conversationId,
        },
        {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('[AxiosChatService] Respuesta recibida:', response.data);

      if (response.data.status !== 'success') {
        throw new Error('Error del servidor');
      }

      return response.data.response;
    } catch (error) {
      console.error('[AxiosChatService] Error:', error);

      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        // Error de respuesta HTTP (4xx, 5xx)
        if (axiosError.response) {
          throw new Error(`Error del servidor (${axiosError.response.status})`);
        }
        
        // Error de timeout
        if (axiosError.code === 'ECONNABORTED') {
          throw new Error('La solicitud tardó demasiado tiempo. Intenta de nuevo.');
        }
        
        // Error de red (sin respuesta)
        if (axiosError.request) {
          throw new Error('No se pudo conectar con el servidor');
        }
      }

      throw new Error(
        error instanceof Error ? error.message : 'Error desconocido'
      );
    }
  }
}
