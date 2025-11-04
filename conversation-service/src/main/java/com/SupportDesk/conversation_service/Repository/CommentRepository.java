package com.SupportDesk.conversation_service.Repository;

import com.SupportDesk.conversation_service.Entity.CommentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<CommentEntity, String> {
    List<CommentEntity> findByTicketIdOrderByCreatedAtAsc(String ticketId);
}
