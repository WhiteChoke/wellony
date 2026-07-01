package git.whitechoke.wellony.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "Dialogue",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"first_user_id", "second_user_id"})
        }
)
@NamedEntityGraph(
        name = "Dialogue_with_users",
        attributeNodes = {
                @NamedAttributeNode("firstUser"),
                @NamedAttributeNode("secondUser")
        }
)
public class DialogueEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_user_id", nullable = false)
    private UserEntity firstUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "second_user_id", nullable = false)
    private UserEntity secondUser;
}
