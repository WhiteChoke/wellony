package git.whitechoke.wellony.dto.auth;

import jakarta.validation.constraints.NotNull;

public record RegisterRequestDto(
        @NotNull String email,
        @NotNull String password,
        @NotNull String username
) {
}
