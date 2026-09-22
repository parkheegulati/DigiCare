// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const {
//   addPatientToDoctor,
//   addDoctorToPatient,
//   removePatientFromDoctor,
//   getDoctorPatients,
//   getPatientDoctors,
//   searchPatientsByName
// } = require('../controllers/doctorPatient');

// // Add patient to doctor's list and vice versa
// router.post('/add-patient-to-doctor', verifyToken, addPatientToDoctor);

// // Add doctor to patient's list and vice versa
// router.post('/add-doctor-to-patient', verifyToken, addDoctorToPatient);

// // Remove patient from doctor's list and vice versa
// router.delete('/doctor/:doctorId/patient/:patientId', verifyToken, removePatientFromDoctor);

// // Get all patients for a specific doctor
// router.get('/doctor/:doctorId/patients', verifyToken, getDoctorPatients);

// // Get all doctors for a specific patient
// router.get('/patient/:patientId/doctors', verifyToken, getPatientDoctors);

// // Search patients by name for a specific doctor
// router.get('/doctor/:doctorId/search-patients', verifyToken, searchPatientsByName);

// module.exports = router;