package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.ChatEntity;
import git.whitechoke.wellony.db.entity.ParticipantEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<ParticipantEntity, Long> {
    @EntityGraph(attributePaths = {"chat"})
    @Query("select p from ParticipantEntity p where user.id = :id")
    List<ParticipantEntity> findAllByUserId(@Param("id") Long id);

    @Query("select p.chat from ParticipantEntity p where user.id = :id")
    List<ChatEntity> findAllUserChatsById(@Param("id") Long id);
}
