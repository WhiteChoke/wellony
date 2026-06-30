package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

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
    @Builder.Default
    @Column(name = "avatar", columnDefinition = "bytea")
    private byte[] avatar = loadAvatar();

    private static byte[] loadAvatar() {
        try (InputStream is = UserEntity.class.getResourceAsStream("/static/user.png")) {
            if (is == null) return new byte[0];
            return is.readAllBytes();

        } catch (IOException e) {
            throw new RuntimeException("Failed to load avatar", e);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(username, that.username) && Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email);
    }
}
