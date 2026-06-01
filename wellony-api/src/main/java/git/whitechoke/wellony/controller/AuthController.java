package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.dto.auth.LoginRequestDto;
import git.whitechoke.wellony.dto.auth.LoginResponseDto;
import git.whitechoke.wellony.dto.auth.RegisterRequestDto;
import git.whitechoke.wellony.dto.auth.RegisterResponseDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @Valid @RequestBody UserCreateRequestDto request
    ) {
        var response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginRequestDto request
    ) {
        var response = authService.login(request);

        return  ResponseEntity
                 .status(HttpStatus.OK)
                 .body(response);
    }
}
