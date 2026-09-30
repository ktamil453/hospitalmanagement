package com.hospitalmanagement.hospitalmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospitalmanagement.hospitalmanagementsystem.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}