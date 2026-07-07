import type {ChatGetRequest, CreateChatRequest} from "../interfaces/ApiData.ts";
import {apiClient} from "./Client.ts";
import type {AxiosPromise} from "axios";

export async function createChatRequest(token: string, data: CreateChatRequest) {
    return apiClient.post(`/chats`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}

export async function getAllChats(token: string): AxiosPromise<ChatGetRequest> {
    return apiClient.get(`/chats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}