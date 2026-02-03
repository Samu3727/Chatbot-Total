import axios, { AxiosError } from 'axios';
import { IChatService } from './IChatService';
import { ChatResponse } from '../models/ChatResponse';

export class AxiosChatService implements IChatService {

    private apiUtl: string;
    private timeout: number;
}