import { useState, type ChangeEvent } from "react";
import SubmitButton from "../components/submitButton/SubmitButton";
import type { AuthResponse, LoginRequest } from "../interfaces/ApiData";
import { loginRequest } from "../api/AuthRequests";

function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const sendLoginRequest = (e: MouseEvent): void => {
        e.preventDefault();
        
        const body: LoginRequest = {
            "email": email,
            "password": password
        } ;
        
        loginRequest(body)
        .then((res: AuthResponse | undefined) => console.log(res))
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
            <SubmitButton onClick={(e: MouseEvent) => sendLoginRequest(e)} text="Sign In" />
        </form>
    );
}

export default LoginPage;