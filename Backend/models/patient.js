const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    profilePhoto: {
        type: String, 
    },
    documents: [{
        type: String,
    }],
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: String,
        required: true
    },
    currentMedications: {
        type: String
    },
    familyMedicalHistory: {
        type: String,
        required: true
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reports'
    }],
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
    summary: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Summary'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);