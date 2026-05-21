package com.donotlisten.collection;

import com.donotlisten.auth.JwtAuthenticationFilter.AuthUser;
import com.donotlisten.common.ApiResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user/collections")
public class CollectionController {

    @GetMapping
    public ApiResponse<Map<String, Object>> getCollections(
            @AuthenticationPrincipal AuthUser user,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        var list = List.of(
                Map.of("id", 1, "listeningId", "123", "listeningTitle", "2024年6月英语四级听力",
                        "level", 4, "type", "LECTURE", "collectedAt", "2024-06-10T09:00:00Z")
        );
        var result = new HashMap<String, Object>();
        result.put("total", list.size());
        result.put("list", list);
        return ApiResponse.success(result);
    }

    @PostMapping
    public ApiResponse<Map<String, String>> addCollection(
            @AuthenticationPrincipal AuthUser user,
            @RequestBody Map<String, String> body) {
        return ApiResponse.success("收藏成功", Map.of("listeningId", body.get("listeningId")));
    }

    @DeleteMapping("/{listeningId}")
    public ApiResponse<Void> removeCollection(
            @AuthenticationPrincipal AuthUser user,
            @PathVariable String listeningId) {
        return ApiResponse.success("取消收藏成功", null);
    }
}
