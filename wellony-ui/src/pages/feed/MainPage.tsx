import {useEffect, useState} from "react";
import {getUserAvatar} from "../../entities/api/UserRequests.ts";
import Loader from "../../shared/ui/loader/Loader.tsx";
import {useAuthContext} from "../../shared/contexts/authContext.ts";
import ChatItem from "../../widgets/chatItem/ChatItem.tsx";
import './styles/MainPage.css';
import loupeIcon from '../../shared/assets/loupe.svg';
import PopUpSearch from "../../features/pop-up-search/ui/PopUpSearch.tsx";
import {ChatListContext} from "../../shared/contexts/chatListContext.ts";
import {getAllChats} from "../../entities/api/ChatRequests.ts";
import {useWebSocketContext} from "../../shared/contexts/webSocketContext.ts";
import UserInfo from "../../widgets/user-info/UserInfo.tsx";

function MainPage() {

    const [chats, setChats] = useState<ChatInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const webSocketContext = useWebSocketContext();
    const auth = useAuthContext();

    useEffect(() => {
        if (auth.auth === null || auth.isAuthLoading ) {
            return;
        }

        const token = auth.auth.token

        async function fetchChats() {
            const chatResponse = await getAllChats(token);

            const chatPromises = chatResponse.data.chats.map(async (c) => {
                const dialogueAvatar = await getUserAvatar(token, c.chatAvatarId);
                const dialogueAvatarBlob = dialogueAvatar.data;

                return {
                    id: c.id,
                    name: c.chatName,
                    avatar: dialogueAvatarBlob,
                } as ChatInfo;
            });

            const finalChatList = await Promise.all(chatPromises);

            setChats(finalChatList)
        }

        fetchChats().finally(() => setIsLoading(false));

    }, [auth.auth, auth.isAuthLoading]);


    if (isLoading) {
        return <Loader />;
    }

    return (
    <div className="main_page">
        <ChatListContext value={{chatList: chats, setChatList: setChats}}>
            <PopUpSearch isVisible={isSearching} setIsVisible={setIsSearching}/>

            <UserInfo/>


            <div className="opened_chat"/>
        </ChatListContext>
    </div>
    
);
}

export default MainPage;