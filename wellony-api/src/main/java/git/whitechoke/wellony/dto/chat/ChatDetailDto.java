package git.whitechoke.wellony.dto.chat;

import lombok.Builder;

@Builder
public record ChatDetailDto(
        String chatName,
        String chatAvatar,
        Long id
) {
}
