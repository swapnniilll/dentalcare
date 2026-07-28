package com.smartdental.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.smartdental.entity.EmailOtp;

public interface OtpRepository extends JpaRepository<EmailOtp, Long> {

    @Transactional
    @Modifying
    void deleteByEmail(String email);

    @Transactional
    @Modifying
    void deleteByCreatedAtBefore(LocalDateTime time);

    Optional<EmailOtp> findByEmailAndOtp(String email, String otp);

}