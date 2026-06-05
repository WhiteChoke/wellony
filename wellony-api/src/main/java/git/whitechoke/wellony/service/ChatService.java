package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.ChatEntity;
import git.whitechoke.wellony.db.entity.ParticipantEntity;
import git.whitechoke.wellony.db.repository.ChatRepository;
import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.dto.chat.ChatCreateRequestDto;
import git.whitechoke.wellony.dto.chat.ChatCreateResponseDto;
import git.whitechoke.wellony.enums.Role;
import git.whitechoke.wellony.mapper.ChatMapper;
import git.whitechoke.wellony.security.AuthUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;

    @Transactional
    public ChatCreateResponseDto createChat(ChatCreateRequestDto chatCreateRequestDto) {
        var authUserDetails = (AuthUserDetails) Objects.requireNonNull(SecurityContextHolder
                        .getContext()
                        .getAuthentication())
                .getPrincipal();

        var owner = authUserDetails.getUser();

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
}
