package com.donotlisten.listening;

import com.donotlisten.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listening")
public class ListeningController {

    private final ListeningService listeningService;

    public ListeningController(ListeningService listeningService) {
        this.listeningService = listeningService;
    }

    @GetMapping("/list")
    public ApiResponse<ListeningDTO.ListResponse> getList(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer level,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        return ApiResponse.success(listeningService.getList(year, level, type, page, pageSize));
    }

    @GetMapping("/detail/{id}")
    public ApiResponse<ListeningDTO.DetailResponse> getDetail(@PathVariable String id) {
        return ApiResponse.success(listeningService.getDetail(id));
    }

    @GetMapping("/transcript/{id}")
    public ApiResponse<ListeningDTO.TranscriptResponse> getTranscript(@PathVariable String id) {
        return ApiResponse.success(listeningService.getTranscript(id));
    }

    @GetMapping("/set")
    public ApiResponse<List<ListeningDTO.ListItem>> getSet(
            @RequestParam Integer year,
            @RequestParam Integer month,
            @RequestParam Integer level,
            @RequestParam Integer setNumber,
            @RequestParam(required = false) String type) {
        return ApiResponse.success(listeningService.getSet(year, month, level, setNumber, type));
    }
}
