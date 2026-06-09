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