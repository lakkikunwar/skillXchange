// src/main/java/com/skillxchange/config/JwtAuthenticationFilter.java
package com.skillxchange.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtilInstance;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain chain)
            throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            logger.debug("Processing request with Authorization header: {}", authHeader);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                logger.debug("No valid Bearer token found in Authorization header");
                chain.doFilter(request, response);
                return;
            }

            String token = authHeader.substring(7);
            logger.debug("Extracted JWT: {}", token);

            if (jwtUtilInstance.validateToken(token)) {
                String email = jwtUtilInstance.extractEmail(token);
                logger.debug("Validated token, extracted email: {}", email);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        email, null, null);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.debug("Set authentication for user: {}", email);
            } else {
                logger.warn("Invalid or expired JWT token");
            }
        } catch (Exception e) {
            logger.error("Error processing JWT token: {}", e.getMessage());
        }

        chain.doFilter(request, response);
    }
}