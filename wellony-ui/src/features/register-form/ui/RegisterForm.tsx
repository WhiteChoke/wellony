import {useAuthContext} from "../../../shared/contexts/authContext.ts";
import {type ChangeEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AvatarLoader from "../../../shared/ui/avatar-loader/AvatarLoader.tsx";
import SubmitButton from "../../../shared/ui/submit-button/SubmitButton.tsx";
import useSendData from "../../../shared/hooks/useSendData.ts";
import type {RegisterRequest} from "../../../entities/register/registerEntity.ts";
import type {jwtToken} from "../../../entities/token/jwtRoken.ts";

function RegisterForm() {


    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [avatar, setAvatar] = useState<File | null>(null)

    const {sendRequest, error} = useSendData<jwtToken>("/auth/register", "multipart/form-data");
    const navigate = useNavigate();
    const {setAuth} = useAuthContext();

    const sendRegisterRequest = async (e: MouseEvent) => {
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

        const response = await sendRequest(formData);

        if (error || response === null) {
            console.log("kaput register");
            return;
        }

        setAuth(response);
        navigate("/")
    }
    return (
        <form className="auth-form">
            <AvatarLoader avatar={avatar} setAvatar={setAvatar}/>
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
            <SubmitButton onClick={(e: MouseEvent) => sendRegisterRequest(e)} text="Sign In"/>
        </form>
    );
}

export default RegisterForm;