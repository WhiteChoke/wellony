import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage.tsx'
import { StrictMode } from 'react'
import RegisterPage from './pages/RegisterPage.tsx'
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={routes}/>   
    </StrictMode>
)
