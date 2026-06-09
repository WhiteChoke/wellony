import type { AuthResponse, LoginRequest, RegisterRequest } from "../interfaces/ApiData";
import { apiClient } from "./Client"

export const loginRequest = async (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/login", data);
} 

export const registerRequset = async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/register", data)
}

export const refreshTokenRequest = async (): Promise<AuthResponse> => {
    return apiClient.post("/auth/refresh");
} 