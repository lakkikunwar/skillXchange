// src/main/java/com/skillxchange/controller/AuthController.java
package com.skillxchange.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillxchange.model.User;
import com.skillxchange.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User savedUser = userService.signup(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        String token = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }

    @GetMapping("/test")
    public String test() {
        return "CORS and Security test successful!";
    }
}