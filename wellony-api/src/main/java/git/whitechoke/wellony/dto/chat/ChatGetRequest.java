package git.whitechoke.wellony.dto.chat;

import lombok.Builder;

import java.util.List;

@Builder
public record ChatGetRequest(
        List<ChatDetailDto> chats
) {
}
