package com.SupportDesk.conversation_service.Service;

import com.SupportDesk.conversation_service.DTO.ConversationRequest;
import com.SupportDesk.conversation_service.Entity.ConversationEntity;
import com.SupportDesk.conversation_service.Repository.ConversationRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ConversationService {
    private final ConversationRepository repo;

    public ConversationService(ConversationRepository repo) {
        this.repo = repo;
    }

    public List<ConversationEntity> getAllConversations() {
        return repo.findAll();
    }

    public ConversationEntity getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
    }

    public List<ConversationEntity> getMyConversations(String username) {
        return repo.findByCreatedBy(username);
    }

    public List<ConversationEntity> getAssignedTo(String username) {
        return repo.findByAssigneeName(username);
    }

    public List<ConversationEntity> getUnassigned() {
        return repo.findByAssigned(false);
    }

    public List<ConversationEntity> getByTeam(String teamId) {
        return repo.findByTeamId(teamId);
    }

    public ConversationEntity createConversation(ConversationRequest req) {
        ConversationEntity c = ConversationEntity.builder()
                .subject(req.getSubject())
                .description(req.getMessage())
                .inboxId(req.getInboxId())
                .teamId(req.getAssignedTeam())
                .assigneeName(req.getAssignedAgent())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .lastActivityAt(Instant.now())
                .status("OPEN")
                .assigned(req.getAssignedAgent() != null)
                .build();

        // (optional) Save contact info (email, first/last name) later in contact-service
        return repo.save(c);
    }

    public ConversationEntity updateStatus(String id, String status) {
        ConversationEntity c = getById(id);
        c.setStatus(status);
        c.setUpdatedAt(Instant.now());
        return repo.save(c);
    }

    public ConversationEntity assign(String id, String assigneeId, String assigneeName) {
        ConversationEntity c = getById(id);
        c.setAssigneeId(assigneeId);
        c.setAssigneeName(assigneeName);
        c.setAssigned(true);
        c.setUpdatedAt(Instant.now());
        return repo.save(c);
    }
}
