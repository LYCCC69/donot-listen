package com.donotlisten.listening;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListeningService {

    private final ListeningRepository listeningRepository;
    private final TranscriptLineRepository transcriptLineRepository;

    public ListeningService(ListeningRepository listeningRepository,
                            TranscriptLineRepository transcriptLineRepository) {
        this.listeningRepository = listeningRepository;
        this.transcriptLineRepository = transcriptLineRepository;
    }

    public ListeningDTO.ListResponse getList(Integer year, Integer level,
                                              String typeStr, int page, int pageSize) {
        var pageable = PageRequest.of(page - 1, pageSize);
        Page<ListeningMaterialEntity> result;

        if (year != null && level != null) {
            result = listeningRepository.findByYearAndLevel(year, level, pageable);
        } else if (level != null) {
            result = listeningRepository.findByLevel(level, pageable);
        } else if (typeStr != null) {
            var type = ListeningMaterialEntity.ListeningType.valueOf(typeStr);
            result = listeningRepository.findByType(type, pageable);
        } else {
            result = listeningRepository.findAll(pageable);
        }

        List<ListeningDTO.ListItem> items = result.getContent().stream()
                .map(m -> ListeningDTO.ListItem.builder()
                        .id(m.getId())
                        .title(m.getTitle())
                        .year(m.getYear())
                        .month(m.getMonth())
                        .level(m.getLevel())
                        .type(m.getType().name())
                        .duration(m.getDuration())
                        .audioUrl(m.getAudioUrl())
                        .isCollected(false)
                        .build())
                .collect(Collectors.toList());

        return ListeningDTO.ListResponse.builder()
                .total(result.getTotalElements())
                .list(items)
                .build();
    }

    public ListeningDTO.DetailResponse getDetail(String id) {
        var material = listeningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("材料不存在"));
        return ListeningDTO.DetailResponse.builder()
                .id(material.getId())
                .title(material.getTitle())
                .year(material.getYear())
                .month(material.getMonth())
                .level(material.getLevel())
                .type(material.getType().name())
                .duration(material.getDuration())
                .audioUrl(material.getAudioUrl())
                .isCollected(false)
                .setNumber(material.getSetNumber())
                .build();
    }

    public ListeningDTO.TranscriptResponse getTranscript(String id) {
        var lines = transcriptLineRepository.findByListeningIdOrderByNumberAsc(id);
        List<ListeningDTO.LineItem> lineItems = lines.stream()
                .map(l -> ListeningDTO.LineItem.builder()
                        .id(l.getId())
                        .number(l.getNumber())
                        .speaker(l.getSpeaker())
                        .text(l.getText())
                        .startTime(l.getStartTime())
                        .endTime(l.getEndTime())
                        .build())
                .collect(Collectors.toList());
        return ListeningDTO.TranscriptResponse.builder()
                .listeningId(id)
                .lines(lineItems)
                .build();
    }

    public List<ListeningDTO.ListItem> getSet(Integer year, Integer month,
                                                Integer level, Integer setNumber, String typeStr) {
        var materials = listeningRepository
                .findByYearAndMonthAndLevelAndSetNumber(year, month, level, setNumber);

        var stream = materials.stream();
        if (typeStr != null) {
            var type = ListeningMaterialEntity.ListeningType.valueOf(typeStr);
            stream = stream.filter(m -> m.getType() == type);
        }

        return stream.map(m -> ListeningDTO.ListItem.builder()
                        .id(m.getId())
                        .title(m.getTitle())
                        .type(m.getType().name())
                        .level(m.getLevel())
                        .year(m.getYear())
                        .month(m.getMonth())
                        .setNumber(m.getSetNumber())
                        .build())
                .collect(Collectors.toList());
    }
}
