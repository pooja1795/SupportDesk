package com.SupportDesk.conversation_service.Controller;

import com.SupportDesk.conversation_service.DTO.ConversationRequest;
import com.SupportDesk.conversation_service.Entity.ConversationEntity;
import com.SupportDesk.conversation_service.Service.ConversationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor
@Component
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping
    public List<ConversationEntity> getAll() {
        return conversationService.getAllConversations();
    }

    @GetMapping("/{id}")
    public ConversationEntity getOne(@PathVariable String id) {
        return conversationService.getById(id);
    }

    @GetMapping("/my")
    public List<ConversationEntity> getMyConversations(HttpServletRequest req) {
        String username = req.getHeader("X-User-Name");
        return conversationService.getMyConversations(username);
    }

    @GetMapping("/assigned")
    public List<ConversationEntity> getAssigned(HttpServletRequest req) {
        String username = req.getHeader("X-User-Name");
        return conversationService.getAssignedTo(username);
    }

    @GetMapping("/unassigned")
    public List<ConversationEntity> getUnassigned() {
        return conversationService.getUnassigned();
    }

    @GetMapping("/team/{teamId}")
    public List<ConversationEntity> getByTeam(@PathVariable String teamId) {
        return conversationService.getByTeam(teamId);
    }

    @PostMapping
    public ConversationEntity createConversation(@RequestBody ConversationRequest conversation, HttpServletRequest req) {
        String username = req.getHeader("X-User-Name");
        conversation.setCreatedBy(username);
        return conversationService.createConversation(conversation);
    }

    @PutMapping("/{id}/status")
    public ConversationEntity updateStatus(@PathVariable String id, @RequestParam String status) {
        return conversationService.updateStatus(id, status);
    }

    @PutMapping("/{id}/assign")
    public ConversationEntity assign(
            @PathVariable String id,
            @RequestParam String assigneeId,
            @RequestParam String assigneeName
    ) {
        return conversationService.assign(id, assigneeId, assigneeName);
    }
}
