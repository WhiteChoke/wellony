import { createContext, useContext } from "react";
import type { AuthResponse } from "../../entities/ApiData.ts";

export interface AuthContextType {
    auth: AuthResponse;
    setAuth: (auth: AuthResponse) => void;
    isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext(): AuthContextType {
    const auth = useContext(AuthContext);

    if (auth === undefined) {
        throw new Error("useAuthContext must be use with a AuthContext")
    }

    return auth;
}