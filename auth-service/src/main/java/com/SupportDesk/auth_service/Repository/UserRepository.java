package com.SupportDesk.auth_service.Repository;

import com.SupportDesk.auth_service.Entity.UserEntity;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity,String> {
    boolean existsByUserName(@NonNull String username);

    Optional<UserEntity> findByUsername(String username);
}
