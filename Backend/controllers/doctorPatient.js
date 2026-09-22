// const Doctor = require('../models/doctor');
// const Patient = require('../models/patient');

// // Add patient to doctor's list
// exports.addPatientToDoctor = async (req, res) => {
//   try {
//     const { doctorId, patientId } = req.body;

//     // Validate required fields
//     if (!doctorId || !patientId) {
//       return res.status(400).json({
//         error: 'Both doctorId and patientId are required'
//       });
//     }

//     // Check if doctor exists
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         error: 'Doctor not found'
//       });
//     }

//     // Check if patient exists
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({
//         error: 'Patient not found'
//       });
//     }

//     // Check if patient is already in doctor's list
//     if (doctor.patients.includes(patientId)) {
//       return res.status(400).json({
//         error: 'Patient is already in doctor\'s list'
//       });
//     }

//     // Add patient to doctor's list
//     doctor.patients.push(patientId);
//     await doctor.save();

//     // Add doctor to patient's list if not already there
//     if (!patient.doctors.includes(doctorId)) {
//       patient.doctors.push(doctorId);
//       await patient.save();
//     }

//     res.status(200).json({
//       message: 'Patient added to doctor\'s list successfully',
//       doctor: {
//         id: doctor._id,
//         fullName: doctor.fullName,
//         patientCount: doctor.patients.length
//       },
//       patient: {
//         id: patient._id,
//         fullName: patient.fullName
//       }
//     });
//   } catch (error) {
//     console.error('Error adding patient to doctor:', error);
//     res.status(500).json({
//       error: 'Failed to add patient to doctor',
//       details: error.message
//     });
//   }
// };

// // Add doctor to patient's list
// exports.addDoctorToPatient = async (req, res) => {
//   try {
//     const { doctorId, patientId } = req.body;

//     // Validate required fields
//     if (!doctorId || !patientId) {
//       return res.status(400).json({
//         error: 'Both doctorId and patientId are required'
//       });
//     }

//     // Check if doctor exists
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         error: 'Doctor not found'
//       });
//     }

//     // Check if patient exists
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({
//         error: 'Patient not found'
//       });
//     }

//     // Check if doctor is already in patient's list
//     if (patient.doctors.includes(doctorId)) {
//       return res.status(400).json({
//         error: 'Doctor is already in patient\'s list'
//       });
//     }

//     // Add doctor to patient's list
//     patient.doctors.push(doctorId);
//     await patient.save();

//     // Add patient to doctor's list if not already there
//     if (!doctor.patients.includes(patientId)) {
//       doctor.patients.push(patientId);
//       await doctor.save();
//     }

//     res.status(200).json({
//       message: 'Doctor added to patient\'s list successfully',
//       patient: {
//         id: patient._id,
//         fullName: patient.fullName,
//         doctorCount: patient.doctors.length
//       },
//       doctor: {
//         id: doctor._id,
//         fullName: doctor.fullName
//       }
//     });
//   } catch (error) {
//     console.error('Error adding doctor to patient:', error);
//     res.status(500).json({
//       error: 'Failed to add doctor to patient',
//       details: error.message
//     });
//   }
// };

// // Remove patient from doctor's list
// exports.removePatientFromDoctor = async (req, res) => {
//   try {
//     const { doctorId, patientId } = req.params;

//     // Check if doctor exists
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         error: 'Doctor not found'
//       });
//     }

//     // Check if patient exists
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({
//         error: 'Patient not found'
//       });
//     }

//     // Check if patient is in doctor's list
//     if (!doctor.patients.includes(patientId)) {
//       return res.status(400).json({
//         error: 'Patient is not in doctor\'s list'
//       });
//     }

//     // Remove patient from doctor's list
//     doctor.patients = doctor.patients.filter(
//       id => id.toString() !== patientId
//     );
//     await doctor.save();

//     // Remove doctor from patient's list
//     patient.doctors = patient.doctors.filter(
//       id => id.toString() !== doctorId
//     );
//     await patient.save();

//     res.status(200).json({
//       message: 'Patient removed from doctor\'s list successfully'
//     });
//   } catch (error) {
//     console.error('Error removing patient from doctor:', error);
//     res.status(500).json({
//       error: 'Failed to remove patient from doctor',
//       details: error.message
//     });
//   }
// };

// // Get all patients for a specific doctor
// exports.getDoctorPatients = async (req, res) => {
//   try {
//     const { doctorId } = req.params;
    
//     // Check if doctor exists
//     const doctor = await Doctor.findById(doctorId).populate('patients');
//     if (!doctor) {
//       return res.status(404).json({
//         error: 'Doctor not found'
//       });
//     }

//     res.status(200).json({
//       doctorName: doctor.fullName,
//       patientCount: doctor.patients.length,
//       patients: doctor.patients.map(patient => ({
//         id: patient._id,
//         fullName: patient.fullName,
//         email: patient.email,
//         phoneNumber: patient.phoneNumber,
//         age: patient.age,
//         gender: patient.gender,
//         bloodGroup: patient.bloodGroup
//       }))
//     });
//   } catch (error) {
//     console.error('Error fetching doctor\'s patients:', error);
//     res.status(500).json({
//       error: 'Failed to fetch doctor\'s patients',
//       details: error.message
//     });
//   }
// };

// // Get all doctors for a specific patient
// exports.getPatientDoctors = async (req, res) => {
//   try {
//     const { patientId } = req.params;
    
//     // Check if patient exists
//     const patient = await Patient.findById(patientId).populate('doctors');
//     if (!patient) {
//       return res.status(404).json({
//         error: 'Patient not found'
//       });
//     }

//     res.status(200).json({
//       patientName: patient.fullName,
//       doctorCount: patient.doctors.length,
//       doctors: patient.doctors.map(doctor => ({
//         id: doctor._id,
//         fullName: doctor.fullName,
//         email: doctor.email,
//         phoneNumber: doctor.phoneNumber,
//         specializations: doctor.specializations,
//         yearsOfExperience: doctor.yearsOfExperience
//       }))
//     });
//   } catch (error) {
//     console.error('Error fetching patient\'s doctors:', error);
//     res.status(500).json({
//       error: 'Failed to fetch patient\'s doctors',
//       details: error.message
//     });
//   }
// };

// // Search patients by name for a specific doctor
// exports.searchPatientsByName = async (req, res) => {
//   try {
//     const { doctorId } = req.params;
//     const { name } = req.query;
    
//     if (!name) {
//       return res.status(400).json({
//         error: 'Name query parameter is required'
//       });
//     }

//     // Check if doctor exists
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         error: 'Doctor not found'
//       });
//     }

//     // Find doctor's patients with matching name
//     const doctor_with_patients = await Doctor.findById(doctorId)
//       .populate({
//         path: 'patients',
//         match: { fullName: { $regex: name, $options: 'i' } }
//       });

//     res.status(200).json({
//       doctorName: doctor.fullName,
//       searchQuery: name,
//       patientCount: doctor_with_patients.patients.length,
//       patients: doctor_with_patients.patients.map(patient => ({
//         id: patient._id,
//         fullName: patient.fullName,
//         email: patient.email,
//         phoneNumber: patient.phoneNumber,
//         age: patient.age,
//         gender: patient.gender,
//         bloodGroup: patient.bloodGroup
//       }))
//     });
//   } catch (error) {
//     console.error('Error searching patients by name:', error);
//     res.status(500).json({
//       error: 'Failed to search patients by name',
//       details: error.message
//     });const Doctor = require('../models/doctor');
//     const Patient = require('../models/patient');
    
//     // Add patient to doctor's list
//     exports.addPatientToDoctor = async (req, res) => {
//       try {
//         const { doctorId, patientId } = req.body;
    
//         // Validate required fields
//         if (!doctorId || !patientId) {
//           return res.status(400).json({
//             error: 'Both doctorId and patientId are required'
//           });
//         }
    
//         // Check if doctor exists
//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//           return res.status(404).json({
//             error: 'Doctor not found'
//           });
//         }
    
//         // Check if patient exists
//         const patient = await Patient.findById(patientId);
//         if (!patient) {
//           return res.status(404).json({
//             error: 'Patient not found'
//           });
//         }
    
//         // Check if patient is already in doctor's list
//         if (doctor.patients.includes(patientId)) {
//           return res.status(400).json({
//             error: 'Patient is already in doctor\'s list'
//           });
//         }
    
//         // Add patient to doctor's list
//         doctor.patients.push(patientId);
//         await doctor.save();
    
//         // Add doctor to patient's list if not already there
//         if (!patient.doctors.includes(doctorId)) {
//           patient.doctors.push(doctorId);
//           await patient.save();
//         }
    
//         res.status(200).json({
//           message: 'Patient added to doctor\'s list successfully',
//           doctor: {
//             id: doctor._id,
//             fullName: doctor.fullName,
//             patientCount: doctor.patients.length
//           },
//           patient: {
//             id: patient._id,
//             fullName: patient.fullName
//           }
//         });
//       } catch (error) {
//         console.error('Error adding patient to doctor:', error);
//         res.status(500).json({
//           error: 'Failed to add patient to doctor',
//           details: error.message
//         });
//       }
//     };
    
//     // Add doctor to patient's list
//     exports.addDoctorToPatient = async (req, res) => {
//       try {
//         const { doctorId, patientId } = req.body;
    
//         // Validate required fields
//         if (!doctorId || !patientId) {
//           return res.status(400).json({
//             error: 'Both doctorId and patientId are required'
//           });
//         }
    
//         // Check if doctor exists
//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//           return res.status(404).json({
//             error: 'Doctor not found'
//           });
//         }
    
//         // Check if patient exists
//         const patient = await Patient.findById(patientId);
//         if (!patient) {
//           return res.status(404).json({
//             error: 'Patient not found'
//           });
//         }
    
//         // Check if doctor is already in patient's list
//         if (patient.doctors.includes(doctorId)) {
//           return res.status(400).json({
//             error: 'Doctor is already in patient\'s list'
//           });
//         }
    
//         // Add doctor to patient's list
//         patient.doctors.push(doctorId);
//         await patient.save();
    
//         // Add patient to doctor's list if not already there
//         if (!doctor.patients.includes(patientId)) {
//           doctor.patients.push(patientId);
//           await doctor.save();
//         }
    
//         res.status(200).json({
//           message: 'Doctor added to patient\'s list successfully',
//           patient: {
//             id: patient._id,
//             fullName: patient.fullName,
//             doctorCount: patient.doctors.length
//           },
//           doctor: {
//             id: doctor._id,
//             fullName: doctor.fullName
//           }
//         });
//       } catch (error) {
//         console.error('Error adding doctor to patient:', error);
//         res.status(500).json({
//           error: 'Failed to add doctor to patient',
//           details: error.message
//         });
//       }
//     };
    
//     // Remove patient from doctor's list
//     exports.removePatientFromDoctor = async (req, res) => {
//       try {
//         const { doctorId, patientId } = req.params;
    
//         // Check if doctor exists
//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//           return res.status(404).json({
//             error: 'Doctor not found'
//           });
//         }
    
//         // Check if patient exists
//         const patient = await Patient.findById(patientId);
//         if (!patient) {
//           return res.status(404).json({
//             error: 'Patient not found'
//           });
//         }
    
//         // Check if patient is in doctor's list
//         if (!doctor.patients.includes(patientId)) {
//           return res.status(400).json({
//             error: 'Patient is not in doctor\'s list'
//           });
//         }
    
//         // Remove patient from doctor's list
//         doctor.patients = doctor.patients.filter(
//           id => id.toString() !== patientId
//         );
//         await doctor.save();
    
//         // Remove doctor from patient's list
//         patient.doctors = patient.doctors.filter(
//           id => id.toString() !== doctorId
//         );
//         await patient.save();
    
//         res.status(200).json({
//           message: 'Patient removed from doctor\'s list successfully'
//         });
//       } catch (error) {
//         console.error('Error removing patient from doctor:', error);
//         res.status(500).json({
//           error: 'Failed to remove patient from doctor',
//           details: error.message
//         });
//       }
//     };
    
//     // Get all patients for a specific doctor
//     exports.getDoctorPatients = async (req, res) => {
//       try {
//         const { doctorId } = req.params;
        
//         // Check if doctor exists
//         const doctor = await Doctor.findById(doctorId).populate('patients');
//         if (!doctor) {
//           return res.status(404).json({
//             error: 'Doctor not found'
//           });
//         }
    
//         res.status(200).json({
//           doctorName: doctor.fullName,
//           patientCount: doctor.patients.length,
//           patients: doctor.patients.map(patient => ({
//             id: patient._id,
//             fullName: patient.fullName,
//             email: patient.email,
//             phoneNumber: patient.phoneNumber,
//             age: patient.age,
//             gender: patient.gender,
//             bloodGroup: patient.bloodGroup
//           }))
//         });
//       } catch (error) {
//         console.error('Error fetching doctor\'s patients:', error);
//         res.status(500).json({
//           error: 'Failed to fetch doctor\'s patients',
//           details: error.message
//         });
//       }
//     };
    
//     // Get all doctors for a specific patient
//     exports.getPatientDoctors = async (req, res) => {
//       try {
//         const { patientId } = req.params;
        
//         // Check if patient exists
//         const patient = await Patient.findById(patientId).populate('doctors');
//         if (!patient) {
//           return res.status(404).json({
//             error: 'Patient not found'
//           });
//         }
    
//         res.status(200).json({
//           patientName: patient.fullName,
//           doctorCount: patient.doctors.length,
//           doctors: patient.doctors.map(doctor => ({
//             id: doctor._id,
//             fullName: doctor.fullName,
//             email: doctor.email,
//             phoneNumber: doctor.phoneNumber,
//             specializations: doctor.specializations,
//             yearsOfExperience: doctor.yearsOfExperience
//           }))
//         });
//       } catch (error) {
//         console.error('Error fetching patient\'s doctors:', error);
//         res.status(500).json({
//           error: 'Failed to fetch patient\'s doctors',
//           details: error.message
//         });
//       }
//     };
    
//     // Search patients by name for a specific doctor
//     exports.searchPatientsByName = async (req, res) => {
//       try {
//         const { doctorId } = req.params;
//         const { name } = req.query;
        
//         if (!name) {
//           return res.status(400).json({
//             error: 'Name query parameter is required'
//           });
//         }
    
//         // Check if doctor exists
//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//           return res.status(404).json({
//             error: 'Doctor not found'
//           });
//         }
    
//         // Find doctor's patients with matching name
//         const doctor_with_patients = await Doctor.findById(doctorId)
//           .populate({
//             path: 'patients',
//             match: { fullName: { $regex: name, $options: 'i' } }
//           });
    
//         res.status(200).json({
//           doctorName: doctor.fullName,
//           searchQuery: name,
//           patientCount: doctor_with_patients.patients.length,
//           patients: doctor_with_patients.patients.map(patient => ({
//             id: patient._id,
//             fullName: patient.fullName,
//             email: patient.email,
//             phoneNumber: patient.phoneNumber,
//             age: patient.age,
//             gender: patient.gender,
//             bloodGroup: patient.bloodGroup
//           }))
//         });
//       } catch (error) {
//         console.error('Error searching patients by name:', error);
//         res.status(500).json({
//           error: 'Failed to search patients by name',
//           details: error.message
//         });
//       }
//     };
//   }
// };