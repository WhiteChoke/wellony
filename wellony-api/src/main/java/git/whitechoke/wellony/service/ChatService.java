package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.ChatEntity;
import git.whitechoke.wellony.db.entity.MessageEntity;
import git.whitechoke.wellony.db.entity.ParticipantEntity;
import git.whitechoke.wellony.db.repository.ChatRepository;
import git.whitechoke.wellony.db.repository.MessageRepository;
import git.whitechoke.wellony.db.repository.ParticipantRepository;
import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.dto.chat.*;
import git.whitechoke.wellony.enums.Role;
import git.whitechoke.wellony.mapper.ChatMapper;
import git.whitechoke.wellony.security.AuthUserDetailsService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final AuthUserDetailsService authService;
    private final ParticipantRepository participantRepository;
    private final MessageRepository messageRepository;

    @Transactional
    public ChatCreateResponseDto createChat(ChatCreateRequestDto chatCreateRequestDto) {

        var owner = authService.getUser();

        var createdChat = chatRepository.save(
                ChatEntity.builder()
                    .chatName(chatCreateRequestDto.chatName())
                    .chatAvatar(chatCreateRequestDto.chatAvatarPath())
                    .build()
        );

        createdChat.addParticipant(ParticipantEntity.builder()
                .user(owner)
                .chat(createdChat)
                .role(Role.OWNER)
                .build());

        var users = userRepository.findAllById(chatCreateRequestDto.participantIds());

        chatCreateRequestDto.participantIds().forEach(id -> createdChat.addParticipant(
                ParticipantEntity.builder()
                        .chat(createdChat)
                        .user(users.stream()
                                .filter(u -> Objects.equals(u.getId(), id))
                                .findFirst()
                                .orElse(null)
                        )
                        .role(Role.USER)
                        .build()
        ));

        chatRepository.save(createdChat);

        return chatMapper.toCreateResponseDto(createdChat);

    }

    public ChatGetRequest getUserChats() {

        var user = authService.getUser();

        var participant = participantRepository.findAllByUserId(user.getId());

        var chats = participant.stream().map(chatMapper::toDetailDto).toList();

        return ChatGetRequest.builder().chats(chats).build();
    }

    @Transactional
    public void addMessage(MessageSendDto request) {

        var user  = authService.getUser();
        var chat = chatRepository.findById(request.chatId())
                .orElseThrow(() -> new EntityNotFoundException("Not found chat with id=" + request.chatId()));

        messageRepository.save(
                MessageEntity.builder()
                        .message(request.message())
                        .sender(user)
                        .chat(chat)
                        .build()
        );
    }
}
