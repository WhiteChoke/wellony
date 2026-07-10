export interface jwtToken {
    readonly id: number,
    readonly username: string,
    readonly token: string,
    readonly expire: number
}