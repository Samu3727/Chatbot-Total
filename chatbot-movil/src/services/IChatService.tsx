import { ChatResponse } from '../models';

export interface IChatService {

  sendMessage(message: string, conversationId?: string): Promise<ChatResponse>;
}