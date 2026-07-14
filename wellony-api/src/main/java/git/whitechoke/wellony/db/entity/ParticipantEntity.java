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
@Table(
        name = "Participants",
        indexes = {
                @Index(name = "idx_participant_user", columnList = "user_id"),
                @Index(name = "idx_participant_chat", columnList = "chat_id"),
                @Index(name = "uk_participant_chat_user", columnList = "user_id, chat_id", unique = true),
        }
)
public class ParticipantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private ChatEntity chat;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
}

