package com.smartdental.service;

import com.smartdental.dto.MarqueeMessageRequest;
import com.smartdental.dto.MarqueeMessageResponse;
import com.smartdental.entity.MarqueeMessage;
import com.smartdental.repository.MarqueeMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarqueeMessageService {

    @Autowired
    private MarqueeMessageRepository repository;

    // Used by admin panel (shows all, active or not)
    public List<MarqueeMessageResponse> getAllMessages() {
        return repository.findAllByOrderByDisplayOrderAscIdAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Used by public website (only active ones)
    public List<MarqueeMessageResponse> getActiveMessages() {
        return repository.findByActiveTrueOrderByDisplayOrderAscIdAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public MarqueeMessageResponse createMessage(MarqueeMessageRequest request) {
        MarqueeMessage msg = new MarqueeMessage();
        applyRequest(msg, request);
        return toResponse(repository.save(msg));
    }

    public MarqueeMessageResponse updateMessage(Long id, MarqueeMessageRequest request) {
        MarqueeMessage msg = findOrThrow(id);
        applyRequest(msg, request);
        return toResponse(repository.save(msg));
    }

    public void deleteMessage(Long id) {
        MarqueeMessage msg = findOrThrow(id);
        repository.delete(msg);
    }

    private void applyRequest(MarqueeMessage msg, MarqueeMessageRequest request) {
        msg.setEmojiStart(request.getEmojiStart());
        msg.setMessage(request.getMessage());
        msg.setHighlightText(request.getHighlightText());
        msg.setEmojiEnd(request.getEmojiEnd());
        msg.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        msg.setActive(request.getActive() != null ? request.getActive() : true);
    }

    private MarqueeMessage findOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marquee message not found with id: " + id));
    }

    private MarqueeMessageResponse toResponse(MarqueeMessage msg) {
        return new MarqueeMessageResponse(
                msg.getId(),
                msg.getEmojiStart(),
                msg.getMessage(),
                msg.getHighlightText(),
                msg.getEmojiEnd(),
                msg.getDisplayOrder(),
                msg.getActive()
        );
    }
}