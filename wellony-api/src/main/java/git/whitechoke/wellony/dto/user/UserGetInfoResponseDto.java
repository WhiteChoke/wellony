package git.whitechoke.wellony.dto.user;

import git.whitechoke.wellony.dto.chat.ChatDetailDto;
import jakarta.annotation.Nonnull;
import lombok.Builder;

import java.util.List;

@Builder
public record UserGetInfoResponseDto(
        @Nonnull String username,
        @Nonnull String avatarUrl,
        @Nonnull List<ChatDetailDto> chats
) {
}
