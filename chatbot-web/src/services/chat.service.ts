import { http } from "../apis/http";

interface MessageUser {
    usuario_id: string
    pregunta: string
}

interface ChatApiResponse {
    usuario_id: string;
    remitente: 'bot';
    respuesta: string;
}

export const sendQuestion = async (message: MessageUser) => {
    const {data} = await http.post<ChatApiResponse>("/chatBot", message)

    return data;
}