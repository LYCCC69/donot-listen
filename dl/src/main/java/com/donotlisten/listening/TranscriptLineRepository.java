package com.donotlisten.listening;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TranscriptLineRepository extends JpaRepository<TranscriptLineEntity, String> {
    List<TranscriptLineEntity> findByListeningIdOrderByNumberAsc(String listeningId);
}
