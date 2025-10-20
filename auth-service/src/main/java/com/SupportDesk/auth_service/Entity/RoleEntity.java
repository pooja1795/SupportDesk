package com.SupportDesk.auth_service.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "roles")
public class RoleEntity {
    @Id
    private String id;
    private String name;

}
