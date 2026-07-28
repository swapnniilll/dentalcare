package com.smartdental.repository;

import com.smartdental.entity.ChatbotFaq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatbotFaqRepository extends JpaRepository<ChatbotFaq, Long> {
    List<ChatbotFaq> findAllByOrderByIdAsc();
}