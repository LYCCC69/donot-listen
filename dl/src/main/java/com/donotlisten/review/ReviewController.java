package com.donotlisten.review;

import com.donotlisten.auth.JwtAuthenticationFilter.AuthUser;
import com.donotlisten.common.ApiResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @GetMapping("/queue")
    public ApiResponse<List<Map<String, Object>>> getQueue(@AuthenticationPrincipal AuthUser user) {
        var queue = List.of(
                Map.<String, Object>of(
                        "id", "review_001", "listeningId", "123",
                        "listeningTitle", "2024年6月英语四级听力 - 新闻报道1",
                        "masteryScore", 0.6, "dueDate", "2026-05-22")
        );
        return ApiResponse.success(queue);
    }
}
