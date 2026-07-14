package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.*;
import git.whitechoke.wellony.db.repository.*;
import git.whitechoke.wellony.dto.chat.*;
import git.whitechoke.wellony.enums.ChatType;
import git.whitechoke.wellony.enums.Role;
import git.whitechoke.wellony.mapper.ChatMapper;
import git.whitechoke.wellony.security.AuthUserDetailsService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final AuthUserDetailsService authService;

    @Transactional
    public ChatCreateResponseDto createChat(ChatCreateRequestDto chatCreateRequestDto) {

        var owner = authService.getUser();

        var createdChat = chatRepository.save(
                ChatEntity.builder()
                        .chatType(chatCreateRequestDto.chatType())
                        .chatName(chatCreateRequestDto.chatName())
                        .build()
        );

        var participantsIdWithoutOwner = chatCreateRequestDto.participantIds().stream()
                .filter(id -> !id.equals(owner.getId()))
                .toList();

        createdChat.addParticipant(ParticipantEntity.builder()
                .user(owner)
                .chat(createdChat)
                .role(chatCreateRequestDto.chatType() == ChatType.GROUP
                        ? Role.OWNER
                        : Role.USER
                ).build()
        );


        Map<Long, UserEntity> users = userRepository.findAllById(chatCreateRequestDto.participantIds()).stream()
                .collect(Collectors.toMap(UserEntity::getId, user -> user));

        participantsIdWithoutOwner.forEach(id -> {
            var user = users.get(id);

            if (user == null) {
                throw new EntityNotFoundException("User with id " + id + " not found");
            }

            createdChat.addParticipant(ParticipantEntity.builder()
                    .chat(createdChat)
                    .user(user)
                    .role(Role.USER)
                    .build());
        });

        return chatMapper.toCreateResponseDto(createdChat);
    }

    public ChatGetRequest getUserChats() {

        var user = authService.getUser();

        var chats = chatRepository.findAllByParticipantsUserId(user.getId());

        var chatDto = chats.stream()
                .map(chat -> {
                    var dto = ChatDetailDto.builder().id(chat.getId());

                    if (chat.getChatType().equals(ChatType.DIRECT)) {
                        var companion = chat.getParticipants().stream()
                                .filter(p -> !p.getUser().getId().equals(user.getId()))
                                .findFirst()
                                .orElseThrow(() -> new EntityNotFoundException("User not found"));
                        dto.chatName(companion.getUser().getUsername());
                        dto.chatAvatarId(companion.getUser().getId());

                        return dto.build();
                    }
                    return dto.chatAvatarId(chat.getId()).chatName(chat.getChatName()).build();
                }).toList();

        return ChatGetRequest.builder().chats(chatDto).build();
    }
}
