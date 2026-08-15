package com.smartdental.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartdental.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    boolean existsByEmail(String email);

    Optional<Patient> findByFirstNameAndLastNameAndDob(
            String firstName,
            String lastName,
            String dob
    );

    Optional<Patient> findByEmail(String email);

    // Dashboard — New Patients This Month
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
