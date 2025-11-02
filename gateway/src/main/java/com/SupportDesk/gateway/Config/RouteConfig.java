package com.SupportDesk.gateway.Config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {
    public RouteLocator coustomRoutes(RouteLocatorBuilder builder) {
        return builder.routes().route("auth-service", r -> r.path("/auth/**")
                                    .uri("lb://auth-service"))
                                .route("ticket-service", r -> r.path("/api/tickets/**")
                                     .uri("lb://ticket-service"))
                                .build();
    }
}
