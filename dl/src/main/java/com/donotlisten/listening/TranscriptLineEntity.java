package com.donotlisten.listening;

import jakarta.persistence.*;

@Entity
@Table(name = "transcript_lines")
public class TranscriptLineEntity {

    @Id
    private String id;

    @Column(name = "listening_id", nullable = false)
    private String listeningId;

    @Column(nullable = false)
    private Integer number;

    @Column(length = 30)
    private String speaker;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "start_time", nullable = false)
    private Double startTime;

    @Column(name = "end_time", nullable = false)
    private Double endTime;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getListeningId() { return listeningId; }
    public void setListeningId(String listeningId) { this.listeningId = listeningId; }
    public Integer getNumber() { return number; }
    public void setNumber(Integer number) { this.number = number; }
    public String getSpeaker() { return speaker; }
    public void setSpeaker(String speaker) { this.speaker = speaker; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public Double getStartTime() { return startTime; }
    public void setStartTime(Double startTime) { this.startTime = startTime; }
    public Double getEndTime() { return endTime; }
    public void setEndTime(Double endTime) { this.endTime = endTime; }
}
