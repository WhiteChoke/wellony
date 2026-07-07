export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string
}

export interface AuthResponse {
    readonly id: number,
    readonly username: string,
    readonly token: string,
    readonly expire: number
}

export interface UserInfo {
    readonly username: string,
    readonly avatarUrl: string,
    readonly chats: ChatDetails[],
}

export interface ChatGetRequest {
    readonly chats: ChatDetails[];
}

export interface ChatDetails {
    readonly id: number,
    readonly chatName: string,
    readonly chatAvatarId: number,
}

export interface SearchUserInfo {
    readonly id: number,
    readonly username: string,
}

type ChatTypes = "DIRECT" | "GROUP";

export interface CreateChatRequest {
    chatName: number | null;
    participantIds: number[]
    chatType: ChatTypes;
}

export interface MessageSendRequest {
    senderId: number,
    message: string,
}

export interface FoundUserInfo {
    id: number,
    name: string,
    avatar: Blob
}

export interface Message {
    messageId: number,
    sentAt: Date,
    senderName: string,
    senderId: number,
}