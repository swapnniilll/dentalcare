package com.smartdental.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdental.entity.Patient;
import com.smartdental.service.PatientService;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    @Autowired
    private PatientService service;

    // =====================================
    // Register New Patient
    // =====================================

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Patient patient) {

        Map<String, Object> response = new HashMap<>();

        try {

            Patient saved = service.registerPatient(patient);

            response.put("success", true);
            response.put("message", "Patient Registered Successfully");
            response.put("patient", saved);

        } catch (Exception e) {

            response.put("success", false);
            response.put("message", e.getMessage());

        }

        return response;
    }

    // =====================================
    // Verify Existing Patient
    // =====================================

    @PostMapping("/check")
    public Map<String, Object> checkPatient(@RequestBody Patient patient) {

        Map<String, Object> response = new HashMap<>();

        try {

            Patient existingPatient = service.verifyPatient(
                    patient.getFirstName(),
                    patient.getLastName(),
                    patient.getDob());

            if (existingPatient != null) {

                response.put("success", true);
                response.put("message", "Patient Found");
                response.put("patient", existingPatient);

            } else {

                response.put("success", false);
                response.put("message", "Patient not found");

            }

        } catch (Exception e) {

            response.put("success", false);
            response.put("message", e.getMessage());

        }

        return response;
    }

    // =====================================
    // Fetch All Patients
    // =====================================

    @GetMapping("/all")
    public List<Patient> getAllPatients() {

        return service.getAllPatients();

    }

    // =====================================
    // Fetch Patient By ID
    // =====================================

    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable Long id) {

        return service.getPatientById(id);

    }

    // =====================================
    // Update Patient
    // =====================================

    @PutMapping("/update/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody Patient patient) {

        return service.updatePatient(id, patient);

    }

    // =====================================
    // Delete Patient
    // =====================================

    @DeleteMapping("/delete/{id}")
    public Map<String, String> deletePatient(@PathVariable Long id) {

        service.deletePatient(id);

        Map<String, String> response = new HashMap<>();

        response.put("message", "Patient Deleted Successfully");

        return response;
    }

}