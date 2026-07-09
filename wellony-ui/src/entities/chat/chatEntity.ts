type ChatTypes = "DIRECT" | "GROUP";

export interface ChatGetRequest {
    readonly chats: ChatDetails[],
}

export interface ChatDetails {
    readonly id: number,
    readonly chatName: string,
    readonly chatAvatarId: number,
}

export interface CreateChatRequest {
    chatName: number | null,
    participantIds: number[],
    chatType: ChatTypes,
}

export interface ChatInfo {
    id: number;
    name: string;
    avatar: Blob;
}