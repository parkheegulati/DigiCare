const express = require('express');
const router = express.Router();
const multer = require("multer");
const { storage } = require('../utils/cloudinary');
const verifyToken = require('../middleware/auth');
const { 
  registerDoctor, 
  getAllDoctors, 
  getDoctorById, 
  searchDoctors, 
  updateDoctor, 
  deleteDoctor,
  getDoctorPatients
} = require('../controllers/doctor');

// Configure multer for file uploads
const doctorPhotoUpload = multer({ storage });

// Middleware for handling file uploads
const handleFileUpload = (req, res, next) => {
  doctorPhotoUpload.single('profilePhoto')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: 'File upload error', details: err.message });
      } else {
        console.error('Other error:', err);
        return res.status(400).json({ error: 'Invalid file type', details: err.message });
      }
    }
    next();
  });
};

// Create - Register a new doctor
router.post('/register', verifyToken, handleFileUpload, registerDoctor);

// Read - Get all doctors
router.get('/', getAllDoctors);

// Read - Get doctor by ID
router.get('/:id', getDoctorById);

// Read - Search doctors by criteria
router.get('/search', searchDoctors);

// Read - Get doctor patients
router.get('/:id/patients', getDoctorPatients);

// Update - Update doctor profile
router.put('/:id', verifyToken, handleFileUpload, updateDoctor);

// Delete - Delete doctor profile
router.delete('/:id', verifyToken, deleteDoctor);

module.exports = router;