package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.*;
import git.whitechoke.wellony.db.repository.*;
import git.whitechoke.wellony.dto.chat.*;
import git.whitechoke.wellony.enums.Role;
import git.whitechoke.wellony.mapper.ChatMapper;
import git.whitechoke.wellony.security.AuthUserDetailsService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final AuthUserDetailsService authService;
    private final ParticipantRepository participantRepository;
    private final DialogueRepository dialogueRepository;

    @Transactional
    public GropeCreateResponseDto createGrope(GropeCreateRequestDto chatCreateRequestDto) {

        var owner = authService.getUser();

        var createdChat = chatRepository.save(
                ChatEntity.builder()
                    .chatName(chatCreateRequestDto.chatName())
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
    public DialogueCreateResponseDto createDialogue(Long companionId) {
        var user = authService.getUser();
        var companion = userRepository.findById(companionId)
                .orElseThrow(() -> new EntityNotFoundException("Not found user with id=" + companionId));


        var saved = dialogueRepository.save(
                DialogueEntity.builder()
                        .firstUser(user)
                        .secondUser(companion)
                        .build()
        );

        return DialogueCreateResponseDto.builder()
                .companionId(companionId)
                .companionName(companion.getUsername())
                .dialogueId(saved.getId())
                .build();
    }

    public List<DialogueGetResponse> getAllDialogues() {
        var user = authService.getUser();

        var found = dialogueRepository.findAllCompanionsByUserId(user.getId());

        return found.stream().map(chatMapper::toDialogueGetResponse).toList();

    }
}
