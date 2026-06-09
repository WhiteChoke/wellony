package git.whitechoke.wellony.dto.chat;

import jakarta.validation.constraints.NotNull;

public record MessageSendDto(
        @NotNull Long chatId,
        @NotNull String message
) {
}
