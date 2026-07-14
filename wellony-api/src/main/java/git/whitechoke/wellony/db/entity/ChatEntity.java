package git.whitechoke.wellony.db.entity;

import git.whitechoke.wellony.enums.ChatType;
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
@NamedEntityGraph(
        name = "chat_with_participants_and_users",
        attributeNodes = {
                @NamedAttributeNode("participants")
        },
        subgraphs = {
                @NamedSubgraph(
                        name = "participant_subgraph",
                        attributeNodes = {
                                @NamedAttributeNode("user")
                        }
                )
        }
)
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "chat_name")
    private String chatName;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "avatar_id")
    private AvatarEntity chatAvatar;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParticipantEntity> participants = new ArrayList<>();

    @Column(name = "chat_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ChatType chatType;

    public void addParticipant(ParticipantEntity participant) {
        this.participants.add(participant);
        participant.setChat(this);
    }
}