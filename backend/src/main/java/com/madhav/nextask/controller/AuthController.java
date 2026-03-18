package com.madhav.nextask.controller;

import com.madhav.nextask.dto.ChangePasswordRequest;
import com.madhav.nextask.dto.LoginRequest;
import com.madhav.nextask.dto.UpdateUserRequest;
import com.madhav.nextask.entity.User;
import com.madhav.nextask.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        String token = authService.login(request);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }

    @GetMapping("/me")
    public User getCurrentUser(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        return authService.getUserById(userId);
    }

    @PatchMapping("/me")
    public User updateCurrentUser(@RequestBody UpdateUserRequest updateUserRequest, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        return authService.updateUser(userId, updateUserRequest);
    }

    @PostMapping("/change-password")
    public Map<String, String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }

        authService.changePassword(userId, changePasswordRequest);
        return Map.of("message", "Password updated successfully");
    }
}
