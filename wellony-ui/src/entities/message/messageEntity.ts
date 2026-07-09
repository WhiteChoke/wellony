export interface Message {
    messageId: number,
    sentAt: Date,
    senderName: string,
    senderId: number,
}

export interface MessageInfo {
    id: number;
    senderId: number;
    message: string;
}

export interface MessageSendRequest {
    senderId: number,
    message: string,
}
