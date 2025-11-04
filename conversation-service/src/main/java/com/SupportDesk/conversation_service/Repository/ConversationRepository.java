package com.SupportDesk.conversation_service.Repository;

import com.SupportDesk.conversation_service.Entity.ConversationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConversationRepository extends MongoRepository<ConversationEntity, String> {

    List<ConversationEntity> findByCreatedBy(String username);
    List<ConversationEntity> findByAssigneeName(String username);
    List<ConversationEntity> findByTeamId(String teamId);
    List<ConversationEntity> findByInboxId(String inboxId);
    List<ConversationEntity> findByAssigned(boolean assigned);

}
