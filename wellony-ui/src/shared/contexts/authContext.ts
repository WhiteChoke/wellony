import { createContext, useContext } from "react";
import type {jwtToken} from "../../entities/token/jwtRoken.ts";

export interface AuthContextType {
    auth: jwtToken;
    setAuth: (auth: jwtToken) => void;
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