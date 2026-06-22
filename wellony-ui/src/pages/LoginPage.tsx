import { useState, type ChangeEvent } from "react";
import SubmitButton from "../components/submitButton/SubmitButton";
import type { LoginRequest } from "../interfaces/ApiData";
import { loginRequest } from "../api/AuthRequests";
import { useAuthContext } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthStyle.css"

function LoginPage() {

    const authContext = useAuthContext();
    const nav = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const sendLoginRequest = (e: MouseEvent): void => {
        e.preventDefault();
        
        const body: LoginRequest = {
            "email": email,
            "password": password
        } ;
        
        loginRequest(body)
        .then((res) => {
            authContext.setAuth(res.data ?? null);
            nav("/");
        })
        .catch((e: Error) => console.error(e.message));
        
    }

    return (
        <form className="auth-form">
            <div className="input-field">
                <label htmlFor="email">your email</label>
                <input 
                name="email" 
                placeholder="email" 
                type="email" 
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                 />
            </div>
            <div className="input-field">
                <label htmlFor="password">your password</label>
                <input
                 name="password" 
                 placeholder="password"
                 type="password" 
                 value={password}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
            </div>
            <Link to="/register">Register</Link>
            <SubmitButton onClick={(e: MouseEvent) => sendLoginRequest(e)} text="Sign In" />
        </form>
    );
}

export default LoginPage;