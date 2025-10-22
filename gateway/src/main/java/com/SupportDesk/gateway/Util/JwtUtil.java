package com.SupportDesk.gateway.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {
    private final Key key;

    public JwtUtil(@Value("${jwt.secreteKey}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }


    public Claims validateToken(String token) {
       try {
           return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
       }catch (ExpiredJwtException e) {
           throw new JwtException("Token expired", e);
       } catch (JwtException e) {
           throw new JwtException("Invalid token", e);
       }
    }
}
