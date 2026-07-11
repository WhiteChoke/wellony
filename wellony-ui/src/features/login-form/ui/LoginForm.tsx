import {Link, useNavigate} from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import SubmitButton from "../../../shared/ui/submit-button/SubmitButton.tsx";
import useSendData from "../../../shared/hooks/useSendData.ts";
import {useAuthContext} from "../../../shared/contexts/authContext.ts";
import type {jwtToken} from "../../../entities/token/jwtRoken.ts";
import type {LoginRequest} from "../../../entities/login/loginEntity.ts";

function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const {sendRequest, error} = useSendData<jwtToken>("/auth/login");
    const {setAuth} = useAuthContext();

    const sendLoginRequest = async (e: MouseEvent): Promise<void> => {
        e.preventDefault();

        const body: LoginRequest = {
            "email": email,
            "password": password
        };

        const response = await sendRequest(body);

        if (error || response == null) {
            console.error("kaput login-form");
            return;
        }

        setAuth(response);
        navigate("/")
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
            <SubmitButton onClick={(e: MouseEvent) => sendLoginRequest(e)} text="Sign In"/>
        </form>
    );
}

export default LoginForm;