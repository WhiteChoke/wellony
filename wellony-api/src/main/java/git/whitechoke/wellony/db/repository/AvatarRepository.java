package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.AvatarEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AvatarRepository extends JpaRepository<AvatarEntity, Long> {
    Optional<AvatarEntity> findByUserId(Long id);
}
