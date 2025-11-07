package com.SupportDesk.gateway.Config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {

    @Bean
    public RouteLocator coustomRoutes(RouteLocatorBuilder builder) {
        return builder.routes().route("auth-service", r -> r.path("/auth/**")
                                    .uri("lb://auth-service"))
                                .route("conversation-service", r -> r.path("/conversations/**")
                                     .uri("lb://conversation-service"))
                                .build();
    }
}
