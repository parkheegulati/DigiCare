const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const User = require('../models/user'); // We'll need a new User model
const jwtSecret = process.env.JWT_SECRET || '12134543dwhb@ihhcdwe';

exports.register = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
        } = req.body;
        // Validate essential fields
        if (!fullname || !email || !password) {
            return res.status(400).json({
                error: 'Required fields (fullname, email, password) are missing'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long'
            });
        }
        console.log('hello')
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with only essential data
        const userData = {
            fullname,
            email,
            password: hashedPassword,
            userType: null, // Initially null
            profileCompleted: false
        };

        const newUser = new User(userData);
        await newUser.save();

        const maxAge = 3 * 60 * 60; // 3 hours in seconds
        const token = jwt.sign(
            {
                id: newUser._id,
                email: email
            },
            jwtSecret,
            {
                expiresIn: maxAge,
            }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: true,
            sameSite: "none",
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                userType: null,
                profileCompleted: false
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Registration failed',
            details: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid password'
            });
        }

        const maxAge = 3 * 60 * 60; // 3 hours in seconds
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            jwtSecret,
            {
                expiresIn: maxAge,
            }
        );
        console.log(token)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                userType: user.userType,
                profileCompleted: user.profileCompleted
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Login failed',
            details: error.message
        });
    }
};

// New endpoint to set user type
exports.setUserType = async (req, res) => {
    try {
        const { userType } = req.body;
        const userId = req.auth.id;

        if (!userType || !['doctor', 'patient'].includes(userType)) {
            return res.status(400).json({
                error: 'Invalid or missing user type'
            });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        if (user.userType) {
            return res.status(400).json({
                error: 'User type already set'
            });
        }

        // Create specific user type model
        const specificUserData = {
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            profileCompleted: false
        };

        let specificUser;
        if (userType === 'doctor') {
            specificUser = new Doctor(specificUserData);
        } else {
            specificUser = new Patient(specificUserData);
        }
        await specificUser.save();

        // Update main user with userType and reference
        user.userType = userType;
        user.typeId = specificUser._id;
        await user.save();

        // Update token with new user type
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                userType: userType,
                typeId: specificUser._id
            },
            jwtSecret,
            {
                expiresIn: maxAge,
            }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: true,
            sameSite: "none",
        });

        res.json({
            message: 'User type set successfully',
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                userType: user.userType,
                profileCompleted: false
            }
        });
    } catch (error) {
        console.error('Set user type error:', error);
        res.status(500).json({
            error: 'Failed to set user type',
            details: error.message
        });
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    
    res.status(200).json({
        message: 'Logged out successfully'
    });
};