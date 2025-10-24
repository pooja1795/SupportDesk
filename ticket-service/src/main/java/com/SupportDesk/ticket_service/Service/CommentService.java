package com.SupportDesk.ticket_service.Service;

import com.SupportDesk.ticket_service.Entity.CommentEntity;
import com.SupportDesk.ticket_service.Repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentEntity addComment(String message, String ticketId, String userName) {
        CommentEntity comment = CommentEntity.builder().
                message(message).
                ticketId(ticketId).
                author(userName).
                createdAt(Instant.now()).
                build();
        return commentRepository.save(comment);
    }

    public List<CommentEntity> getComments(String ticketId) {
        return commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
    }
}
