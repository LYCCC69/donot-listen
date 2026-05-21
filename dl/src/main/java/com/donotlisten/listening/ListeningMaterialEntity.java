package com.donotlisten.listening;

import jakarta.persistence.*;

@Entity
@Table(name = "listening_materials")
public class ListeningMaterialEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer month;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ListeningType type;

    @Column(nullable = false)
    private Integer duration;

    @Column(name = "audio_url", nullable = false)
    private String audioUrl;

    @Column(name = "set_number", nullable = false)
    private Integer setNumber;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public Integer getMonth() { return month; }
    public void setMonth(Integer month) { this.month = month; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    public ListeningType getType() { return type; }
    public void setType(ListeningType type) { this.type = type; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
    public Integer getSetNumber() { return setNumber; }
    public void setSetNumber(Integer setNumber) { this.setNumber = setNumber; }

    public enum ListeningType {
        LECTURE, DIALOGUE, PASSAGE
    }
}
