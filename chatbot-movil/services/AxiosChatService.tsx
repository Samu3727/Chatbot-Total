import axios, { AxiosError } from 'axios';
import { IChatService } from './IChatService';
import { ChatResponse } from '../models/ChatResponse';

export class AxiosChatService implements IChatService {

    private apiUtl: string;
    private timeout: number;

    @param apiUrl
    @param timeout

    constructor (

        apiUrl: string = 'http://10.230.104.192:8000',
        timeout: number = 3000;
    ) {

        this.apiUrl = apiUrl;
        this.timeout = timeout;
    }

    async sendMessage (message: string, userId: string = 'User123'): Promise<string> {

        try {

            console.log(`[AxiosChatService] Sending message: ${message}`);
            console.log(`[AxiosChatService] To API URL: ${this.apiUrl}`);

            const response = await axios.post<ChatResponse>(

                `${this.apiUrl}/chat`,

                {

                    message,
                    user_id: userId,
                },
                {

                    timeout: this.timeout,
                    headers: {

                        'Content-Type': 'application/json'
                    },
                }
            );

            console.log('[AxiosChatService] Respuesta recibida del servidor:', response.data);

            if (!response.data.success) {

                throw new Error(response.data.error || 'Error desconocido del servidor');
            }

            return response.data.response;

        } catch (error) {

            console.error('[AxiosChatService] Error: ', error);

            if (axios.isAxiosError(error)) {

                const axiosError = error as AxiosError;

                if (axiosError.response) {

                    throw new Error(`Error del servidor: ${axiosError.response.status}`);

                } else if  (axiosError.request) {

                    throw new Error('No se recibió respuesta del servidor');
                }
            }
        }

        throw new Error (
            
            error instanceof Error ? error.message : 'Error Desconocido'
        );
    }
}