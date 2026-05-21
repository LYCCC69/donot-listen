package com.donotlisten.training;

import com.donotlisten.auth.JwtAuthenticationFilter.AuthUser;
import com.donotlisten.common.ApiResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/training")
public class TrainingController {

    @GetMapping("/today")
    public ApiResponse<Map<String, Object>> getToday(@AuthenticationPrincipal AuthUser user) {
        var data = Map.<String, Object>of(
                "todayLearned", 12,
                "totalUnderstood", 8,
                "totalFamiliar", 3,
                "totalUnfamiliar", 1,
                "streak", 5,
                "totalDays", 30
        );
        return ApiResponse.success(data);
    }
}
