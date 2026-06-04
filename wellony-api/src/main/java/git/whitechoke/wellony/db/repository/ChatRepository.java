package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
}
