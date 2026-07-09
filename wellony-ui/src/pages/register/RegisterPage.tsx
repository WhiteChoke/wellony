import { useState, type ChangeEvent } from "react";
import SubmitButton from "../../widgets/submitButton/SubmitButton.tsx";
import { useAuthContext } from "../../shared/contexts/authContext.ts";
import type { RegisterRequest } from "../../entities/user/userEntity.ts";
import { registerRequest } from "../../entities/api/AuthRequests.ts";
import { Link, useNavigate } from "react-router-dom";
import "../sign-up/styles/AuthStyle.css"
import AvatarLoader from "../../widgets/avatarLoader/AvatarLoader.tsx";

function RegisterPage() {

    const authContext = useAuthContext();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [avatar, setAvatar] = useState<File | null>(null)

    const nav = useNavigate();

    const sendRegisterRequest = (e: MouseEvent) => {
        e.preventDefault();    

        const formData = new FormData();

        if (avatar) {
            formData.append("avatar", avatar);
        }

        const body: RegisterRequest = {
            username: username,
            email: email,
            password: password,
        };

        formData.append(
            "user",
            new Blob([JSON.stringify(body)], {type: 'application/json'})
        );

        registerRequest(formData)
        .then((res) => {
            authContext.setAuth(res.data);
            nav("/")
        })
        .catch((e: Error) => console.error(e.message));

    }
    return (
        <form className="auth-form">
            <AvatarLoader avatar={avatar} setAvatar={setAvatar} />
            <div className="input-field">
                <label htmlFor="username">your username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
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
            <Link to="/login">Login</Link>
            <SubmitButton onClick={(e: MouseEvent) => sendRegisterRequest(e)} text="Sign In" />
        </form>
    );
}

export default RegisterPage;