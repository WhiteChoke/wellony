package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.dto.auth.AuthResponseDto;
import git.whitechoke.wellony.dto.auth.LoginRequestDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestPart("user") UserCreateRequestDto user,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar,
            HttpServletResponse httpResponse
    ) {
        var response = authService.register(user, avatar, httpResponse);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @Valid @RequestBody LoginRequestDto request,
            HttpServletResponse httpResponse
    ) {
        var response = authService.login(request, httpResponse);

        return  ResponseEntity
                 .status(HttpStatus.OK)
                 .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refresh(
            HttpServletRequest httpRequest
    ) {
      var response = authService.refresh(httpRequest);
      return  ResponseEntity
                 .status(HttpStatus.OK)
                 .body(response);
    }
}
