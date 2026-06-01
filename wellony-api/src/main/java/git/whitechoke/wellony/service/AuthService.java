package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.repository.RefreshTokenRepository;
import git.whitechoke.wellony.dto.auth.AuthResponseDto;
import git.whitechoke.wellony.dto.auth.LoginRequestDto;
import git.whitechoke.wellony.dto.auth.LoginResponseDto;
import git.whitechoke.wellony.dto.auth.RegisterResponseDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.security.AuthUserDetails;
import git.whitechoke.wellony.security.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;


@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;

    public LoginResponseDto login(LoginRequestDto request, HttpServletResponse response) {

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var accessToken = jwtUtils.generateAccessToken(
                (AuthUserDetails) authentication.getPrincipal()
        );

        var refreshToken = jwtUtils.generateRefreshToken(
                (AuthUserDetails) authentication.getPrincipal()
        );

        var cookies = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(jwtUtils.getRefreshExpiryMs()/1000)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookies.toString());

        return LoginResponseDto.builder().id(
                ((AuthUserDetails) authentication.getPrincipal()).getId())
                .token(accessToken)
                .expire(jwtUtils.getAccessExpiryMs())
                .build();
    }

    public RegisterResponseDto register(UserCreateRequestDto request) {

        var created = userService.createUser(request);

        var accessToken = jwtUtils.generateAccessToken(
                (AuthUserDetails) userDetailsService.loadUserByUsername(created.email())
        );

        return RegisterResponseDto.builder()
                .id(created.id())
                .token(accessToken)
                .expire(jwtUtils.getAccessExpiryMs())
                .build();
    }

    public AuthResponseDto refresh(HttpServletRequest request) {

        var refreshToken = getCookie(request, "refreshToken");
        var tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new AuthorizationDeniedException("Refresh token not found"));

        if (tokenEntity.getExpiresAt().isBefore(Instant.now())) {
            throw new AuthorizationDeniedException("Refresh token expired");
        }

        var token = jwtUtils.generateAccessToken(
                new AuthUserDetails(tokenEntity.getUser())
        );

        return AuthResponseDto.builder()
                .token(token)
                .id(tokenEntity.getUser().getId())
                .expire(jwtUtils.getAccessExpiryMs())
                .build();
    }

    private String getCookie(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(cookie -> name.equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }
}
