/**
 * Interfaz para un mensaje del chat
 */
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
