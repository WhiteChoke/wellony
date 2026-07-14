package git.whitechoke.wellony.dto.chat;

import lombok.Builder;

import java.util.List;

@Builder
public record ChatCreateResponseDto(
        Long chatId,
        String chatName,
        List<Long> participantIds
) {
}
