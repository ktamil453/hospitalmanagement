package com.hospitalmanagement.hospitalmanagementsystem.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospitalmanagement.hospitalmanagementsystem.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByDoctorIdAndAppointmentDateAndStatus(
            Long doctorId,
            LocalDate appointmentDate,
            String status
    );
}