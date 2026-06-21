package git.whitechoke.wellony.service;

import git.whitechoke.wellony.db.repository.ParticipantRepository;
import git.whitechoke.wellony.db.repository.UserRepository;
import git.whitechoke.wellony.dto.user.UserGetInfoResponseDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.dto.user.create.UserCreateResponseDto;
import git.whitechoke.wellony.mapper.ChatMapper;
import git.whitechoke.wellony.mapper.UserMapper;
import git.whitechoke.wellony.security.AuthUserDetails;
import git.whitechoke.wellony.security.AuthUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthUserDetailsService authService;
    private final ParticipantRepository participantRepository;
    private final UserMapper userMapper;
    private final ChatMapper chatMapper;
    private final BCryptPasswordEncoder encoder;

    public UserCreateResponseDto createUser(UserCreateRequestDto request) {
        var userToCreate = userMapper.toUserEntity(request);
        userToCreate.setPassword(encoder.encode(request.password()));

        var created = userRepository.save(userToCreate);

        return userMapper.toUserCreateResponseDto(created);
    }

    public UserGetInfoResponseDto getUserInfoById() {
        var user = authService.getUser();

        var chats = participantRepository.findAllUserChatsById(user.getId())
                .stream().map(chatMapper::toDetailDto).toList();


        return UserGetInfoResponseDto.builder()
                .username(user.getUsername())
                .avatarUrl("https://i.pinimg.com/736x/98/3f/0a/983f0af8ad8711e76fa0797b6730cc81.jpg")
                .chats(chats)
                .build();
    }
}
