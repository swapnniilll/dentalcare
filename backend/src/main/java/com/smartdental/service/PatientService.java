package com.smartdental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartdental.entity.Patient;
import com.smartdental.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    // =====================================
    // Register Patient
    // =====================================
    public Patient registerPatient(Patient patient) {

        if (repository.existsByEmail(patient.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        return repository.save(patient);
    }

    // =====================================
    // Verify Existing Patient
    // =====================================
    public Patient verifyPatient(String firstName,
                                 String lastName,
                                 String dob) {

        Optional<Patient> patient = repository
                .findByFirstNameAndLastNameAndDob(
                        firstName,
                        lastName,
                        dob);

        return patient.orElse(null);
    }

    // =====================================
    // Get All Patients
    // =====================================
    public List<Patient> getAllPatients() {

        return repository.findAll();

    }

    // =====================================
    // Get Patient By Id
    // =====================================
    public Patient getPatientById(Long id) {

        return repository.findById(id).orElse(null);

    }

    // =====================================
    // Update Patient
    // =====================================
    public Patient updatePatient(Long id, Patient patient) {

        Patient oldPatient = repository.findById(id).orElse(null);

        if (oldPatient == null) {
            return null;
        }

        oldPatient.setFirstName(patient.getFirstName());
        oldPatient.setLastName(patient.getLastName());
        oldPatient.setDob(patient.getDob());
        oldPatient.setEmail(patient.getEmail());
        oldPatient.setPhone(patient.getPhone());

        return repository.save(oldPatient);
    }

    // =====================================
    // Delete Patient
    // =====================================
    public void deletePatient(Long id) {

        repository.deleteById(id);

    }

}