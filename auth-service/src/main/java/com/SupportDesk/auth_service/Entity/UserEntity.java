package com.SupportDesk.auth_service.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;
import java.util.Set;

@Data
@Document(collection = "users")
public class UserEntity {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private Boolean enabled = true;
    private OffsetDateTime createdAt = OffsetDateTime.now();
    private Set<String> roles;
}
