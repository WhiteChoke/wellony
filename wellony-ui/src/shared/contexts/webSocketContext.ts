import type {MessageSendRequest} from "../../entities/user/userEntity.ts";
import {createContext, useContext} from "react";
import type {IMessage} from "@stomp/stompjs";

export interface WebSocketContextProps {
    isConnected: boolean;
    sendMessage: (destination: string, body: MessageSendRequest) => void;
    subscribe: (destination: string, callback: (message: IMessage) => void) => () => void;
}

export const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export function useWebSocketContext(): WebSocketContextProps {
    const context = useContext(WebSocketContext);

    if (context === undefined) {
        throw new Error("useWebSocketContext must be used with a AuthContext");
    }

    return context;
}