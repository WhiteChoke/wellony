package git.whitechoke.wellony.dto.user.create;


import jakarta.annotation.Nonnull;
import lombok.Builder;

@Builder
public record UserCreateResponseDto(
        @Nonnull Long id,
        @Nonnull String email,
        @Nonnull String password,
        @Nonnull String username
) { }
