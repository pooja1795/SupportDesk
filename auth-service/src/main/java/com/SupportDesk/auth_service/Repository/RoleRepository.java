package com.SupportDesk.auth_service.Repository;

import com.SupportDesk.auth_service.Entity.RoleEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<RoleEntity,String> {
    Optional<RoleEntity> findByName(String roleUser);
}
