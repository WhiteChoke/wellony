package git.whitechoke.wellony.dto.user;

import jakarta.annotation.Nonnull;

public record UserGetResponseDto(
        @Nonnull Long id,
        @Nonnull String username
) {
}
