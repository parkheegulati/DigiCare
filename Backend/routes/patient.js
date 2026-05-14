const express = require('express');
const app = express();
const { registerPatient,getPatientProfile,updatePatientProfile,deletePatientProfile,removeDocument, getAllPatients, addPatientToDoctor } = require('../controllers/patient');
const multer = require("multer");
const { storage } = require('../utils/cloudinary');
const verifyToken = require('../middleware/auth')
const router = express.Router();

const uploads = multer({ storage });
router.post(
  '/register',
  verifyToken,
  uploads.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  registerPatient
);

// Get patient profile
router.get(
  '/profile/:id',
  verifyToken,
  getPatientProfile
);

// Update patient profile
router.put(
  '/update/:id',
  verifyToken,
  uploads.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  updatePatientProfile
);

// Delete patient profile
router.delete(
  '/delete/:id',
  verifyToken,
  deletePatientProfile
);

// Remove a document from patient profile
router.post(
  '/remove-document',
  verifyToken,
  removeDocument
);

// Get all patients with search
router.get('/all', verifyToken, getAllPatients);

// Add patient to doctor
router.post('/add-to-doctor', verifyToken, addPatientToDoctor);

module.exports = router;
