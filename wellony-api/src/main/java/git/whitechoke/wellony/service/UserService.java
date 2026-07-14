package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.entity.UserEntity;
import git.whitechoke.wellony.db.repository.AvatarRepository;
import git.whitechoke.wellony.db.repository.ParticipantRepository;
import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.dto.user.UserSearchResponseDto;
import git.whitechoke.wellony.dto.user.UserGetInfoResponseDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.mapper.ChatMapper;
import git.whitechoke.wellony.mapper.UserMapper;
import git.whitechoke.wellony.security.AuthUserDetailsService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthUserDetailsService authService;
    private final ParticipantRepository participantRepository;
    private final AvatarRepository avatarRepository;
    private final UserMapper userMapper;
    private final ChatMapper chatMapper;
    private final BCryptPasswordEncoder encoder;

    @Transactional
    public UserEntity createUser(
            UserCreateRequestDto request,
            MultipartFile avatar
    ) {
        var userToCreate = userMapper.toUserEntity(request);
        userToCreate.setPassword(encoder.encode(request.password()));

        if (avatar != null) {
            try{
                userToCreate.setAvatar(avatar.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to set avatar " + e.getMessage());
            }
        }

        return userRepository.save(userToCreate);

    }

    public byte[] getAvatar(Long id) {
        var avatar = avatarRepository.findByUserId(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));

        var avatarBytes = avatar.getData();

        return avatarBytes;
    }

    public List<UserSearchResponseDto> searchByUsername(String username) {
        var user =  authService.getUser();
        var found = userRepository.searchByUsername("%" + username + "%");
        found.remove(user);


        return found
                .stream()
                .map(userMapper::toUserSearchResponseDto)
                .toList();
    }
}
