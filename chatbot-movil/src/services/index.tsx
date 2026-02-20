import { AxiosChatService } from './AxiosChatService';


export * from './IChatService';
export * from './AxiosChatService';

export const chatService = new AxiosChatService();