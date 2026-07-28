package com.smartdental.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartdental.dto.DashboardChartResponse;
import com.smartdental.dto.DashboardResponse;
import com.smartdental.entity.Appointment;
import com.smartdental.repository.AppointmentRepository;
import com.smartdental.repository.BlockedSlotRepository;
import com.smartdental.repository.ContactRepository;
import com.smartdental.repository.PatientRepository;

@Service
public class DashboardService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private BlockedSlotRepository blockedSlotRepository;

    public DashboardResponse getDashboardCounts() {
        DashboardResponse response = new DashboardResponse();
        response.setAppointments(
                appointmentRepository.count());
        response.setContacts(
                contactRepository.count());
        response.setPatients(
                patientRepository.count());
        response.setSlots(
                blockedSlotRepository.count());
        response.setPastAppointments(
                appointmentRepository.countByDateLessThan(LocalDate.now()));
        return response;
    }

    public DashboardChartResponse getChartData() {
        Map<String, Long> statusBreakdown = new LinkedHashMap<>();
        statusBreakdown.put("Booked", appointmentRepository.countByStatus("Booked"));
        statusBreakdown.put("Completed", appointmentRepository.countByStatus("Completed"));
        statusBreakdown.put("Cancelled", appointmentRepository.countByStatus("Cancelled"));
        statusBreakdown.put("Pending", appointmentRepository.countByStatus("Pending"));

        Map<String, Long> roomUsage = new LinkedHashMap<>();
        roomUsage.put("Room 1", appointmentRepository.countByRoom("Room 1"));
        roomUsage.put("Room 2", appointmentRepository.countByRoom("Room 2"));
        roomUsage.put("Emergency", appointmentRepository.countByRoom("Emergency"));

        List<DashboardChartResponse.DayCount> weeklyTrend = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            long count = appointmentRepository.countByDate(date);
            weeklyTrend.add(new DashboardChartResponse.DayCount(date.toString(), count));
        }

        // Peak booking hours — group all appointments by time slot
        Map<String, Long> peakHours = appointmentRepository.findAll()
                .stream()
                .filter(a -> a.getTime() != null)
                .collect(Collectors.groupingBy(Appointment::getTime, LinkedHashMap::new, Collectors.counting()));

        // New patients registered this calendar month
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();
        long newPatientsThisMonth = patientRepository.countByCreatedAtBetween(startOfMonth, now);

        return new DashboardChartResponse(statusBreakdown, roomUsage, weeklyTrend, peakHours, newPatientsThisMonth);
    }

    // Today's appointments list
    public List<Appointment> getTodaysAppointments() {
        return appointmentRepository.findByDate(LocalDate.now());
    }
}