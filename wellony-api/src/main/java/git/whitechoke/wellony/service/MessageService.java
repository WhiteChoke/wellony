package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.MessageEntity;
import git.whitechoke.wellony.db.repository.ChatRepository;
import git.whitechoke.wellony.db.repository.DialogueRepository;
import git.whitechoke.wellony.db.repository.MessageRepository;
import git.whitechoke.wellony.db.repository.ParticipantRepository;
import git.whitechoke.wellony.dto.message.MessageSendRequestDto;
import git.whitechoke.wellony.dto.message.MessageSendResponseDto;
import git.whitechoke.wellony.security.AuthUserDetailsService;
import git.whitechoke.wellony.security.JwtUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final AuthUserDetailsService authUserDetailsService ;

    @Transactional
    public MessageSendResponseDto sendMessage(Long chatId, MessageSendRequestDto request) {
        var sender = authUserDetailsService.getUser();

        var chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Chat with id " + chatId + " not found"));

        var created = messageRepository.save(
                MessageEntity.builder()
                        .message(request.message())
                        .sender(sender)
                        .chat(chat)
                        .sentAt(Instant.now())
                        .build()
        );

        return MessageSendResponseDto.builder()
                .messageId(created.getId())
                .sentAt(created.getSentAt())
                .senderName(sender.getUsername())
                .senderId(sender.getId())
                .build();
    }
}
