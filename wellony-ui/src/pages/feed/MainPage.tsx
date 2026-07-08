import {useEffect, useState} from "react";
import {getUserAvatar} from "../../entities/api/UserRequests.ts";
import Loader from "../../widgets/loader/Loader.tsx";
import {useAuthContext} from "../../shared/contexts/authContext.ts";
import ChatItem from "../../widgets/chatItem/ChatItem.tsx";
import './styles/MainPage.css';
import loupeIcon from '../../shared/assets/loupe.svg';
import PopUpSearch from "../../widgets/popUpSearch/PopUpSearch.tsx";
import {ChatListContext} from "../../shared/contexts/chatListContext.ts";
import {getAllChats} from "../../entities/api/ChatRequests.ts";
import {useWebSocketContext} from "../../shared/contexts/webSocketContext.ts";
import type {ChatInfo} from "../../entities/ChatInterfaces.ts";

function MainPage() {

    const [username, setUsername] = useState<string>("");
    const [chats, setChats] = useState<ChatInfo[]>([]);
    const [avatar, setAvatar] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const webSocketContext = useWebSocketContext();
    const auth = useAuthContext();

    useEffect(() => {
        if (auth.auth === null || auth.isAuthLoading ) {
            return;
        }

        const token = auth.auth.token

        async function fetchUserInfo() {
            setIsLoading(true);

            try {
                const userAvatar = await getUserAvatar(token, auth.auth.id);
                const avatarUrl = URL.createObjectURL(userAvatar.data)

                setUsername(auth.auth.username);
                setAvatar(avatarUrl);
            } catch (e) {
                console.error(e);
            }
        }

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

        fetchUserInfo();
        fetchChats().finally(() => setIsLoading(false));

    }, [auth.auth, auth.isAuthLoading]);


    if (isLoading) {
        return <Loader />;
    }

    return (
    <div className="main_page">
        <ChatListContext value={{chatList: chats, setChatList: setChats}}>
            <PopUpSearch isVisible={isSearching} setIsVisible={setIsSearching}/>

            <button className="user_info">
                <img src={avatar} alt="avatar" className="user_avatar"/>
                <span className="username">{username}</span>
            </button>

            <div className="chat_list">
                {chats.map((chat: ChatInfo) =>
                    (
                        <ChatItem
                            key={chat.id}
                            id={chat.id}
                            name={chat.name}
                            avatar={chat.avatar}
                            onClick={() => {
                                webSocketContext.sendMessage(`/app/chat/${chat.id}`, {
                                    message: `Hello ${chat.name}!`,
                                    senderId: auth.auth.id,
                                })
                            }}
                        />
                    )
                )}
                <button
                    className="find_button"
                    onClick={() => setIsSearching(true)}
                >
                    <img src={loupeIcon} alt="find_button_icon" />
                </button>
            </div>
            <div className="opened_chat"/>
        </ChatListContext>
    </div>
    
);
}

export default MainPage;