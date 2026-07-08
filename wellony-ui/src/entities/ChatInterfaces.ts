export interface ChatInfo {
    id: number;
    name: string;
    avatar: Blob;
}

export interface MessageInfo {
    id: number;
    senderId: number;
    message: string;
}
