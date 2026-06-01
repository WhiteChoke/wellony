package git.whitechoke.wellony.dto.auth;

import jakarta.validation.constraints.NotNull;

public record LoginRequestDto(
        @NotNull String email,
        @NotNull String password
) {
}
