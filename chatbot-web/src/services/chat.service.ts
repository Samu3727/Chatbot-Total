import { http } from "../apis/http";

interface ChatApiRequest {
    conversation_id: string;
    message: string;
}

interface ChatApiResponse {
    response: string;
    status: string;
}

export const sendQuestion = async (payload: ChatApiRequest): Promise<ChatApiResponse> => {
    const { data } = await http.post<ChatApiResponse>("/api/v1/chat/", payload);
    return data;
}