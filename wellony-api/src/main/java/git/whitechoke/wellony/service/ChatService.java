package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.ChatEntity;
import git.whitechoke.wellony.db.entity.ParticipantEntity;
import git.whitechoke.wellony.db.repository.ChatRepository;
import git.whitechoke.wellony.db.repository.ParticipantRepository;
import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.dto.chat.ChatCreateRequestDto;
import git.whitechoke.wellony.dto.chat.ChatCreateResponseDto;
import git.whitechoke.wellony.dto.chat.ChatDetailDto;
import git.whitechoke.wellony.dto.chat.ChatGetRequest;
import git.whitechoke.wellony.enums.Role;
import git.whitechoke.wellony.mapper.ChatMapper;
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
    private final AuthService authService;
    private final ParticipantRepository participantRepository;

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
}
