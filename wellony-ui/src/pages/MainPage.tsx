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
    const token = auth.auth.token

    useEffect(() => {
        if (auth.isAuthLoading || !auth.auth) {
            return;
        }

        getUserInfo(token)
            .then(res => {
                setUsername(res.data.username);
                setChats(res.data.chats);
            })
            .catch((e: Error) => console.error(e))

        getUserAvatar(token, auth.auth.id)
            .then(res => {
                const avatarUrl = URL.createObjectURL(res.data)
                setAvatar(avatarUrl);
            })
            .catch((e: Error) => console.error(e))
            .finally(() => setIsLoading(false));

    }, [auth.auth, auth.isAuthLoading]);

    useEffect(() => {
        if (auth.isAuthLoading || !auth.auth) {
            return;
        }

        const fetchChats = async () => {
            setIsLoading(true);
            const dialogueResonse = await getAllDialogues(token);

            const chatPromises = dialogueResonse.data.map(async (d) => {
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