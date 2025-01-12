package com.seed3.synebankapp.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * Class defines operations invloving JSON Web Tokens (JWT)
 */
@Component
public class JwtUtility {

    private final SecretKey SECRET_KEY;

    public JwtUtility(@Value("${jwt.secret}") String secretKey) {

        this.SECRET_KEY = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    /**
     * Function gets username of a User from the Jwt token
     *
     * @param token
     * @return username stored in Jwt token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Function gets the expiration date of a token
     *
     * @param token
     * @return the expiration date of the Jwt Token
     */
    public Date extractExpirationDate(String token) {

        return extractClaim(token, claims -> claims.getExpiration());
    }

    /**
     * Function extracts a specific claim (key-value pair) from a web token
     *
     * @param <T>
     * @param token
     * @param claimsResolver the functional interface used to extract the
     * specific claim
     * @return a claim in the payload of the token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Function checks if a token has expired
     * @param token
     * @return if token did expire
     */
    private boolean isTokenExpired(String token) {

        return extractExpirationDate(token).before(new Date());
    }

    /**
     * Method generates a new JSON Web Token (JWT)
     * @param username
     * @return the JWT
     */
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    /**
     * Function creates a JSON Web token
     *
     * @param claims Empty map object representing key-value pairs of the
     * payload (user info)
     * @param subject The username
     * @return a JSON Web Token as a String
     */
    public String createToken(Map<String, Object> claims, String subject) {

        return Jwts.builder()
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .subject(subject)
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) //Expires in 10hrs
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Method takes all claims (key-value pairs) from the payload of token
     * @param token
     * @return the claims from a token
     */
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(SECRET_KEY) //detting the key to verify the token with
                .build() //finalizes parser configuration
                .parseSignedClaims(token) //parses token, verifies the signature
                .getPayload(); //returns payload of token (user info)

    }

    /**
     * Method checks if the token is exired and that it belongs to the user
     * @param token
     * @param username
     * @return if the token is valid
     */
    public boolean validateToken(String token, String username) {

        final String extractedUsername = extractUsername(token);
        return extractedUsername.equals(username) && !isTokenExpired(token);
    }
}
