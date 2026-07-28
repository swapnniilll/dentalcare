package com.smartdental.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartdental.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByDateAndTimeAndRoom(
            LocalDate date,
            String time,
            String room
    );

    // Dashboard Counts
    long countByDate(LocalDate date);
    long countByDateGreaterThan(LocalDate date);
    long countByDateLessThan(LocalDate date);
    long countByStatus(String status);
    long countByRoom(String room);

    // Today's Appointments
    List<Appointment> findByDate(LocalDate date);

    // Past Appointments
    List<Appointment> findByDateLessThanOrderByDateDesc(LocalDate date);
}