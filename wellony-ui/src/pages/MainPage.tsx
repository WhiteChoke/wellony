import {useEffect, useState} from "react";
import {getUserInfo} from "../api/UserRequests.ts";
import type {ChatDetails} from "../interfaces/ApiData.ts";
import Loader from "../components/loader/Loader.tsx";
import {useAuthContext} from "../contexts/authContext.ts";
import '../styles/MainPage.css';
import ChatItem from "../components/chatItem/ChatItem.tsx";

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
        
        getUserInfo(auth.auth.token)
        .then(res => {
                setUsername(res.data.username);
                setAvatar(res.data.avatarUrl);
                setChats(res.data.chats);
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
            {chats.map((chat: ChatDetails) =>
                (
                    <ChatItem
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