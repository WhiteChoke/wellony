import cl from "./FoundUserItem.module.css";
import type {CreateChatRequest, FoundUserInfo} from "../../interfaces/ApiData.ts";
import {useChatListContext} from "../../contexts/chatListContext.ts";
import {useAuthContext} from "../../contexts/authContext.ts";
import {getUserAvatar} from "../../api/UserRequests.ts";
import type {ChatInfo} from "../../interfaces/ChatInterfaces.ts";
import {createChatRequest} from "../../api/ChatRequests.ts";

interface FoundUserItemProps {
    user: FoundUserInfo
}

function FoundUserItem(props: FoundUserItemProps) {

    const chatListContext = useChatListContext();
    const auth = useAuthContext();

    async function startDialogue(id: number) {
        const token = auth.auth.token;
        const request: CreateChatRequest = {
            chatName: null,
            chatType: "DIRECT",
            participantIds: [id]
        }

        const createResponse = await createChatRequest(token, request);
        const companionAvatar = await getUserAvatar(token, id)

        const chat: ChatInfo = {
            id: createResponse.data.dialogueId,
            name: createResponse.data.companionName,
            avatar: companionAvatar.data
        }

        const chats = chatListContext.chatList;
        chatListContext.setChatList([...chats, chat]);
    }

    return (
        <div className={cl.FoundUserItem}
             onClick={() => startDialogue(props.user.id)}
        >
            <img src={URL.createObjectURL(props.user.avatar)}
                 alt="found user avatar"
                 className={cl.FoundUserItemAvatar}
            />
            <span className={cl.FoundUserItemName}>
                {props.user.name}
            </span>
        </div>
    );
}

export default FoundUserItem;