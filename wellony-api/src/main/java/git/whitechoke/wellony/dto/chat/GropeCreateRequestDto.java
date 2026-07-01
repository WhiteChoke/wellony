package git.whitechoke.wellony.dto.chat;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record GropeCreateRequestDto(
        @NotNull String chatName,
        List<Long> participantIds
) {
}
