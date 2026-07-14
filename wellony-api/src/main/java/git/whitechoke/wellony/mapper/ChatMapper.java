package git.whitechoke.wellony.mapper;

import git.whitechoke.wellony.db.entity.ChatEntity;
import git.whitechoke.wellony.db.entity.ParticipantEntity;
import git.whitechoke.wellony.dto.chat.ChatCreateResponseDto;
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

    default Long map(ParticipantEntity participant) {
        return participant != null ? participant.getId() : null;
    }
}
