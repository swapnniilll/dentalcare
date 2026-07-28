package com.smartdental.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdental.entity.Appointment;
import com.smartdental.service.AppointmentMailService;
import com.smartdental.service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentMailService mailService;

    // ===================================
    // Book Appointment (online, by patient)
    // ===================================
    @PostMapping("/book")
    public Map<String, Object> bookAppointment(@RequestBody Appointment appointment) {
        Map<String, Object> response = new HashMap<>();
        String result = appointmentService.bookAppointment(appointment);

        if (result.equals("Appointment Booked Successfully")) {
            // Send Confirmation Email
            mailService.sendAppointmentMail(appointment);
            response.put("success", true);
            response.put("message", result);
        } else {
            response.put("success", false);
            response.put("message", result);
        }
        return response;
    }

    // ===================================
    // Book Appointment Over Call (by admin)
    // ===================================
    @PostMapping("/book-by-call")
    public Map<String, Object> bookByCall(@RequestBody Appointment appointment) {
        Map<String, Object> response = new HashMap<>();
        String result = appointmentService.bookByCall(appointment);

        if (result.equals("Appointment Booked Successfully")) {
            // Send Confirmation Email
            mailService.sendAppointmentMail(appointment);
            response.put("success", true);
            response.put("message", result);
        } else {
            response.put("success", false);
            response.put("message", result);
        }
        return response;
    }

    // ===================================
    // Fetch All Appointments
    // ===================================
    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // ===================================
    // Fetch Past Appointments
    // ===================================
    @GetMapping("/past")
    public List<Appointment> getPastAppointments() {
        return appointmentService.getPastAppointments();
    }

    // ===================================
    // Fetch Appointment By Id
    // ===================================
    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    // ===================================
    // Update Appointment
    // ===================================
    @PutMapping("/update/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {
        return appointmentService.updateAppointment(id, appointment);
    }

    // ===================================
    // Delete Appointment
    // ===================================
    @DeleteMapping("/delete/{id}")
    public Map<String, String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Appointment Deleted Successfully");
        return response;
    }
}