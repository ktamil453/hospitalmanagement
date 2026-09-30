package com.hospitalmanagement.hospitalmanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospitalmanagement.hospitalmanagementsystem.model.Doctor;
import com.hospitalmanagement.hospitalmanagementsystem.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository repository;

    public DoctorService(DoctorRepository repository) {
        this.repository = repository;
    }

    public Doctor addDoctor(Doctor doctor) {
        return repository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setPhone(doctor.getPhone());

        return repository.save(existing);
    }

    public boolean deleteDoctor(Long id) {

        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }
}