package com.SupportDesk.auth_service.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class RegisterRequest {
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private String email;
}
