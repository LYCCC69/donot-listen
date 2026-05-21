package com.donotlisten.ai;

import com.donotlisten.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/explain")
    public ApiResponse<String> explain(@RequestParam String lineId) {
        return ApiResponse.success(aiService.explain(lineId));
    }
}
