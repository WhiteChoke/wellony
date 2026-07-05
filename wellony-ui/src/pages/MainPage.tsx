import {useEffect, useState} from "react";
import {getUserAvatar, getUserInfo} from "../api/UserRequests.ts";
import type {ChatDetails} from "../interfaces/ApiData.ts";
import Loader from "../components/loader/Loader.tsx";
import {useAuthContext} from "../contexts/authContext.ts";
import ChatItem from "../components/chatItem/ChatItem.tsx";
import '../styles/MainPage.css';
import loupeIcon from '../assets/loupe.svg';
import PopUpSearch from "../components/popUpSearch/PopUpSearch.tsx";
import {ChatListContext} from "../contexts/chatListContext.ts";
import {getAllDialogues} from "../api/ChatRequests.ts";

function MainPage() {

    const [username, setUsername] = useState<string>("");
    const [chats, setChats] = useState<ChatDetails[]>([]);
    const [avatar, setAvatar] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const auth = useAuthContext();

    useEffect(() => {
        if (auth.auth === null || auth.isAuthLoading ) {
            return;
        }

        const token = auth.auth.token

        async function fetchUserInfo() {
            try {
                const userInfo = await getUserInfo(token);
                const userAvatar = await getUserAvatar(token, auth.auth.id);
                const avatarUrl = URL.createObjectURL(userAvatar.data)

                setUsername(userInfo.data.username);
                setChats(userInfo.data.chats);
                setAvatar(avatarUrl);
            } catch (e) {
                console.error(e);
            }
        }

        async function fetchChats() {
            setIsLoading(true);
            const dialogueResponse = await getAllDialogues(token);

            const chatPromises = dialogueResponse.data.map(async (d) => {
                const dialogueAvatar = await getUserAvatar(token, d.companionId);
                const dialogueAvatarBlob = dialogueAvatar.data;

                return {
                    id: d.companionId,
                    chatName: d.companionName,
                    chatAvatar: dialogueAvatarBlob,
                } as ChatDetails;
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
                {chats.map((chat: ChatDetails) =>
                    (
                        <ChatItem
                            key={chat.id}
                            id={chat.id}
                            name={chat.chatName}
                            avatar={chat.chatAvatar}
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(chat.id, " chat:", chat.chatName);
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