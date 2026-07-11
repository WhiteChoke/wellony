import {useEffect, useState} from 'react';
import type {ChatGetRequest, ChatInfo} from "../../entities/chat/chatEntity.ts";
import useFetch from "../../shared/hooks/useFetch.ts";
import Loader from '../../shared/ui/loader/Loader.tsx';
import defaultAvatar from "../../shared/assets/defaultAvatar.png"
import loupeIcon from "../../shared/assets/loupe.svg"
import { useWebSocketContext } from '../../shared/contexts/webSocketContext.ts';
import { useChatListContext } from '../../shared/contexts/chatListContext.ts';
import ChatItem from '../chatItem/ChatItem.tsx';

interface ChatListProps {
    setIsSearching: (value: boolean) => void,
}

function ChatList(props: ChatListProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const webSocketContext = useWebSocketContext();
    const {sendRequest: fetchChats, error: chatsError} = useFetch<ChatGetRequest>("/chats");
    // TODO: Create endpoint for fetch avatar with id in query params
    const {sendRequest: fetchAvatar, error: avatarError} = useFetch<Blob>("/avatar");
    const {chatList, setChatList} = useChatListContext();

    useEffect(() => {
        async function fetchData() {
            const chatResponse = await fetchChats();

            if (chatsError || chatResponse == null) {
                console.error("Error fetching chats...");
                return;
            }

            const chatPromises = chatResponse.chats.map(async (c) => {
                const avatarResponse = await fetchAvatar({id: c.chatAvatarId})

                return {
                    id: c.id,
                    name: c.chatName,
                    avatar: avatarResponse ?? defaultAvatar,
                } as ChatInfo;
            });

            const finalChatList = await Promise.all(chatPromises);

            setChatList(finalChatList)
        }

        fetchData().finally(() => setIsLoading(false));

    }, []);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="chat_list">
            {chatList.map((chat: ChatInfo) =>
                (
                    <ChatItem
                        key={chat.id}
                        id={chat.id}
                        name={chat.name}
                        avatar={chat.avatar}
                        onClick={() => {
                            webSocketContext.sendMessage(`/app/chat/${chat.id}`, {
                                message: `Hello ${chat.name}!`,
                            })
                        }}
                    />
                )
            )}
            <button
                className="find_button"
                onClick={() => props.setIsSearching(true)}
            >
                <img src={loupeIcon} alt="find_button_icon" />
            </button>
        </div>
    );
}

export default ChatList;