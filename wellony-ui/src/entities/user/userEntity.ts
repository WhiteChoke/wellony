import type {ChatDetails} from "../chat/chatEntity.ts";

export interface UserInfo {
    readonly username: string,
    readonly avatarUrl: string,
    readonly chats: ChatDetails[],
}

export interface FoundUserInfo {
    id: number,
    name: string,
    avatar: Blob
}

