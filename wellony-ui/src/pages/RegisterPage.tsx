import { useState, type ChangeEvent } from "react";
import SubmitButton from "../components/submitButton/SubmitButton";
import { useAuthContext } from "../contexts/authContext";
import type { AuthResponse, RegisterRequest } from "../interfaces/ApiData";
import { registerRequset } from "../api/AuthRequests";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

    const authContext = useAuthContext();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const nav = useNavigate();

    const sendRegisterRequest = (e: MouseEvent) => {
        e.preventDefault();    
        
        const body: RegisterRequest = {
            username: username,
            email: email,
            password: password
        };

        registerRequset(body)
        .then((res: AuthResponse) => {
            authContext.setAuth(res);
            nav("/")
        })
        .catch((e: Error) => console.error(e.message));

    }
    return (
        <form className="auth-from">
            <div className="input-field">
                <label htmlFor="username">your username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    value={username}
                />
                <label htmlFor="email">your email</label>
                <input
                    name="email"
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <label htmlFor="password">your password</label>
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
            </div>
            <SubmitButton onClick={(e: MouseEvent) => sendRegisterRequest(e)} text="Sign In" />
        </form>
    );
}

export default RegisterPage;