package com.SupportDesk.ticket_service.Service;

import com.SupportDesk.ticket_service.Entity.TicketEntity;
import com.SupportDesk.ticket_service.Repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public TicketEntity creatTicket(TicketEntity ticket) {
        ticket.setCreatedAt(Instant.now());
        ticket.setUpdatedAt(Instant.now());
        ticket.setStatus("OPEN");
        return ticketRepository.save(ticket);
    }

    public List<TicketEntity> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<TicketEntity> getTicketByUser(String userName) {
        return ticketRepository.findByCreatedBy(userName);
    }

    public TicketEntity updateStatus(String ticketId, String status) {
        TicketEntity ticket = ticketRepository.findById(ticketId).orElseThrow(()->new RuntimeException("Ticket not found"));
        ticket.setStatus(status);
        return ticket;
    }
}
