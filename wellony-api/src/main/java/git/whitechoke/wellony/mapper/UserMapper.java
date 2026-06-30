package git.whitechoke.wellony.mapper;

import git.whitechoke.wellony.db.entity.UserEntity;
import git.whitechoke.wellony.dto.user.UserGetInfoResponseDto;
import git.whitechoke.wellony.dto.user.UserSearchResponseDto;
import git.whitechoke.wellony.dto.user.create.UserCreateRequestDto;
import git.whitechoke.wellony.dto.user.create.UserCreateResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface UserMapper {
    UserCreateResponseDto toUserCreateResponseDto(UserEntity entity);
    @Mapping(target = "avatar", ignore = true)
    UserEntity toUserEntity(UserCreateRequestDto dto);
    UserGetInfoResponseDto toGetResponseDto(UserEntity entity);
    UserSearchResponseDto toUserSearchResponseDto(UserEntity entity);
}
