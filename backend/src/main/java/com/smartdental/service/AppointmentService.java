package com.smartdental.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartdental.entity.Appointment;
import com.smartdental.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private BlockedSlotService blockedSlotService;

    // Book Appointment (online booking by patient)
    public String bookAppointment(Appointment appointment) {
        boolean exists = repository.existsByDateAndTimeAndRoom(
                appointment.getDate(),
                appointment.getTime(),
                appointment.getRoom());

        if (exists) {
            return "Time slot already booked";
        }

        if (appointment.getStatus() == null) {
            appointment.setStatus("Booked");
        }

        repository.save(appointment);

        blockedSlotService.markBooked(
                appointment.getDate(),
                appointment.getRoom(),
                appointment.getTime());

        return "Appointment Booked Successfully";
    }

    // Book Appointment manually by admin (Booked Over Call)
    public String bookByCall(Appointment appointment) {
        boolean exists = repository.existsByDateAndTimeAndRoom(
                appointment.getDate(),
                appointment.getTime(),
                appointment.getRoom());

        if (exists) {
            return "Time slot already booked";
        }

        appointment.setStatus("Booked");
        repository.save(appointment);

        blockedSlotService.markBookedByCall(
                appointment.getDate(),
                appointment.getRoom(),
                appointment.getTime());

        return "Appointment Booked Successfully";
    }

    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    public List<Appointment> getPastAppointments() {
        return repository.findByDateLessThanOrderByDateDesc(LocalDate.now());
    }

    public Appointment getAppointmentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment oldAppointment = repository.findById(id).orElse(null);
        if (oldAppointment == null) {
            return null;
        }
        oldAppointment.setFirstName(appointment.getFirstName());
        oldAppointment.setLastName(appointment.getLastName());
        oldAppointment.setDob(appointment.getDob());
        oldAppointment.setEmail(appointment.getEmail());
        oldAppointment.setPhone(appointment.getPhone());
        oldAppointment.setDate(appointment.getDate());
        oldAppointment.setTime(appointment.getTime());
        oldAppointment.setRoom(appointment.getRoom());
        oldAppointment.setStatus(appointment.getStatus());
        return repository.save(oldAppointment);
    }

    public void deleteAppointment(Long id) {
        repository.deleteById(id);
    }
}