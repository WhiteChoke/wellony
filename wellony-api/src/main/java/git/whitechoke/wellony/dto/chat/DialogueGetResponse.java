package git.whitechoke.wellony.dto.chat;

import jakarta.annotation.Nonnull;
import lombok.Builder;

@Builder
public record DialogueGetResponse(
        @Nonnull Long companionId,
        @Nonnull String companionName
) {
}
