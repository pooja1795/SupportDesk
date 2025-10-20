package com.SupportDesk.auth_service.Controller;

import com.SupportDesk.auth_service.DTO.AuthResponse;
import com.SupportDesk.auth_service.DTO.LoginRequest;
import com.SupportDesk.auth_service.DTO.RegisterRequest;
import com.SupportDesk.auth_service.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);
        return ResponseEntity.ok().build();
    }


    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok().body(authResponse.toString());
    }
}
