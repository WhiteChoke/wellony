package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

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
    @Column(name = "password", unique = true,  nullable = false)
    private String password;
    @Column(name = "email", unique = true,  nullable = false)
    private String email;
}
