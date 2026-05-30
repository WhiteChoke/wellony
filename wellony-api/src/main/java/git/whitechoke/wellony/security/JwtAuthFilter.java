package git.whitechoke.wellony.security;

import git.whitechoke.wellony.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final AuthService authService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException
    {
        String token = extractToken(request);

        if(token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            String username = authService.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if(authService.isTokenValid(token, userDetails)) {
                var authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String BearerToken = request.getHeader("Authorization");

        if (BearerToken != null && BearerToken.startsWith("Bearer ")) {
            return BearerToken.substring(7);
        }

        return null;
    }
}
