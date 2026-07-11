export interface CurrentUser {
    readonly username: string,
    readonly avatar: Blob,
}

export interface FoundUserInfo {
    id: number,
    name: string,
    avatar: Blob
}

