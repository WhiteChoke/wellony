package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.repository.*;
import git.whitechoke.wellony.dto.message.MessageSendRequestDto;
import git.whitechoke.wellony.dto.message.MessageSendResponseDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;


    @Transactional
    public MessageSendResponseDto sendMessage(Long chatId, MessageSendRequestDto request) {
        var sender = userRepository.findById(request.senderId())
                .orElseThrow(() -> new EntityNotFoundException("Sender with id " + request.senderId() + "not found"));

//        var dialogue = dialogueRepository.findChatBetweenUsers(request.senderId(), chatId)
//                .orElseThrow(() -> new EntityNotFoundException("Chat with id " + chatId + " not found"));
////
//        var created = messageRepository.save(
//                MessageEntity.builder()
//                        .message(request.message())
//                        .sender(sender)
//                        .chat(dialogue)
//                        .sentAt(Instant.now())
//                        .build()
//        );
        System.out.println(request.message());

        return MessageSendResponseDto.builder()
//                .messageId(created.getId())
//                .sentAt(created.getSentAt())
                .senderName(sender.getUsername())
                .senderId(sender.getId())
                .build();
    }
}
