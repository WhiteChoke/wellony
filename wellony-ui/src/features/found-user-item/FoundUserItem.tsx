import cl from "./FoundUserItem.module.css";
import type {FoundUserInfo} from "../../entities/user/userEntity.ts";
import {useChatListContext} from "../../shared/contexts/chatListContext.ts";
import useSendData from "../../shared/hooks/useSendData.ts";
import type { ChatDetails, ChatInfo, CreateChatRequest } from "../../entities/chat/chatEntity.ts";
import useFetch from "../../shared/hooks/useFetch.ts";
import defaultAvatar from "../../shared/assets/defaultAvatar.png"

interface FoundUserItemProps {
    user: FoundUserInfo
}

function FoundUserItem(props: FoundUserItemProps) {

    const chatListContext = useChatListContext();
    const {sendRequest: createChatRequest, error: createError} = useSendData<ChatDetails>("/chats");
    const {sendRequest: fetchAvatar} = useFetch<Blob>("/avatar");

    async function startDialogue(id: number) {
        const request: CreateChatRequest = {
            chatName: null,
            chatType: "DIRECT",
            participantIds: [id]
        }

        const response = await createChatRequest(request);

        if (response == null || createError) {
            console.log("Failed to create a chat")
            return;
        }
    
        const avatarBlob = await fetchAvatar({id: id})
        

        const chat = {
            id: response.id,
            name: response.chatName,
            avatar: avatarBlob ?? defaultAvatar
        } as ChatInfo

        const chats = chatListContext.chatList;
        chatListContext.setChatList([...chats, chat]);
    }

    return (
        <button className={cl.FoundUserItem}
             onClick={() => startDialogue(props.user.id)}
        >
            <img src={URL.createObjectURL(props.user.avatar)}
                 alt="found user avatar"
                 className={cl.FoundUserItemAvatar}
            />
            <span className={cl.FoundUserItemName}>
                {props.user.name}
            </span>
        </button>
    );
}

export default FoundUserItem;