import {apiClient} from "./Client.ts";
import type { UserInfo} from "../interfaces/ApiData.ts";
import type {AxiosPromise} from "axios";

export const getUserInfo = async (token: string): AxiosPromise<UserInfo> => {
    return apiClient.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getUserAvatar = async (token: string): AxiosPromise<Blob> => {
    return apiClient.get("/users/avatar", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: "blob"
    })
}