import type {FoundUserInfo} from "../../../entities/user/userEntity.ts";
import {type ChangeEvent, useEffect, useState} from "react";
import cl from "../styles/PopUpSearch.module.css"
import useDebounce from "../../../shared/hooks/useDebound.ts";
import {getUserAvatar, searchForUser} from "../../../entities/api/UserRequests.ts";
import {useAuthContext} from "../../../shared/contexts/authContext.ts";
import FoundUserItem from "../../found-user-item/FoundUserItem.tsx";

interface PopUpSearchProps {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void,
}

function PopUpSearch(props: PopUpSearchProps) {
    const [found, setFound] = useState<FoundUserInfo[]>([]);
    const rootClasses = [cl.PopUpSearch]
    const foundClasses = [cl.FoundUsersContainer]
    const [username, setUsername] = useState("");
    const debouncedSearch = useDebounce(username)
    const auth = useAuthContext();

    if (props.isVisible) {
        rootClasses.push(cl.active);
    }

    if (found.length == 0) {
        foundClasses.push(cl.empty);
    }

    useEffect(() => {


        const token = auth.auth.token

        const fetchUsers = async () => {
            if (debouncedSearch === "") {
                setFound([]);
                return;
            }

            const usersList = await searchForUser(token, debouncedSearch);

            const userPromises = usersList.data.map(async (u: SearchUserInfo)=> {
                const avatarRes = await getUserAvatar(token, u.id);
                const avatarBlob = avatarRes.data;

                return {
                    id: u.id,
                    avatar: avatarBlob,
                    name: u.username,
                } as FoundUserInfo;
            });


            const finalUsersList: FoundUserInfo[] = await Promise.all(userPromises);

            setFound(finalUsersList);
        }

        fetchUsers();

    }, [debouncedSearch, auth.auth.token]);

    return (
        <div
            className={rootClasses.join(" ")}
            onClick={() => props.setIsVisible(false)}
        >
            <div className={cl.SearchContainer}
                 onClick={(e) => e.stopPropagation()}>
                <input
                    placeholder="enter the nickname"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    value={username}
                    className={cl.searchInput}
                />
                <div className={foundClasses.join(" ")}>
                    {
                        found && found.length > 0
                            ? found.map(u => <FoundUserItem key={u.id} user={u}/>)
                            : <span>Not found :(</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default PopUpSearch;