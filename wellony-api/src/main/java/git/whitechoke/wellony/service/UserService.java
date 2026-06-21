package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.repository.ChatRepository;
import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.dto.user.UserGetResponseDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.dto.user.create.UserCreateResponseDto;
import git.whitechoke.wellony.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder encoder;

    public UserCreateResponseDto createUser(UserCreateRequestDto request) {
        var userToCreate = userMapper.toUserEntity(request);
        userToCreate.setPassword(encoder.encode(request.password()));

        var created = userRepository.save(userToCreate);

        return userMapper.toUserCreateResponseDto(created);
    }

    public UserGetResponseDto getUserInfoById(Long id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        var chats = chatRepository.findByUserId(user.getId());
        

        return userMapper.toGetResponseDto(user);
    }
}
