package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.IOException;
import java.io.InputStream;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "username", unique = true,  nullable = false)
    private String username;
    @Column(name = "password",  nullable = false)
    private String password;
    @Column(name = "email", unique = true,  nullable = false)
    private String email;
    @Column(name = "avatar", columnDefinition = "bytea")
    private byte[] avatar = loadAvatar();

    private byte[] loadAvatar() {
        try (InputStream is = UserEntity.class.getResourceAsStream("/static/user.png")) {
            if (is == null) return new byte[0];
            return is.readAllBytes();

        } catch (IOException e) {
            throw new RuntimeException("Failed to load avatar", e);
        }
    }
}
