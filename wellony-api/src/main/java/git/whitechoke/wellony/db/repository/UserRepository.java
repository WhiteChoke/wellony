package git.whitechoke.wellony.db.repository;

import git.whitechoke.wellony.db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String username);

    @Query("select u from UserEntity u where username ilike :username")
    List<UserEntity> searchByUsername(@Param("username") String username);
}
