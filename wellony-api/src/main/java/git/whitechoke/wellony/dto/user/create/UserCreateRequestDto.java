package git.whitechoke.wellony.dto.user.create;

import jakarta.validation.constraints.NotNull;

public record UserCreateRequestDto(
        @NotNull String email,
        @NotNull String password,
        @NotNull String username
) {
}
