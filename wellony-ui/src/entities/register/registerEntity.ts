export interface RegisterRequest {
    username: string,
    email: string,
    password: string
}

export interface RegisterResponse {
    readonly id: number,
    readonly username: string,
    readonly token: string,
    readonly expire: number
}