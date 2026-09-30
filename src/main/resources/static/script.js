const API = "";


/* =========================
   SECTION NAVIGATION
========================= */

function showSection(sectionId) {

    document.querySelectorAll(".section")
        .forEach(section => {
            section.classList.add("hidden");
        });

    document.getElementById(sectionId)
        .classList.remove("hidden");

    if (sectionId === "patients") {
        loadPatients();
    }

    if (sectionId === "doctors") {
        loadDoctors();
    }

    if (sectionId === "appointments") {
        loadAppointments();
        loadPatientOptions();
        loadDoctorOptions();
    }

    updateDashboard();
}


/* =========================
   PATIENT
========================= */

const patientForm =
    document.getElementById("patientForm");

patientForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id =
        document.getElementById("patientId").value;

    const patient = {

        name:
            document.getElementById("patientName").value,

        age:
            Number(document.getElementById("patientAge").value),

        gender:
            document.getElementById("patientGender").value,

        phone:
            document.getElementById("patientPhone").value,

        address:
            document.getElementById("patientAddress").value
    };

    try {

        let response;

        if (id) {

            response = await fetch(
                `${API}/patients/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(patient)
                }
            );

        } else {

            response = await fetch(
                `${API}/patients`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(patient)
                }
            );
        }

        if (!response.ok) {
            throw new Error("Unable to save patient");
        }

        alert("Patient saved successfully");

        clearPatientForm();

        loadPatients();

        updateDashboard();

    } catch (error) {

        alert(error.message);

    }

});


async function loadPatients() {

    const response =
        await fetch(`${API}/patients`);

    const patients =
        await response.json();

    const table =
        document.getElementById("patientTable");

    table.innerHTML = "";

    patients.forEach(patient => {

        table.innerHTML += `

            <tr>

                <td>${patient.id}</td>

                <td>${patient.name}</td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${patient.phone}</td>

                <td>${patient.address}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editPatient(${patient.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deletePatient(${patient.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });
}


async function editPatient(id) {

    const response =
        await fetch(`${API}/patients/${id}`);

    const patient =
        await response.json();

    document.getElementById("patientId").value =
        patient.id;

    document.getElementById("patientName").value =
        patient.name;

    document.getElementById("patientAge").value =
        patient.age;

    document.getElementById("patientGender").value =
        patient.gender;

    document.getElementById("patientPhone").value =
        patient.phone;

    document.getElementById("patientAddress").value =
        patient.address;

    showSection("patients");
}


async function deletePatient(id) {

    if (!confirm("Delete this patient?")) {
        return;
    }

    await fetch(
        `${API}/patients/${id}`,
        {
            method: "DELETE"
        }
    );

    loadPatients();

    updateDashboard();
}


function clearPatientForm() {

    document.getElementById("patientForm").reset();

    document.getElementById("patientId").value = "";
}


/* =========================
   DOCTOR
========================= */

const doctorForm =
    document.getElementById("doctorForm");

doctorForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id =
        document.getElementById("doctorId").value;

    const doctor = {

        name:
            document.getElementById("doctorName").value,

        specialization:
            document.getElementById("doctorSpecialization").value,

        phone:
            document.getElementById("doctorPhone").value
    };

    try {

        let response;

        if (id) {

            response = await fetch(
                `${API}/doctors/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(doctor)
                }
            );

        } else {

            response = await fetch(
                `${API}/doctors`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(doctor)
                }
            );
        }

        if (!response.ok) {
            throw new Error("Unable to save doctor");
        }

        alert("Doctor saved successfully");

        clearDoctorForm();

        loadDoctors();

        updateDashboard();

    } catch (error) {

        alert(error.message);

    }

});


async function loadDoctors() {

    const response =
        await fetch(`${API}/doctors`);

    const doctors =
        await response.json();

    const table =
        document.getElementById("doctorTable");

    table.innerHTML = "";

    doctors.forEach(doctor => {

        table.innerHTML += `

            <tr>

                <td>${doctor.id}</td>

                <td>${doctor.name}</td>

                <td>${doctor.specialization}</td>

                <td>${doctor.phone}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editDoctor(${doctor.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteDoctor(${doctor.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });
}


async function editDoctor(id) {

    const response =
        await fetch(`${API}/doctors/${id}`);

    const doctor =
        await response.json();

    document.getElementById("doctorId").value =
        doctor.id;

    document.getElementById("doctorName").value =
        doctor.name;

    document.getElementById("doctorSpecialization").value =
        doctor.specialization;

    document.getElementById("doctorPhone").value =
        doctor.phone;

    showSection("doctors");
}


async function deleteDoctor(id) {

    if (!confirm("Delete this doctor?")) {
        return;
    }

    await fetch(
        `${API}/doctors/${id}`,
        {
            method: "DELETE"
        }
    );

    loadDoctors();

    updateDashboard();
}


function clearDoctorForm() {

    document.getElementById("doctorForm").reset();

    document.getElementById("doctorId").value = "";
}


/* =========================
   APPOINTMENT
========================= */

const appointmentForm =
    document.getElementById("appointmentForm");


appointmentForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const id =
            document.getElementById(
                "appointmentId"
            ).value;

        const patientSelect =
            document.getElementById(
                "appointmentPatient"
            );

        const doctorSelect =
            document.getElementById(
                "appointmentDoctor"
            );


        const patientId =
            Number(patientSelect.value);

        const doctorId =
            Number(doctorSelect.value);


        const patientName =
            patientSelect.options[
                patientSelect.selectedIndex
            ].text;


        const doctorName =
            doctorSelect.options[
                doctorSelect.selectedIndex
            ].text;


        const appointment = {

            patientId: patientId,

            doctorId: doctorId,

            patientName: patientName,

            doctorName: doctorName,

            appointmentDate:
                document.getElementById(
                    "appointmentDate"
                ).value,

            status:
                document.getElementById(
                    "appointmentStatus"
                ).value
        };


        try {

            let response;

            if (id) {

                response = await fetch(
                    `${API}/appointments/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify(appointment)
                    }
                );

            } else {

                response = await fetch(
                    `${API}/appointments`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify(appointment)
                    }
                );
            }


            if (!response.ok) {

                const message =
                    await response.text();

                throw new Error(message);
            }


            alert(
                id
                    ? "Appointment updated successfully"
                    : "Appointment booked successfully"
            );


            clearAppointmentForm();

            loadAppointments();

            updateDashboard();

        } catch (error) {

            alert(error.message);

        }

    }
);


/* =========================
   LOAD PATIENT OPTIONS
========================= */

async function loadPatientOptions() {

    const response =
        await fetch(`${API}/patients`);

    const patients =
        await response.json();

    const select =
        document.getElementById(
            "appointmentPatient"
        );

    select.innerHTML =
        `<option value="">Select Patient</option>`;


    patients.forEach(patient => {

        select.innerHTML += `

            <option value="${patient.id}">
                ${patient.name}
            </option>

        `;

    });
}


/* =========================
   LOAD DOCTOR OPTIONS
========================= */

async function loadDoctorOptions() {

    const response =
        await fetch(`${API}/doctors`);

    const doctors =
        await response.json();

    const select =
        document.getElementById(
            "appointmentDoctor"
        );

    select.innerHTML =
        `<option value="">Select Doctor</option>`;


    doctors.forEach(doctor => {

        select.innerHTML += `

            <option value="${doctor.id}">
                ${doctor.name}
            </option>

        `;

    });
}


/* =========================
   LOAD APPOINTMENTS
========================= */

async function loadAppointments() {

    const response =
        await fetch(`${API}/appointments`);

    const appointments =
        await response.json();

    const table =
        document.getElementById(
            "appointmentTable"
        );

    table.innerHTML = "";


    appointments.forEach(appointment => {

        table.innerHTML += `

            <tr>

                <td>${appointment.id}</td>

                <td>${appointment.patientName}</td>

                <td>${appointment.doctorName}</td>

                <td>${appointment.appointmentDate}</td>

                <td>${appointment.status}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editAppointment(
                            ${appointment.id}
                        )">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteAppointment(
                            ${appointment.id}
                        )">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });
}


/* =========================
   EDIT APPOINTMENT
========================= */

async function editAppointment(id) {

    const response =
        await fetch(
            `${API}/appointments/${id}`
        );

    const appointment =
        await response.json();


    document.getElementById(
        "appointmentId"
    ).value = appointment.id;


    await loadPatientOptions();

    await loadDoctorOptions();


    document.getElementById(
        "appointmentPatient"
    ).value =
        appointment.patientId;


    document.getElementById(
        "appointmentDoctor"
    ).value =
        appointment.doctorId;


    document.getElementById(
        "appointmentDate"
    ).value =
        appointment.appointmentDate;


    document.getElementById(
        "appointmentStatus"
    ).value =
        appointment.status;


    showSection("appointments");
}


/* =========================
   DELETE APPOINTMENT
========================= */

async function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) {
        return;
    }


    await fetch(
        `${API}/appointments/${id}`,
        {
            method: "DELETE"
        }
    );


    loadAppointments();

    updateDashboard();
}


/* =========================
   CLEAR APPOINTMENT FORM
========================= */

function clearAppointmentForm() {

    document.getElementById(
        "appointmentForm"
    ).reset();

    document.getElementById(
        "appointmentId"
    ).value = "";
}


/* =========================
   DASHBOARD
========================= */

async function updateDashboard() {

    try {

        const patientResponse =
            await fetch(`${API}/patients`);

        const patients =
            await patientResponse.json();


        const doctorResponse =
            await fetch(`${API}/doctors`);

        const doctors =
            await doctorResponse.json();


        const appointmentResponse =
            await fetch(`${API}/appointments`);

        const appointments =
            await appointmentResponse.json();


        document.getElementById(
            "patientCount"
        ).textContent =
            patients.length;


        document.getElementById(
            "doctorCount"
        ).textContent =
            doctors.length;


        document.getElementById(
            "appointmentCount"
        ).textContent =
            appointments.length;

    } catch (error) {

        console.log(error);

    }
}


/* =========================
   INITIAL LOAD
========================= */

window.addEventListener(
    "DOMContentLoaded",
    function () {

        showSection("dashboard");

        updateDashboard();

    }
);