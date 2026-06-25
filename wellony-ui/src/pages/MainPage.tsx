import {useEffect, useState} from "react";
import {getUserAvatar, getUserInfo} from "../api/UserRequests.ts";
import type {ChatDetails} from "../interfaces/ApiData.ts";
import Loader from "../components/loader/Loader.tsx";
import {useAuthContext} from "../contexts/authContext.ts";
import ChatItem from "../components/chatItem/ChatItem.tsx";
import '../styles/MainPage.css';
import loupeIcon from '../assets/loupe.svg';

function MainPage() {

    const [username, setUsername] = useState<string>("");
    const [chats, setChats] = useState<ChatDetails[]>([]);
    const [avatar, setAvatar] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const auth = useAuthContext();

    
    useEffect(() => {
        if (auth.isAuthLoading || !auth.auth) {
            return;
        }

        const token = auth.auth.token

        getUserInfo(token)
            .then(res => {
                setUsername(res.data.username);
                setChats(res.data.chats);
            })
            .catch((e: Error) => console.error(e))

        getUserAvatar(token)
            .then(res => {
                const avatarUrl = URL.createObjectURL(res.data)
                setAvatar(avatarUrl);
                console.log(res)
            })
            .catch((e: Error) => console.error(e))
            .finally(() => setIsLoading(false));

    }, [auth.auth, auth.isAuthLoading]);

    if (isLoading) {
        return <Loader />;
    }

    return ( 
    <div className="main_page">
        <button className="user_info">
            <img src={avatar} alt="avatar" className="user_avatar"/>
            <span className="username">{username}</span>
        </button>

        <div className="chat_list">
            <button className="find_button">
                <img src={loupeIcon} alt="find_button_icon" />
            </button>
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
        </div>
        <div className="opened_chat"/>
    </div>
    
);
}

export default MainPage;