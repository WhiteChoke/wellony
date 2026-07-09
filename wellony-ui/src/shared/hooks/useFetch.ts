import {useAuthContext} from "../contexts/authContext.ts";
import {useState} from "react";
import {apiClient} from "../api/Client.ts";

export default function useFetch<TResponse, TParams = Record<string, never>>(url: string, params: TParams) {
    const {auth} = useAuthContext();
    const [isLoading, setIsLoading ] = useState(false);
    const [error, setError] = useState(false);

    async function sendRequest() {
        setIsLoading(true);

        try{
            const response = await apiClient.get<TResponse>(url, {
                params: params,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                },
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