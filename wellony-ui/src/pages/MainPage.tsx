import {useEffect, useState} from "react";
import {getUserInfo} from "../api/UserRequests.ts";
import type {ChatDetails} from "../interfaces/ApiData.ts";
import Loader from "../components/loader/Loader.tsx";
import {useAuthContext} from "../contexts/authContext.ts";

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
                console.log("effect")
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
    <div>
        <aside>
            <img src={avatar} alt="avatar" />
            <button/>
        </aside>
        <div className="chat_list"/>
        <div className="opened_chat"/>
    </div>
    
);
}

export default MainPage;