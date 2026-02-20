/**
 * Interfaz para la respuesta del servidor
 */
export interface ChatResponse {
  response: string;
  status: string;
  conversation_id: string;
}
