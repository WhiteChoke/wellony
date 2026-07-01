package git.whitechoke.wellony.dto.chat;

import lombok.Builder;

import java.util.List;

@Builder
public record GropeCreateResponseDto(
        Long chatId,
        String chatName,
        String avatarUrl,
        List<Long> participantIds
) {
}
