package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.ChatEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    @EntityGraph(value = "chat_with_participants_and_users", type = EntityGraph.EntityGraphType.LOAD)
    List<ChatEntity> findAllByParticipantsUserId(Long id);
}
