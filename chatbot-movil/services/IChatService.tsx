/**
 * Interfaz para servicios de chat.
 * Implementa Interface Segregation y Dependency Inversion.
 * Los componentes dependerán de esta abstracción, no de implementaciones concretas.
 */
export interface IChatService {
  /**
   * Envía un mensaje al servidor y obtiene la respuesta
   * @param message El mensaje a enviar
   * @param userId ID del usuario que envía el mensaje
   * @returns Promise con la respuesta del servidor
   */
  sendMessage(message: string, userId: string): Promise<string>;
}
