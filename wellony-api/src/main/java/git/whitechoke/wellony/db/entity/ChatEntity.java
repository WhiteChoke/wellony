package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Chats")
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "chat_name", nullable = false)
    private String chatName;

    @Column(name = "chat_avatar")
    private String chatAvatar;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParticipantEntity> participants = new ArrayList<>();

    public void addParticipant(ParticipantEntity participant) {
        this.participants.add(participant);
        participant.setChat(this);
    }
}