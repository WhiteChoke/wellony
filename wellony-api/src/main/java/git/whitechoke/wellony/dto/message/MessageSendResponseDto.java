package git.whitechoke.wellony.dto.message;

import lombok.Builder;

import java.time.Instant;

@Builder
public record MessageSendResponseDto(
        Long messageId,
        Instant sentAt,
        String senderName,
        Long senderId
) {
}
