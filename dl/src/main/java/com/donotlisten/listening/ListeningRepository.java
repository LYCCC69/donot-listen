package com.donotlisten.listening;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListeningRepository extends JpaRepository<ListeningMaterialEntity, String> {
    Page<ListeningMaterialEntity> findByYearAndLevel(Integer year, Integer level, Pageable pageable);
    Page<ListeningMaterialEntity> findByLevel(Integer level, Pageable pageable);
    Page<ListeningMaterialEntity> findByType(ListeningMaterialEntity.ListeningType type, Pageable pageable);
    List<ListeningMaterialEntity> findByYearAndMonthAndLevelAndSetNumber(
            Integer year, Integer month, Integer level, Integer setNumber);
}
