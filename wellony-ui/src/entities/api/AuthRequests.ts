import type { AuthResponse, LoginRequest } from "../ApiData.ts";
import { apiClient } from "../../shared/api/Client.ts"
import type {AxiosPromise} from "axios";

export const loginRequest = async (data: LoginRequest): AxiosPromise<AuthResponse> => {
    return apiClient.post("/auth/login", data);
} 

export const registerRequest = async (data: FormData): AxiosPromise<AuthResponse> => {
    return apiClient.post("/auth/register", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

export const refreshTokenRequest = async (): AxiosPromise<AuthResponse> => {
    return apiClient.post("/auth/refresh");
} 