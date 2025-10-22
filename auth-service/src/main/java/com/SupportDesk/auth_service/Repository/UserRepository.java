package com.SupportDesk.auth_service.Repository;

import com.SupportDesk.auth_service.Entity.UserEntity;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Component
public interface UserRepository extends MongoRepository<UserEntity,String> {
    boolean existsByUsername(@NonNull String username);

    Optional<UserEntity> findByUsername(String username);
}
