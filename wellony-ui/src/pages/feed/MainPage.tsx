import {useState} from "react";
import PopUpSearch from "../../features/pop-up-search/ui/PopUpSearch.tsx";
import {ChatListContext, type messageCacheType} from "../../shared/contexts/chatListContext.ts";
import UserInfo from "../../widgets/user-info/UserInfo.tsx";
import ChatList from "../../widgets/chat-list/ChatList.tsx";
import type { ChatInfo } from "../../entities/chat/chatEntity.ts";

function MainPage() {

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [chats, setChats] = useState<ChatInfo[]>([]);
    const [messagesCache, setMessagesCache] = useState<messageCacheType>({} as messageCacheType)

    return (
    <div className="main_page">
        <ChatListContext value={
            {
                chatList: chats,
                setChatList: setChats,
                messagesCache: messagesCache,
                setMessagesCache: setMessagesCache
            }
        }>
            <PopUpSearch isVisible={isSearching} setIsVisible={setIsSearching}/>
            <UserInfo/>
            <ChatList setIsSearching={setIsSearching}/>
            <div className="opened_chat"/>
        </ChatListContext>
    </div>
    
);
}

export default MainPage;