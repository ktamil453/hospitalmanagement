package com.hospitalmanagement.hospitalmanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospitalmanagement.hospitalmanagementsystem.model.Appointment;
import com.hospitalmanagement.hospitalmanagementsystem.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(AppointmentRepository repository) {
        this.repository = repository;
    }

    public Appointment addAppointment(Appointment appointment) {

        boolean alreadyBooked =
                repository.existsByDoctorIdAndAppointmentDateAndStatus(
                        appointment.getDoctorId(),
                        appointment.getAppointmentDate(),
                        "BOOKED"
                );

        if (alreadyBooked) {
            throw new RuntimeException(
                    "Doctor is already booked on this date"
            );
        }

        appointment.setStatus("BOOKED");

        return repository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {

        Appointment existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        boolean alreadyBooked =
                repository.existsByDoctorIdAndAppointmentDateAndStatus(
                        appointment.getDoctorId(),
                        appointment.getAppointmentDate(),
                        "BOOKED"
                );

        if (alreadyBooked &&
                !existing.getDoctorId().equals(appointment.getDoctorId())) {

            throw new RuntimeException(
                    "Doctor is already booked on this date"
            );
        }

        existing.setPatientId(appointment.getPatientId());
        existing.setDoctorId(appointment.getDoctorId());
        existing.setPatientName(appointment.getPatientName());
        existing.setDoctorName(appointment.getDoctorName());
        existing.setAppointmentDate(appointment.getAppointmentDate());
        existing.setStatus(appointment.getStatus());

        return repository.save(existing);
    }

    public boolean deleteAppointment(Long id) {

        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);

        return true;
    }
}