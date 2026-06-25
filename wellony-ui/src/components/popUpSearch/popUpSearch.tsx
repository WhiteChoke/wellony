import { useState } from "react";
import type { FoundUserInfo } from "../../interfaces/ApiData";

function PopUpSearch() {
    const [found, setFound] = useState<[FoundUserInfo]>();

    return (
        <div className="pop-up">
            <input
                placeholder="enter the nickname"
                type="text"
            />
            <div>
                {
                    found 
                    ? found.map(u => 
                    <div key={u.id}>
                        <img src={URL.createObjectURL(u.avatar)} alt="found user avatar"/>
                        <span>{u.name}</span>
                    </div>)
                    : <span>Not found :/</span>
                }
            </div>
        </div>
    );
}

export default PopUpSearch;