import cl from "./ChatItem.module.css"
import {useEffect} from "react";
import {useWebSocketContext} from "../../shared/contexts/webSocketContext.ts";

export interface ChatItemProps {
    id: number;
    name: string;
    avatar: Blob;
    onClick: (event: React.MouseEvent) => void;
}

function ChatItem(props: ChatItemProps) {
    const webSocketContext = useWebSocketContext();

    useEffect(() => {
        if (!webSocketContext.isConnected || !props.id) {
            return;
        }

        const unsub = webSocketContext.subscribe(`/topic/chat/${props.id}`, (message) => {
            console.log(message.body)
        })

        console.log("webSocket connected" + props.id);

        return () => {
            unsub();
        }

    }, [webSocketContext.isConnected, props.id, webSocketContext]);

    return (
        <div className={cl.ChatItem} onClick={props.onClick}>
            <img src={URL.createObjectURL(props.avatar)} alt="chat avatar"/>
            <span>{props.name}</span>
        </div>
    );
}

export default ChatItem;