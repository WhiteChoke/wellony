import cl from "./ChatItem.module.css"

export interface ChatItemProps {
    id: number;
    name: string;
    avatar: string;
    onClick: (event: React.MouseEvent) => void;
}

function ChatItem(props: ChatItemProps) {
    return (
        <button className={cl.ChatItem} onClick={props.onClick}>
            <img src={props.avatar} alt="chat avatar"/>
            <span>{props.name}</span>
        </button>
    );
}

export default ChatItem;