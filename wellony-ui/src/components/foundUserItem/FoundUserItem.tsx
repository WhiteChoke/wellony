import cl from "./FoundUserItem.module.css";
import type {ChatDetails, FoundUserInfo} from "../../interfaces/ApiData.ts";
import {useChatListContext} from "../../contexts/chatListContext.ts";
import {createDialogue} from "../../api/ChatRequests.ts";
import {useAuthContext} from "../../contexts/authContext.ts";
import {getUserAvatar} from "../../api/UserRequests.ts";

interface FoundUserItemProps {
    user: FoundUserInfo
}

function FoundUserItem(props: FoundUserItemProps) {

    const chatListContext = useChatListContext();
    const auth = useAuthContext();

    async function startDialogue(id: number) {
        const token = auth.auth.token;
        const createResponse = await createDialogue(token, id)

        const companionAvatar = await getUserAvatar(token, id)

        const chat: ChatDetails = {
            id: createResponse.data.dialogueId,
            chatName: createResponse.data.companionName,
            chatAvatar: companionAvatar.data
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