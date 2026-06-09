import { Outlet } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <Outlet /> 
    </AuthProvider>
  );
}

export default App;
