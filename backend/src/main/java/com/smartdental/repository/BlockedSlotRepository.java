package com.smartdental.repository;

import com.smartdental.entity.BlockedSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BlockedSlotRepository extends JpaRepository<BlockedSlot, Long> {

    List<BlockedSlot> findByDate(LocalDate date);

    Optional<BlockedSlot> findByDateAndRoomAndTime(LocalDate date, String room, String time);

    void deleteByDateAndRoomAndTime(LocalDate date, String room, String time);
}