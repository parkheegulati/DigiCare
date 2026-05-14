import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';

// Pages & Components
import HomePage from "./components/HomePage";
import PatientProfile from './components/PatientProfile';
import DoctorProfile from './components/DoctorProfile';
import FileUpload from "./components/FileUpload.jsx";
import AiAssistant from "./components/AiAssistant";
import AboutUsSection from "./components/AboutUs";
import FAQ from "./components/Faq.jsx";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PatientRegistration from "./components/PatientRegistration.jsx";
import DoctorRegistration from "./components/DoctorRegistration.jsx";
import AddPatient from "./components/AddPatient.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UserProfile from "./components/UserProfile";
import UserGuidedFlow from "./components/UserGuidedFlow.jsx";
import Description from "./components/Description.jsx";

// New premium pages
import Appointments from "./components/Appointments.jsx";
import Reports from "./components/Reports.jsx";
import MedicineReminder from "./components/MedicineReminder.jsx";
import Emergency from "./components/Emergency.jsx";


function App() {  

  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState(null); // Store full user

const handleLogin = (status, email, user) => {
  setIsLoggedIn(status);
  setUserData(user);
};

const handleLogout = () => {
  // Clear token or session data if stored (optional)
  localStorage.removeItem("authToken"); // if you stored token
  localStorage.removeItem("user"); // if you stored user data

  // Reset state
  setIsLoggedIn(false);
  setUserData(null);
};


  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/description" element={<Description />} />
        <Route path="/user-guided-flow" element={<UserGuidedFlow />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/portal" element={<FileUpload />} />

        {/* New Premium Pages */}
        <Route path="/dashboard" element={<Dashboard user={userData} />} />
        <Route path="/ai-assistant" element={<AiAssistant />} />
        <Route path="/image-analysis" element={<AiAssistant />} />
        <Route path="/history" element={<AiAssistant />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/medicine" element={<MedicineReminder />} />
        <Route path="/emergency" element={<Emergency />} />

        {/* User profiles */}
        <Route path="/doctor-dashboard" element={<UserProfile isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />} />
        <Route path="/patient-dashboard" element={<UserProfile isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/doctor-registration" element={<DoctorRegistration />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/profile" element={<UserProfile isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout} />} />
        <Route path="/patient/profile/:id" element={<PatientProfile />} />
        <Route path="/doctor/profile/:id" element={<DoctorProfile />} />
      </Routes>
      
    </BrowserRouter>

  );
}

export default App;
