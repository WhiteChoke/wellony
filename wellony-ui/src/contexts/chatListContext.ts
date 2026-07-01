import {createContext, useContext} from "react";
import type {ChatDetails} from "../interfaces/ApiData.ts";

export interface ChatListContextType {
    chatList: ChatDetails[];
    setChatList: (chatList: ChatDetails[]) => void;
}

export const ChatListContext = createContext<ChatListContextType | undefined>(undefined);

export function useChatListContext(): ChatListContextType  {
    const context = useContext(ChatListContext);

    if (context === undefined) {
        throw new Error("useChatListContext must be use with a AuthContext")
    }

    return context;
}