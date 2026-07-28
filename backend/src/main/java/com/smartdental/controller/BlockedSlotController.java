package com.smartdental.controller;

import com.smartdental.dto.BlockedSlotRequest;
import com.smartdental.dto.BlockedSlotResponse;
import com.smartdental.service.BlockedSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:5173")
public class BlockedSlotController {

    @Autowired
    private BlockedSlotService blockedSlotService;

    // Used by BOTH the public Appointment/Calendar pages and AdminTimeBlockPanel
    @GetMapping("/blocked")
    public List<BlockedSlotResponse> getBlockedSlots(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return blockedSlotService.getSlotsForDate(date);
    }

    // Admin: mark a slot "Not Available"
    @PostMapping("/block")
    public Map<String, Object> blockSlot(@RequestBody BlockedSlotRequest request) {
        blockedSlotService.blockSlot(request);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    // Admin: free up a slot (Available again)
    @PostMapping("/unblock")
    public Map<String, Object> unblockSlot(@RequestBody BlockedSlotRequest request) {
        blockedSlotService.unblockSlot(request);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }
}