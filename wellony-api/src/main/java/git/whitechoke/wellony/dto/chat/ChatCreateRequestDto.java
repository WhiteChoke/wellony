package git.whitechoke.wellony.dto.chat;

import git.whitechoke.wellony.enums.ChatType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ChatCreateRequestDto(
        String chatName,
        List<Long> participantIds,
        @NotNull ChatType chatType
) {
}
