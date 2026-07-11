import {useEffect, useState} from 'react';
import {getUserAvatar} from "../../entities/api/UserRequests.ts";
import type {ChatGetRequest, ChatInfo} from "../../entities/chat/chatEntity.ts";
import useFetch from "../../shared/hooks/useFetch.ts";

function ChatList() {

    const [chats, setChats] = useState<ChatInfo[]>([]);
    const {sendRequest, error} = useFetch<ChatGetRequest>("/chats");
    const {sendRequest, error} = useFetch<Blob>("/chats");

    useEffect(() => {
        async function fetchChats() {
            const chatResponse = await sendRequest();

            if (error || chatResponse == null) {
                console.error("Error fetching chats...");
                return;
            }

            const chatPromises = chatResponse.chats.map(async (c) => {
                const dialogueAvatar = await getUserAvatar(token, c.chatAvatarId);
                const dialogueAvatarBlob = dialogueAvatar.data;

                return {
                    id: c.id,
                    name: c.chatName,
                    avatar: dialogueAvatarBlob,
                } as ChatInfo;
            });

            const finalChatList = await Promise.all(chatPromises);

            setChats(finalChatList)
        }

        fetchChats().finally(() => setIsLoading(false));

    }, []);

    return (
        <div className="chat_list">
            {chats.map((chat: ChatInfo) =>
                (
                    <ChatItem
                        key={chat.id}
                        id={chat.id}
                        name={chat.name}
                        avatar={chat.avatar}
                        onClick={() => {
                            webSocketContext.sendMessage(`/app/chat/${chat.id}`, {
                                message: `Hello ${chat.name}!`,
                                senderId: auth.auth.id,
                            })
                        }}
                    />
                )
            )}
            <button
                className="find_button"
                onClick={() => setIsSearching(true)}
            >
                <img src={loupeIcon} alt="find_button_icon" />
            </button>
        </div>
    );
}

export default ChatList;