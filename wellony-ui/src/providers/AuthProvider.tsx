import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/authContext";
import { refreshTokenRequest } from "../api/AuthRequests";
import type { AuthResponse } from "../interfaces/ApiData";

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {

    const [auth, setAuth] = useState<AuthResponse | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

    useEffect(() => {
        refreshTokenRequest()
        .then((res: AuthResponse) => setAuth(res))
        .catch((e: Error) => console.error(e.message))
        .finally(() => setIsAuthLoading(false))
    }, [])

    return ( 
        <AuthContext.Provider value={{auth, setAuth, isAuthLoading}}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthProvider;