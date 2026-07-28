package com.smartdental.repository;

import com.smartdental.entity.MarqueeMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarqueeMessageRepository extends JpaRepository<MarqueeMessage, Long> {

    List<MarqueeMessage> findAllByOrderByDisplayOrderAscIdAsc();

    List<MarqueeMessage> findByActiveTrueOrderByDisplayOrderAscIdAsc();
}