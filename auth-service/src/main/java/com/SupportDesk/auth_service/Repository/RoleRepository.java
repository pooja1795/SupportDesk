package com.SupportDesk.auth_service.Repository;

import com.SupportDesk.auth_service.Entity.RoleEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@Component
public interface RoleRepository extends MongoRepository<RoleEntity,String> {
    Optional<RoleEntity> findByName(String roleUser);
}
