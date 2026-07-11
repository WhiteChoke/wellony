import {useAuthContext} from "../../shared/contexts/authContext.ts";
import {useEffect, useState} from "react";
import defaultAvatar from "../../shared/assets/defaultAvatar.png";
import useFetch from "../../shared/hooks/useFetch.ts";
import Loader from "../../shared/ui/loader/Loader.tsx";

function UserInfo() {
    const {auth} = useAuthContext();
    const [avatar, setAvatar] = useState<string>(defaultAvatar);

    const {sendRequest, error, isLoading} = useFetch<Blob>(`/users/avatar/${auth.id}`, "blob")
    
    useEffect(() => {
        async function loadAvatar() {
            const avatarBlob = await sendRequest();
            
            if (error || avatarBlob == null) {
                console.error("Error loading avatar");
                return;
            }
            
            setAvatar(URL.createObjectURL(avatarBlob));
        }
        
        loadAvatar();
    }, [error, sendRequest])
    
    if (isLoading) {
        return <Loader/>;
    }
    
    return (
        <div>
            <img src={avatar} alt="avatar" className="user_avatar"/>
            <span className="username">{auth.username}</span>
        </div>
    );
}

export default UserInfo;