import {createBrowserRouter} from "react-router";
import ProtectedRoute from "./ProtectedRoute.tsx";
import MainPage from "../../pages/feed/MainPage.tsx";
import PublicRoute from "./PublicRoute.tsx";
import LoginPage from "../../pages/login/LoginPage.tsx";
import RegisterPage from "../../pages/register/RegisterPage.tsx";

export const routes = createBrowserRouter([
    { path: "/", element: <ProtectedRoute> <MainPage /> </ProtectedRoute>  },
    { path: "/login", element: <PublicRoute>  <LoginPage /> </PublicRoute> },
    { path: "/register", element: <PublicRoute> <RegisterPage /> </PublicRoute> },
]);