package com.smartdental.controller;

import com.smartdental.dto.MarqueeMessageRequest;
import com.smartdental.dto.MarqueeMessageResponse;
import com.smartdental.service.MarqueeMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marquee")
@CrossOrigin(origins = "*") // tighten to your frontend origin in production
public class MarqueeMessageController {

    @Autowired
    private MarqueeMessageService marqueeMessageService;

    // Admin panel: all messages (active + inactive)
    @GetMapping("/all")
    public List<MarqueeMessageResponse> getAllMessages() {
        return marqueeMessageService.getAllMessages();
    }

    // Public website: only active messages
    @GetMapping("/active")
    public List<MarqueeMessageResponse> getActiveMessages() {
        return marqueeMessageService.getActiveMessages();
    }

    @PostMapping
    public MarqueeMessageResponse createMessage(@RequestBody MarqueeMessageRequest request) {
        return marqueeMessageService.createMessage(request);
    }

    @PutMapping("/{id}")
    public MarqueeMessageResponse updateMessage(@PathVariable Long id, @RequestBody MarqueeMessageRequest request) {
        return marqueeMessageService.updateMessage(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        marqueeMessageService.deleteMessage(id);
    }
}