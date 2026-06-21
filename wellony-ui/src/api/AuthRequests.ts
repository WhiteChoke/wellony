import type { AuthResponse, LoginRequest, RegisterRequest } from "../interfaces/ApiData";
import { apiClient } from "./Client"
import type {AxiosPromise} from "axios";

export const loginRequest = async (data: LoginRequest): AxiosPromise<AuthResponse> => {
    return apiClient.post("/auth/login", data);
} 

export const registerRequset = async (data: RegisterRequest): AxiosPromise<AuthResponse> => {
    return apiClient.post("/auth/register", data)
}

export const refreshTokenRequest = async (): AxiosPromise<AuthResponse> => {
    return apiClient.post("/auth/refresh");
} 