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
    readonly chatAvatar: string,
}

export interface FoundUserInfo {
    readonly id: number,
    readonly name: string,
    readonly avatar: Blob
}