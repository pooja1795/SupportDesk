package com.SupportDesk.ticket_service.Controller;

import com.SupportDesk.ticket_service.Entity.TicketEntity;
import com.SupportDesk.ticket_service.Service.TicketService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@Component
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public TicketEntity createTicket(@RequestBody TicketEntity ticket, HttpServletRequest request ) {
         ticket.setCreatedBy(request.getHeader("X-User-Name"));
         return ticketService.creatTicket(ticket);
    }

    @GetMapping
    public List<TicketEntity> getAll() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/myTickets")
    public List<TicketEntity> getMyTickets(HttpServletRequest request) {
       String userName = request.getHeader("X-User-Name");
       return ticketService.getTicketByUser(userName);
    }

    @PutMapping("/{ticketId}/ticketStatus")
    public TicketEntity updateStatus(@PathVariable String ticketId, @RequestParam String status) {
        return ticketService.updateStatus(ticketId, status);

    }
}
