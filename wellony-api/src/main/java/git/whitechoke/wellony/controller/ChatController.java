package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.dto.chat.ChatCreateRequestDto;
import git.whitechoke.wellony.dto.chat.ChatCreateResponseDto;
import git.whitechoke.wellony.service.ChatService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatCreateResponseDto> createChat(
            @Valid @RequestBody ChatCreateRequestDto chatCreateRequestDto
    ) {
        var response = chatService.createChat(chatCreateRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
