import {createContext, useContext} from "react";
import type {ChatInfo} from "../../entities/chat/chatEntity.ts";
import type { Message } from "../../entities/message/messageEntity.ts";

export type messageCacheType = Record<number, Message[]>;

export interface ChatListContextType {
    chatList: ChatInfo[];
    setChatList: (chatList: ChatInfo[]) => void;
    messagesCache: messageCacheType;
    setMessagesCache: (messages: messageCacheType) => void;
}

export const ChatListContext = createContext<ChatListContextType | undefined>(undefined);

export function useChatListContext(): ChatListContextType  {
    const context = useContext(ChatListContext);

    if (context === undefined) {
        throw new Error("useChatListContext must be use with a AuthContext")
    }

    return context;
}