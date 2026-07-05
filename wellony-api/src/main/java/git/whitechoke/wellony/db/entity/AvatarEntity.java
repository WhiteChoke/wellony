package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User_avatars")
public class AvatarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @OneToOne(mappedBy = "avatar")
    private UserEntity user;
    @Column(name = "avatar", columnDefinition = "bytea")
    private byte[] data;
}
