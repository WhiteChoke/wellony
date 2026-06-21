import {apiClient} from "./Client.ts";
import type { UserInfo} from "../interfaces/ApiData.ts";

export const getUserInfo = async (): Promise<UserInfo> => {
    return apiClient.get("/users")
}