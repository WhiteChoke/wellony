package git.whitechoke.wellony.dto.message;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MessageSendRequestDto(
        @NotBlank(message = "Message cant be blank")
        @Size(max = 500, message = "Message should be fewer then 500 characters")
        String message
) {
}
