package com.smartdental.service;

import com.smartdental.dto.BlockedSlotRequest;
import com.smartdental.dto.BlockedSlotResponse;
import com.smartdental.entity.BlockedSlot;
import com.smartdental.repository.BlockedSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlockedSlotService {

    @Autowired
    private BlockedSlotRepository repository;

    public List<BlockedSlotResponse> getSlotsForDate(LocalDate date) {
        return repository.findByDate(date)
                .stream()
                .map(s -> new BlockedSlotResponse(s.getRoom(), s.getTime(), s.getStatus()))
                .collect(Collectors.toList());
    }

    // Admin manually marks a slot "Not Available"
    public void blockSlot(BlockedSlotRequest request) {
        upsertStatus(request.getDate(), request.getRoom(), request.getTime(), "blocked");
    }

    // Slot booked online by a patient
    public void markBooked(LocalDate date, String room, String time) {
        upsertStatus(date, room, time, "booked");
    }

    // Slot booked manually by admin over a phone call
    public void markBookedByCall(LocalDate date, String room, String time) {
        upsertStatus(date, room, time, "booked by call");
    }

    // Free up a slot (Available again)
    public void unblockSlot(BlockedSlotRequest request) {
        repository.deleteByDateAndRoomAndTime(request.getDate(), request.getRoom(), request.getTime());
    }

    private void upsertStatus(LocalDate date, String room, String time, String status) {
        BlockedSlot slot = repository
                .findByDateAndRoomAndTime(date, room, time)
                .orElseGet(BlockedSlot::new);

        slot.setDate(date);
        slot.setRoom(room);
        slot.setTime(time);
        slot.setStatus(status);

        repository.save(slot);
    }
}