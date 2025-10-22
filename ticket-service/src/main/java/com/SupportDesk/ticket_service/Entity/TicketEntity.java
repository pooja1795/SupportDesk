package com.SupportDesk.ticket_service.Entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "tickets")
@Data
@Builder
public class TicketEntity {
    @Id
    private String id;
    private String title;
    private String description;
    private String createdBy;
    private String assignedTo;
    private String status; // OPEN, IN_PROGRESS, CLOSED
    private Instant createdAt;
    private Instant updatedAt;
    private List<String> tags;
}
