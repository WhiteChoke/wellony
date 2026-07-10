import {createContext, useContext} from "react";
import type {ChatInfo} from "../../entities/chat/chatEntity.ts";

export interface ChatListContextType {
    chatList: ChatInfo[];
    setChatList: (chatList: ChatInfo[]) => void;
}

export const ChatListContext = createContext<ChatListContextType | undefined>(undefined);

export function useChatListContext(): ChatListContextType  {
    const context = useContext(ChatListContext);

    if (context === undefined) {
        throw new Error("useChatListContext must be use with a AuthContext")
    }

    return context;
}