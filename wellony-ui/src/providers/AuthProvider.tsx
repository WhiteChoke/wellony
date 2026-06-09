import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/authContext";
import { refreshTokenRequest } from "../api/AuthRequests";
import type { AuthResponse } from "../interfaces/ApiData";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {

    const [auth, setAuth] = useState<AuthResponse | null>(null);
    const nav = useNavigate();

    useEffect(() => {
        refreshTokenRequest()
        .then((res: AuthResponse) => setAuth(res))
        .catch((e: Error) => {
            console.error(e.message);
            nav("/register")
        })
    }, [])

    return ( 
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthProvider;