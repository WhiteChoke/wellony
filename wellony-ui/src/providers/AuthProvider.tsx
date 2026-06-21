import {useEffect, useState, type ReactNode, useMemo} from "react";
import {AuthContext, type AuthContextType} from "../contexts/authContext";
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
        .then((res) => setAuth(res.data))
        .catch((e: Error) => console.error(e.message))
        .finally(() => setIsAuthLoading(false))
    }, [])
    
    const contextValue = useMemo<AuthContextType>(() => ({
        auth,
        setAuth,
        isAuthLoading
    }), [auth, isAuthLoading]);

    return ( 
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthProvider;