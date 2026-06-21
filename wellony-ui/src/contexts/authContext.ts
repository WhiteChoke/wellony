import { createContext, useContext } from "react";
import type { AuthResponse } from "../interfaces/ApiData";

export interface AuthContextType {
    auth: AuthResponse | null;
    setAuth: (auth: AuthResponse | null) => void;
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