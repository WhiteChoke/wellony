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
    readonly token: string,
    readonly expire: number
}

export interface UserInfo {
    readonly username: string,
    readonly avatarUrl: string,
    readonly chats: ChatDetails[],
}

export interface ChatDetails {
    readonly id: number,
    readonly chatName: string,
    readonly chatAvatar: Blob,
}

export interface FoundUserInfo {
    readonly id: number,
    readonly name: string,
    readonly avatar: Blob
}

export interface SearchUserInfo {
    readonly id: number,
    readonly username: string,
}

export interface CreateChatRequest {
    chatName: number
    participantIds: number[]
}

export interface CreateDialogueResponse {
    readonly companionId: number,
    readonly companionName: string,
    readonly dialogueId: number
}

export interface GetDialogueResponse {
    readonly companionId: number,
    readonly companionName: string,
}

export interface MessageSendRequest {
    message: string,
}

export interface Message {
    messageId: number,
    sentAt: Date,
    senderName: string,
    senderId: number,
}