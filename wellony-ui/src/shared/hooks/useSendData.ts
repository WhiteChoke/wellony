import {useAuthContext} from "../contexts/authContext.ts";
import {useState} from "react";
import {apiClient, type ContentType} from "../api/Client.ts";

export default function useSendData<TResponse, TBody = Record<string, never>> (
    url: string,
    data: TBody,
    contentType: ContentType = "application/json"
) {
    const {auth} = useAuthContext();
    const [isLoading, setIsLoading ] = useState(false);
    const [error, setError] = useState(false);

    async function sendRequest() {
        setIsLoading(true);

        try{
            const response = await apiClient.post<TResponse>(url, data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": contentType
                }
            })

            return response.data;

        } catch (e) {
            console.error(e);
            setError(true);

            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return {sendRequest, isLoading, error};
}