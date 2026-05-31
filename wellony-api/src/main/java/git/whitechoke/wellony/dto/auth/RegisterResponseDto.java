package git.whitechoke.wellony.dto.auth;

import jakarta.annotation.Nonnull;
import lombok.Builder;

@Builder
public record RegisterResponseDto(
        @Nonnull Long id,
        @Nonnull String token,
        @Nonnull Integer expire
) {
}
