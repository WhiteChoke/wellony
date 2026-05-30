package git.whitechoke.wellony.dto.auth;

public record RegisterDto(
        Long id,
        String token,
        int expire
) {
}
