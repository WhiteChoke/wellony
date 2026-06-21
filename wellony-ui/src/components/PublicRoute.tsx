import {type ReactNode, useEffect} from "react";
import {useAuthContext} from "../contexts/authContext.ts";
import {useNavigate} from "react-router-dom";

interface PublicRouteProps {
    children: ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.auth !== null && !authContext.isAuthLoading) {
            navigate("/", { replace: true });
        }
    }, [authContext, authContext.isAuthLoading ,navigate]);

    if (authContext.isAuthLoading) {
        return <div>Загрузка...</div>;
    }

    return children;
}