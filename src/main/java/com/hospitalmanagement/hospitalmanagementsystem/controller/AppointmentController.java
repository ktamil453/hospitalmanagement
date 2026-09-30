package com.hospitalmanagement.hospitalmanagementsystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospitalmanagement.hospitalmanagementsystem.model.Appointment;
import com.hospitalmanagement.hospitalmanagementsystem.service.AppointmentService;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> addAppointment(
            @RequestBody Appointment appointment) {

        try {
            return ResponseEntity.ok(
                    service.addAppointment(appointment)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return service.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(
            @PathVariable Long id) {

        Appointment appointment =
                service.getAppointmentById(id);

        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        try {

            Appointment updated =
                    service.updateAppointment(id, appointment);

            if (updated == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updated);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(
            @PathVariable Long id) {

        if (!service.deleteAppointment(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Appointment deleted successfully"
        );
    }
}