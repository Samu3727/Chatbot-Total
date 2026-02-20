import axios, { isAxiosError } from 'axios';
import { IChatService } from './IChatService';
import { ChatResponse } from '../models';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export class AxiosChatService implements IChatService {
  private readonly apiUrl: string;
  private readonly timeout: number;

  constructor(
    apiUrl: string = API_BASE_URL || '',
    timeout: number = 30000
  ) {
    this.apiUrl = apiUrl.trim().replace(/\/$/, '');
    this.timeout = timeout;
  }

  async sendMessage(message: string, conversationId: string): Promise<ChatResponse> {
    try {
      const endpoint = `${this.apiUrl}/api/v1/chat/`; 

      const response = await axios.post<ChatResponse>(
        endpoint,
        {
          message: message.trim(),
          conversation_id: conversationId,
        },
        {
          timeout: this.timeout,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.status !== 'success') {
        throw new Error('El servidor respondió con un estado no exitoso');
      }

      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Error del servidor (${error.response.status})`);
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tiempo de espera agotado.');
      }
      if (error.request) {
        throw new Error('Error de red: No hay conexión.');
      }
    }
    throw new Error(
      error instanceof Error ? error.message : 'Error inesperado en el servicio'
    );
  }
}