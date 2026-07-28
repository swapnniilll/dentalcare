package com.smartdental.controller;

import com.smartdental.dto.ChatbotFaqRequest;
import com.smartdental.dto.ChatbotFaqResponse;
import com.smartdental.service.ChatbotFaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot-faqs")
@CrossOrigin(origins = "*") // tighten to your frontend origin in production
public class ChatbotFaqController {

    @Autowired
    private ChatbotFaqService chatbotFaqService;

    @GetMapping
    public List<ChatbotFaqResponse> getAllFaqs() {
        return chatbotFaqService.getAllFaqs();
    }

    @PostMapping
    public ChatbotFaqResponse createFaq(@RequestBody ChatbotFaqRequest request) {
        return chatbotFaqService.createFaq(request);
    }

    @PutMapping("/{id}")
    public ChatbotFaqResponse updateFaq(@PathVariable Long id, @RequestBody ChatbotFaqRequest request) {
        return chatbotFaqService.updateFaq(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteFaq(@PathVariable Long id) {
        chatbotFaqService.deleteFaq(id);
    }
}