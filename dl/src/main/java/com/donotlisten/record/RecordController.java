package com.donotlisten.record;

import com.donotlisten.auth.JwtAuthenticationFilter.AuthUser;
import com.donotlisten.common.ApiResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class RecordController {

    @PostMapping("/listening/feedback")
    public ApiResponse<Void> submitFeedback(
            @AuthenticationPrincipal AuthUser user,
            @RequestBody Map<String, Object> body) {
        return ApiResponse.success("反馈提交成功", null);
    }

    @GetMapping("/user/learning-records")
    public ApiResponse<Map<String, Object>> getLearningRecords(
            @AuthenticationPrincipal AuthUser user,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {

        var statistics = Map.of(
                "totalListeningTime", 15230,
                "totalUnderstood", 320,
                "totalFamiliar", 180,
                "totalUnfamiliar", 65
        );

        var records = List.of(
                Map.of("id", "record_001", "listeningId", "123",
                        "listeningTitle", "2024年6月英语四级听力",
                        "duration", 180, "lastPractice", "2024-06-15T14:30:00Z")
        );

        var result = new HashMap<String, Object>();
        result.put("total", 45);
        result.put("statistics", statistics);
        result.put("records", records);
        return ApiResponse.success(result);
    }

    @DeleteMapping("/user/learning-records")
    public ApiResponse<Void> clearLearningRecords(@AuthenticationPrincipal AuthUser user) {
        return ApiResponse.success("学习记录已清空", null);
    }
}
