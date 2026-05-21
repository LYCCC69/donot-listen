package com.donotlisten.listening;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class ListeningDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListItem {
        private String id;
        private String title;
        private Integer year;
        private Integer month;
        private Integer level;
        private String type;
        private Integer duration;
        private String audioUrl;
        private boolean isCollected;
        private Integer setNumber;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DetailResponse {
        private String id;
        private String title;
        private Integer year;
        private Integer month;
        private Integer level;
        private String type;
        private Integer duration;
        private String audioUrl;
        private boolean isCollected;
        private Integer setNumber;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TranscriptResponse {
        private String listeningId;
        private List<LineItem> lines;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LineItem {
        private String id;
        private Integer number;
        private String speaker;
        private String text;
        private Double startTime;
        private Double endTime;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FeedbackRequest {
        private String listeningId;
        private Integer lineNumber;
        private String status;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private long total;
        private List<ListItem> list;
    }
}
