import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import { StrictMode } from 'react'
import App from "./app/App.tsx";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
