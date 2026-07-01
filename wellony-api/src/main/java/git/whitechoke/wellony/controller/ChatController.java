package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.dto.chat.GropeCreateRequestDto;
import git.whitechoke.wellony.dto.chat.ChatGetRequest;
import git.whitechoke.wellony.dto.chat.GropeCreateResponseDto;
import git.whitechoke.wellony.service.ChatService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/chats")
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<GropeCreateResponseDto> createGrope(
            @Valid @RequestBody GropeCreateRequestDto gropeCreateRequestDto
    ) {
        var response = chatService.createGrope(gropeCreateRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/dialogue/{companionId}")
    public ResponseEntity<?> createDialogue(@PathVariable Long companionId) {
        var created = chatService.createDialogue(companionId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @GetMapping("/dialogue")
    public ResponseEntity<?> getAllDialogues() {
        var response = chatService.getAllDialogues();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ChatGetRequest> getChats() {

        var response = chatService.getUserChats();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}
