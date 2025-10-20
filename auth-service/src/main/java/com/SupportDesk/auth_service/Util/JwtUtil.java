package com.SupportDesk.auth_service.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long expiration;

    public JwtUtil(@Value("${jwt.secreteKey}") String secreteKey, @Value("${jwt.expiration-ms}") long expiration) {
        this.key= Keys.hmacShaKeyFor(secreteKey.getBytes());
        this.expiration = expiration;
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiry =  new Date(now.getTime() + expiration);
        return Jwts.builder().setSubject(username).setIssuedAt(now).setExpiration(expiry).signWith(key, SignatureAlgorithm.HS256).compact();

    }

    public Jws<Claims> validateToken(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}
