package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
}
