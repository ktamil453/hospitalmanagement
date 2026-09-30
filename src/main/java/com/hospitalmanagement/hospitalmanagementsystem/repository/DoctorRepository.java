package com.hospitalmanagement.hospitalmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospitalmanagement.hospitalmanagementsystem.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}