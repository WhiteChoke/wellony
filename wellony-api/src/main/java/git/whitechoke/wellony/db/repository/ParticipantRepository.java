package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.ParticipantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<ParticipantEntity, Long> {
}
