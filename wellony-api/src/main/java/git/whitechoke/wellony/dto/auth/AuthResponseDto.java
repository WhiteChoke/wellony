package git.whitechoke.wellony.dto.auth;

import jakarta.annotation.Nonnull;
import lombok.Builder;

@Builder
public record AuthResponseDto (
        @Nonnull String token,
        @Nonnull Integer expire,
        @Nonnull Long id
){
}
