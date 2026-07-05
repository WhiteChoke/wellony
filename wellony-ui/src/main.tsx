import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage.tsx'
import { StrictMode } from 'react'
import RegisterPage from './pages/RegisterPage.tsx'
import MainPage from './pages/MainPage.tsx'
import AuthProvider from "./providers/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import WebSocketProvider from "./providers/WebSocketProvider.tsx";

const routes = createBrowserRouter([
    { path: "/", element: <ProtectedRoute> <MainPage /> </ProtectedRoute>  },
    { path: "/login", element: <PublicRoute>  <LoginPage /> </PublicRoute> },
    { path: "/register", element: <PublicRoute> <RegisterPage /> </PublicRoute> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <WebSocketProvider>
              <RouterProvider router={routes} />
          </WebSocketProvider>
      </AuthProvider>
  </StrictMode>
)
