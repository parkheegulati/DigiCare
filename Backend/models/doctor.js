const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePhoto: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    clinicAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    availableHours: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    specializations: [{
        type: String,
        required: true
    }],
    yearsOfExperience: {
        type: Number,
        required: true
    },
    degrees: [{
        type: String,
        required: true
    }],
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    summary: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Summary'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);