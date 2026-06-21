package git.whitechoke.wellony.mapper;

import git.whitechoke.wellony.db.entity.ChatEntity;
import git.whitechoke.wellony.db.entity.ParticipantEntity;
import git.whitechoke.wellony.dto.chat.ChatCreateResponseDto;
import git.whitechoke.wellony.dto.chat.ChatDetailDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface ChatMapper {
    @Mapping(target = "participantIds", source = "participants")
    @Mapping(target = "chatId", source = "id")
    ChatCreateResponseDto toCreateResponseDto(ChatEntity chat);

    @Mapping(target = "chatName", source = "chat.chatName")
    @Mapping(target = "chatAvatar", source = "chat.chatAvatar")
    @Mapping(target = "id", source = "chat.id")
    ChatDetailDto toDetailDto(ParticipantEntity participant);

    @Mapping(target = "chatName", source = "chatName")
    @Mapping(target = "chatAvatar", source = "chatAvatar")
    @Mapping(target = "id", source = "id")
    ChatDetailDto toDetailDto(ChatEntity participant);

    default Long map(ParticipantEntity participant) {
        return participant != null ? participant.getId() : null;
    }
}
