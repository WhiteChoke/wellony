import {type ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {Client, type IMessage} from "@stomp/stompjs";
import {useAuthContext} from "../../shared/contexts/authContext.ts";
import {WebSocketContext, type WebSocketContextProps} from "../../shared/contexts/webSocketContext.ts";
import type {MessageSendRequest} from "../ApiData.ts";

interface WebSocketProviderProps {
    children: ReactNode;
}

function WebSocketProvider({ children }: WebSocketProviderProps) {
    const [isConnected, setIsConnected] = useState(false);
    const auth = useAuthContext();
    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (auth.auth === null || auth.isAuthLoading) {
            return;
        }

        const client = new Client({
            brokerURL: "ws://10.8.1.9:8080/ws-chat",
            connectHeaders: {
                Authorization: `Bearer ${auth.auth.token}`
            },
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('Connected to WS');
            setIsConnected(true);
        };

        client.onDisconnect = () => {
            console.log('Disconnected from WS');
            setIsConnected(false);
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        client.activate();
        stompClientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [auth.isAuthLoading])

    function sendMessage(destination: string, body: MessageSendRequest) {
        if (stompClientRef.current?.connected) {
            stompClientRef.current.publish({
                destination,
                body: JSON.stringify(body)
            });
        } else {
            console.error('Broker reported error: ' + destination);
        }
    }

    function subscribeTopic(topic: string, callback: (message: IMessage) => void) {
        if (!stompClientRef.current) {
            return () => {};
        }

        const subscription = stompClientRef.current.subscribe(topic, callback);

        return () => {
            console.log('Subscribed topic: ', topic);
            subscription.unsubscribe();
        };
    }

    const contextValue = useMemo<WebSocketContextProps>(() => ({
            isConnected: isConnected,
            sendMessage: sendMessage,
            subscribe: subscribeTopic,
    }), [isConnected]);

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketProvider;