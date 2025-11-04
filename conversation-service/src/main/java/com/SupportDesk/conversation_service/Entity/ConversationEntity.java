package com.SupportDesk.conversation_service.Entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Document(collection = "tickets")
@Data
@Builder
public class ConversationEntity {
    @Id
    private String id;

    // Basic info
    private String subject;          // replaces title
    private String description;      // initial message/summary
    private String status;           // OPEN, PENDING, RESOLVED, CLOSED
    private String priority;         // LOW, MEDIUM, HIGH, URGENT

    // Relationships
    private String inboxId;          // team inbox
    private String teamId;           // team responsible
    private String createdBy;        // username (customer/agent)
    private String assigneeId;       // userId of assigned agent
    private String assigneeName;     // for display

    // Time tracking
    private Instant createdAt;
    private Instant updatedAt;
    private Instant lastActivityAt;

    // Tags and metadata
    private List<String> tags;
    private Map<String, Object> metadata;

    // Convenience fields
    private boolean assigned;
    private int messageCount;
    private int unreadCount;
}
