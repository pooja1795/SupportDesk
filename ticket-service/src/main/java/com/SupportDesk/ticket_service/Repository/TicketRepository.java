package com.SupportDesk.ticket_service.Repository;

import com.SupportDesk.ticket_service.Entity.TicketEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository extends MongoRepository<TicketEntity, String> {

    List<TicketEntity> findByCreatedBy(String createdBy);
}
