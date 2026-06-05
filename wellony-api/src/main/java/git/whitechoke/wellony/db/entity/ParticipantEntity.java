package git.whitechoke.wellony.db.entity;

import git.whitechoke.wellony.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Participants")
public class ParticipantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private ChatEntity chat;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
}

