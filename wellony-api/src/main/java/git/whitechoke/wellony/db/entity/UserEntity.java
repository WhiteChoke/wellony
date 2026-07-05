package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

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
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "avatar_id")
    private AvatarEntity avatar;

    public void setAvatar(byte[] data) {
        var userAvatar = new AvatarEntity();
        userAvatar.setUser(this);
        userAvatar.setData(data);
        this.avatar = userAvatar;
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
