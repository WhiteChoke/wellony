package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.security.AuthUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiry-ms}")
    private int expiryMs;

    public String generateToken(AuthUserDetails userDetails) {

        var claims = new HashMap<String, Object>();
        claims.put("userId", userDetails.getId());

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiryMs))
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token) {
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
