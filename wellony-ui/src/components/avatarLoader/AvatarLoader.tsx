import {useState} from "react";

export default function FileLoader() {
    const [avatar, setAvatar] = useState<File | null>(null)

    

    return (
        <div className="input-field">
            <input
                type="file"
            />
        </div>
    )
}