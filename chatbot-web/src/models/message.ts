import { type Sender } from "../components/molecules/MessageBubble/MessageBubble";

export interface Message {
    id: string;
    text: string;
    sender: Sender;
    timestamp?: Date; // Opcional, pero recomendado para SonarQube
}