const User = require('../models/user');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

exports.getUser = async (req, res) => {
    try {
        const email = req.body.email;

        // First find the user without population
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Then manually populate the typeId based on userType
        let populatedData = null;
        
        if (user.userType === 'doctor' && user.typeId) {
            populatedData = await Doctor.findById(user.typeId);
        } else if (user.userType === 'patient' && user.typeId) {
            populatedData = await Patient.findById(user.typeId);
        }

        // Create a response object with the populated data
        const responseUser = user.toObject();
        if (populatedData) {
            responseUser.typeId = populatedData;
        }

        console.log('User found:', responseUser);
        res.status(200).json(responseUser);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fixed getUserProfile controller to avoid MissingSchemaError

exports.getUserProfile = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Validate email is provided
      if (!email) {
        return res.status(400).json({
          error: 'Email is required'
        });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }
  
      // Prepare the response with user data
      const userData = {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        userType: user.userType,
        profileCompleted: user.profileCompleted
      };
  
      // If user has a type (doctor or patient), fetch the corresponding profile data without populate
      if (user.userType === 'doctor' && user.typeId) {
        // For doctor: don't populate to avoid schema errors
        const doctorProfile = await Doctor.findById(user.typeId);
        
        if (doctorProfile) {
          userData.typeId = {
            id: doctorProfile._id,
            fullName: doctorProfile.fullName,
            specializations: doctorProfile.specializations,
            email: doctorProfile.email,
            phoneNumber: doctorProfile.phoneNumber,
            profilePhoto: doctorProfile.profilePhoto,
            city: doctorProfile.city,
            state: doctorProfile.state,
            country: doctorProfile.country,
            yearsOfExperience: doctorProfile.yearsOfExperience,
            gender: doctorProfile.gender,
            dateOfBirth: doctorProfile.dateOfBirth,
            clinicAddress: doctorProfile.clinicAddress,
            availableHours: doctorProfile.availableHours,
            timezone: doctorProfile.timezone,
            registrationNumber: doctorProfile.registrationNumber,
            degrees: doctorProfile.degrees,
            // Instead of populated data, just include the IDs
            patients: doctorProfile.patients,
            summary: doctorProfile.summary
          };
        }
      } else if (user.userType === 'patient' && user.typeId) {
        // For patient: don't populate to avoid schema errors
        const patientProfile = await Patient.findById(user.typeId);
        
        if (patientProfile) {
          userData.typeId = {
            id: patientProfile._id,
            fullName: patientProfile.fullName,
            email: patientProfile.email,
            phoneNumber: patientProfile.phoneNumber,
            profilePhoto: patientProfile.profilePhoto,
            age: patientProfile.age,
            gender: patientProfile.gender,
            bloodGroup: patientProfile.bloodGroup,
            dateOfBirth: patientProfile.dateOfBirth,
            maritalStatus: patientProfile.maritalStatus,
            address: patientProfile.address,
            medicalHistory: patientProfile.medicalHistory,
            currentMedications: patientProfile.currentMedications,
            familyMedicalHistory: patientProfile.familyMedicalHistory,
            documents: patientProfile.documents,
            // Instead of populated data, just include the IDs
            doctors: patientProfile.doctors,
            reports: patientProfile.reports,
            summary: patientProfile.summary
          };
        }
      }
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({
        error: 'Failed to fetch user profile',
        details: error.message
      });
    }
  };