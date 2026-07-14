package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.dto.chat.ChatCreateResponseDto;
import git.whitechoke.wellony.dto.chat.ChatCreateRequestDto;
import git.whitechoke.wellony.dto.chat.ChatGetRequest;
import git.whitechoke.wellony.dto.message.MessageSendRequestDto;
import git.whitechoke.wellony.dto.message.MessageSendResponseDto;
import git.whitechoke.wellony.service.ChatService;
import git.whitechoke.wellony.service.MessageService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/chats")
public class ChatController {

    private final ChatService chatService;
    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<ChatCreateResponseDto> createGrope(
            @Valid @RequestBody ChatCreateRequestDto chatCreateRequestDto
    ) {
        var response = chatService.createChat(chatCreateRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ChatGetRequest> getChats() {

        var response = chatService.getUserChats();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public MessageSendResponseDto sendMessageToChat(@DestinationVariable Long chatId,
                                                    @Payload @Valid MessageSendRequestDto request)
    {
        return messageService.sendMessage(chatId, request);
    }
}
