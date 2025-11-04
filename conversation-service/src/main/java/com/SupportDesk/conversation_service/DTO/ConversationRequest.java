package com.SupportDesk.conversation_service.DTO;

import lombok.Data;
import java.util.List;

@Data
public class ConversationRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String subject;
    private String inboxId;
    private String assignedTeam;
    private String assignedAgent;
    private String createdBy;
    private String message;
    private List<String> tags;
}
