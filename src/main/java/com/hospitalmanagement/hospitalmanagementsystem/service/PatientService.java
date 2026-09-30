package com.hospitalmanagement.hospitalmanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospitalmanagement.hospitalmanagementsystem.model.Patient;
import com.hospitalmanagement.hospitalmanagementsystem.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository repository;

    public PatientService(PatientRepository repository) {
        this.repository = repository;
    }

    public Patient addPatient(Patient patient) {
        return repository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return repository.findAll();
    }

    public Patient getPatientById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Patient updatePatient(Long id, Patient patient) {

        Patient existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(patient.getName());
        existing.setAge(patient.getAge());
        existing.setGender(patient.getGender());
        existing.setPhone(patient.getPhone());
        existing.setAddress(patient.getAddress());

        return repository.save(existing);
    }

    public boolean deletePatient(Long id) {

        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }
}