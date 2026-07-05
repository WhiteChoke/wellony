package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.DialogueEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DialogueRepository extends JpaRepository<DialogueEntity, Long> {
    @Query("""
    SELECT d FROM DialogueEntity d 
    WHERE d.firstUser.id = :id OR d.secondUser.id = :id
    """)
    @EntityGraph(value = "Dialogue_with_users", type = EntityGraph.EntityGraphType.LOAD)
    List<DialogueEntity> findAllCompanionsByUserId(@Param("id") Long id);
}
