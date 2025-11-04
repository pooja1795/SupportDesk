package com.SupportDesk.conversation_service.Controller;

import com.SupportDesk.conversation_service.Entity.CommentEntity;
import com.SupportDesk.conversation_service.Service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{ticketId}")
    public CommentEntity addComment(@RequestBody CommentEntity comment, @PathVariable String ticketId, HttpServletRequest request){
        String userName = request.getHeader("X-User-Name");
        return commentService.addComment(comment.getMessage(),ticketId,userName);
    }

    @GetMapping("/{ticketId}")
    public List<CommentEntity> getComments(@PathVariable String ticketId){
        return commentService.getComments(ticketId);
    }
}

