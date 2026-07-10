import {useEffect, useState, type ReactNode, useMemo} from "react";
import {AuthContext, type AuthContextType} from "../../shared/contexts/authContext.ts";
import useSendData from "../../shared/hooks/useSendData.ts";
import type {jwtToken} from "../token/jwtRoken.ts";

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {

    const [auth, setAuth] = useState<jwtToken>({} as jwtToken);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

    const {sendRequest, error} = useSendData<jwtToken>("/auth/refresh");

    useEffect(() => {

        async function refreshTokenRequest() {
            const response = await sendRequest();
            
            if (error || response == null) {
                console.error("Failed to refresh token");
                return;
            }
            setAuth(response);
        }
        

        refreshTokenRequest()
            .finally(() => setIsAuthLoading(false))
    }, [error, sendRequest])
    
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