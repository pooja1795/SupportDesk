package com.SupportDesk.conversation_service.Entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@Document(collection = "comments")
public class CommentEntity {
    @Id
    private String id;
    private String ticketId;
    private String author;        // Username of commenter
    private String message;       // Text of the comment
    private Instant createdAt;
}
