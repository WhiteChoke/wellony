import cl from "./ChatItem.module.css"

export interface ChatItemProps {
    id: number;
    name: string;
    avatar: Blob;
    onClick: (event: React.MouseEvent) => void;
}

function ChatItem(props: ChatItemProps) {
    return (
        <div className={cl.ChatItem} onClick={props.onClick}>
            <img src={URL.createObjectURL(props.avatar)} alt="chat avatar"/>
            <span>{props.name}</span>
        </div>
    );
}

export default ChatItem;