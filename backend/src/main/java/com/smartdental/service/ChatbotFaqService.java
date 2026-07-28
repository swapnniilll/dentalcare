package com.smartdental.service;

import com.smartdental.dto.ChatbotFaqRequest;
import com.smartdental.dto.ChatbotFaqResponse;
import com.smartdental.entity.ChatbotFaq;
import com.smartdental.repository.ChatbotFaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatbotFaqService {

    @Autowired
    private ChatbotFaqRepository repository;

    public List<ChatbotFaqResponse> getAllFaqs() {
        return repository.findAllByOrderByIdAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ChatbotFaqResponse createFaq(ChatbotFaqRequest request) {
        ChatbotFaq faq = new ChatbotFaq();
        faq.setKeywords(request.getKeywords());
        faq.setAnswer(request.getAnswer());
        return toResponse(repository.save(faq));
    }

    public ChatbotFaqResponse updateFaq(Long id, ChatbotFaqRequest request) {
        ChatbotFaq faq = findOrThrow(id);
        faq.setKeywords(request.getKeywords());
        faq.setAnswer(request.getAnswer());
        return toResponse(repository.save(faq));
    }

    public void deleteFaq(Long id) {
        ChatbotFaq faq = findOrThrow(id);
        repository.delete(faq);
    }

    private ChatbotFaq findOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));
    }

    private ChatbotFaqResponse toResponse(ChatbotFaq faq) {
        return new ChatbotFaqResponse(faq.getId(), faq.getKeywords(), faq.getAnswer());
    }
}