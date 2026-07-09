import {apiClient} from "../../shared/api/Client.ts";
import type {SearchUserInfo, UserInfo} from "../user/userEntity.ts";
import type {AxiosPromise} from "axios";

export const getUserInfo = async (token: string): AxiosPromise<UserInfo> => {
    return apiClient.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getUserAvatar = async (token: string, id: number): AxiosPromise<Blob> => {
    return apiClient.get(`/users/avatar/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: "blob"
    })
}

export const searchForUser = async (token: string, username: string): AxiosPromise<[SearchUserInfo]> => {
    return apiClient.get("/users/search", {
        params: {
            username: username
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}