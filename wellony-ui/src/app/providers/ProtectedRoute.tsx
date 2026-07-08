import {type ReactNode, useEffect} from "react";
import {useAuthContext} from "../../shared/contexts/authContext.ts";
import {useNavigate} from "react-router-dom";
import Loader from "../../widgets/loader/Loader.tsx";

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.auth === null && !authContext.isAuthLoading) {
            navigate("/login", { replace: true });
        }
    }, [authContext.auth, authContext.isAuthLoading, navigate]);

    if (authContext.isAuthLoading) {
        return <Loader />;
    }

    return children;
}