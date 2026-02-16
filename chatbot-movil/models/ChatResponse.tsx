/**
 * Interfaz para la respuesta del servidor
 */
export interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
}
