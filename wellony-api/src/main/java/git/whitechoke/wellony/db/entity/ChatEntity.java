package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Chats")
@AllArgsConstructor
@NoArgsConstructor
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "chat_name", nullable = false)
    private String chatName;

    @Column(name = "chat_avatar")
    private String chatAvatar;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chat")
    private List<ParticipantEntity> participantIds;
}