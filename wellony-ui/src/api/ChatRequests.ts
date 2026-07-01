import type {CreateChatRequest, CreateDialogueResponse, GetDialogueResponse} from "../interfaces/ApiData.ts";
import {apiClient} from "./Client.ts";
import type {AxiosPromise} from "axios";

export async function createChatRequest(token: string, data: CreateChatRequest) {
    return apiClient.post(`/chats`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}

export async function createDialogue(token: string, companionId: number): AxiosPromise<CreateDialogueResponse> {
    return apiClient.post(`/chats/dialogue/${companionId}`,{}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function getAllDialogues(token: string): AxiosPromise<GetDialogueResponse[]> {
    return apiClient.get(`/chats/dialogue`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}