import { http } from "../apis/http";

interface MessageUser {
    conversation_id: string,
    message: string
}

interface ChatApiResponse {
    response: string;
    status: string;
}

export const sendQuestion = async (message: MessageUser) => {
    const {data} = await http.post<ChatApiResponse>("/api/v1/chat", message)

    return data;
}