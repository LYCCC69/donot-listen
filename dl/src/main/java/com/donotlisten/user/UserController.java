package com.donotlisten.user;

import com.donotlisten.auth.JwtAuthenticationFilter.AuthUser;
import com.donotlisten.auth.UserRepository;
import com.donotlisten.common.ApiResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ApiResponse<Map<String, Object>> getProfile(@AuthenticationPrincipal AuthUser authUser) {
        var user = userRepository.findById(authUser.userId())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        var profile = Map.<String, Object>of(
                "userId", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "level", user.getLevel(),
                "totalListening", user.getTotalListening(),
                "masteredCount", user.getMasteredCount(),
                "joinDate", user.getJoinDate().toString()
        );
        return ApiResponse.success(profile);
    }
}
