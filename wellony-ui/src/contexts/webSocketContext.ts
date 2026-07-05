import type {Message, MessageSendRequest} from "../interfaces/ApiData.ts";

interface SocketContext {
    isConnected: boolean;
    sendMessage: (destination: string, body: MessageSendRequest) => void;
    subscribe: (destination: string, callback: (message: Message) => void) => void;
}

const 