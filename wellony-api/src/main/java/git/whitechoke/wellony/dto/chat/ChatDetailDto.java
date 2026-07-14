package git.whitechoke.wellony.dto.chat;

import lombok.Builder;

@Builder
public record ChatDetailDto(
        String chatName,
        Long chatAvatarId,
        Long id
) {
}
