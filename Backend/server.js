const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose"); // Add mongoose import
const cookieParser = require('cookie-parser');require("dotenv").config();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")
const doctorRoutes = require('./routes/doctor')
const patientRoutes = require('./routes/patient')
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
// app.use(cors({
//     // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     origin:true,
//     credentials: true
// }));
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const allowed = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://digi-care-hack-mol6-0.vercel.app",
    "https://digicare-hackmol6-0-1.onrender.com",
    "https://digi-care.vercel.app",
    "https://digicare.vercel.app",
  ];
  return allowed.includes(origin) || origin.endsWith(".vercel.app");
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) callback(null, true);
      else callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type",
    credentials: true, // Set to true if you need to allow credentials (e.g., cookies)
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())

app.use('/users', userRoutes);
app.use('/auth',authRoutes)
app.use('/api/doctors',doctorRoutes);
app.use('/api/patients',patientRoutes);
// app.use('/api/doctor-patient', require('./routes/doctorPatient'));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
