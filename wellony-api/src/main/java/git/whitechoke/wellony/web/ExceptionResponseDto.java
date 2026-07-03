package git.whitechoke.wellony.web;

import lombok.Builder;

import java.time.Instant;

@Builder
public record ExceptionResponseDto(
        String message,
        String detailMessage,
        Instant timestamp
) {
}
