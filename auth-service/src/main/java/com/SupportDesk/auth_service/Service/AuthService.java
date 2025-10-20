package com.SupportDesk.auth_service.Service;

import com.SupportDesk.auth_service.DTO.AuthResponse;
import com.SupportDesk.auth_service.DTO.LoginRequest;
import com.SupportDesk.auth_service.DTO.RegisterRequest;
import com.SupportDesk.auth_service.Entity.RoleEntity;
import com.SupportDesk.auth_service.Entity.UserEntity;
import com.SupportDesk.auth_service.Repository.RoleRepository;
import com.SupportDesk.auth_service.Repository.UserRepository;
import com.SupportDesk.auth_service.Util.JwtUtil;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.management.relation.Role;
import java.util.Set;

@Component
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtUtil = jwtUtil;
    }
    public void register(RegisterRequest req) {
        if(userRepository.existsByUserName(req.getUsername())){
            throw new IllegalArgumentException("Username or email already exists");
        }
        RoleEntity userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new RoleEntity(null, "ROLE_USER")));

        UserEntity user = new UserEntity();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRoles(Set.of(userRole.getName()));
        userRepository.save(user);

    }

    public AuthResponse login(LoginRequest loginRequest) {
        UserEntity user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, "Bearer");
    }
}
