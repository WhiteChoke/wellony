package git.whitechoke.wellony.security;

import git.whitechoke.wellony.db.entity.RefreshTokenEntity;
import git.whitechoke.wellony.db.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@Getter
@Component
@RequiredArgsConstructor
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.access-expiry-ms}")
    private int accessExpiryMs;
    @Value("${jwt.refresh-expiry-ms}")
    private long refreshExpiryMs;

    private final RefreshTokenRepository refreshTokenRepository;

    public String generateAccessToken(AuthUserDetails userDetails) {
        var claims = new HashMap<String, Object>();
        claims.put("userId", userDetails.getId());
        claims.put("username", userDetails.getUser().getUsername());

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + accessExpiryMs))
                .signWith(getSigningKey())
                .compact();
    }

    @Transactional
    public String generateRefreshToken(AuthUserDetails userDetails) {

        refreshTokenRepository.deleteByUserId(userDetails.getId());

        var token = UUID.randomUUID().toString();

        refreshTokenRepository.save(
                RefreshTokenEntity.builder()
                        .token(token)
                        .user(userDetails.getUser())
                        .expiresAt(Instant.now().plusMillis(refreshExpiryMs))
                        .build()
        );

        return token;
    }

    public String extractSubject(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        var claims = extractClaims(token);

        return claims.getSubject().equals(userDetails.getUsername())
                && !claims.getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] encodedKey = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(encodedKey);
    }

}
