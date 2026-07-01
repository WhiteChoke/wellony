package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.DialogueEntity;
import git.whitechoke.wellony.db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DialogueRepository extends JpaRepository<DialogueEntity, Long> {
    @Query(value = """
        SELECT u.* FROM dialogue d
        JOIN users u ON u.id = CASE 
            WHEN d.first_user_id = :id THEN d.second_user_id
            ELSE d.first_user_id
        END
        WHERE d.first_user_id = :id OR d.second_user_id = :id
        """, nativeQuery = true)
    List<UserEntity> findAllCompanionsByUserId(@Param("id") Long id);
}
