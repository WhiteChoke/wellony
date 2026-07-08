import {type ChangeEvent, useState} from "react";
import "./AvatarLoader.css"

interface AvatarProps {
    avatar: File | null;
    setAvatar: (file: File) => void;
}

export default function AvatarLoader(props: AvatarProps) {

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return

        const file: File = e.target.files[0];
        props.setAvatar(file);

        const localUrl = URL.createObjectURL(file);
        setAvatarUrl(localUrl);
    }

    return (
        <div className="avatar-container">
            <label htmlFor="avatar-input" className="avatar-label">
                {avatarUrl ? (
                    <img src={avatarUrl} alt="Preview" className="avatar-image" />
                ) : (
                    <div className="avatar-placeholder">
                        <span className="upload-text">Выбрать фото</span>
                    </div>
                )}
                {avatarUrl && (
                    <div className="avatar-overlay">
                        <span>Изменить</span>
                    </div>
                )}
            </label>
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden-input"
            />
        </div>
    );
}