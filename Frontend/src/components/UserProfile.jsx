import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { User, Camera } from 'lucide-react';
import axios from "axios";
import { toast } from "react-hot-toast";

const UserProfile = ({ isLoggedIn, user, onLogout }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzedReports, setAnalyzedReports] = useState({});
  const [analyzingIndex, setAnalyzingIndex] = useState(null);
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [scanningPatientId, setScanningPatientId] = useState(null);

  // Add missing function to format response text
  const formatResponseText = (text) => {
    if (!text) return [];
    return text.split('\n').filter(paragraph => paragraph.trim() !== '');
  };

  const handleSmartScan = async (patient) => {
    try {
      setScanningPatientId(patient.id);
      // Prepare the request data
      const requestData = {
        fullName: patient.name,
        age: patient.age,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        dateOfBirth: patient.dateOfBirth,
        medicalHistory: patient.medicalHistory,
        currentMedications: patient.currentMedications,
        familyMedicalHistory: patient.familyMedicalHistory,
        documents: patient.documents,
        summary: [""],
      };
  
      // Send the request with responseType set to blob to handle binary data
      const response = await axios({
        method: 'post',
        url: 'https://digicare-hackmol6-0.onrender.com/smartscan',
        data: requestData,
        responseType: 'blob', // Important for handling PDF binary data
      });
  
      // Create a blob URL from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `SmartScan_${patient.name}.pdf`); // Set the file name for download
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
  
    } catch (error) {
      console.error("Error during Smart Scan:", error);
      // Display error to user
      alert("Failed to generate the report. Please try again.");
    } finally {
      setScanningPatientId(null);
    }
  };

  const handleAnalyzeReport = async (index, docUrl) => {
    setAnalyzingIndex(index);
    try {
      const res = await fetch('https://digicare-analyze.onrender.com/analyze-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf_url: docUrl }),
      });
      
      if (!res.ok) {
        throw new Error('Analysis service responded with an error');
      }
      
      const data = await res.json();
      setAnalyzedReports((prev) => ({ ...prev, [index]: data }));
    } catch (err) {
      console.error('Report analysis error:', err);
      setAnalyzedReports((prev) => ({ 
        ...prev, 
        [index]: { error: 'Analysis failed. Please try again later.' } 
      }));
    } finally {
      setAnalyzingIndex(null);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/users/getProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch profile data.");
          return res.json();
        })
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const fetchDoctorPatients = async () => {
      if (!profileData?.typeId?.id) return;

      setIsLoadingPatients(true);
      try {
        console.log('Fetching patients for doctor ID:', profileData.typeId.id);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/doctors/${profileData.typeId.id}/patients`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        console.log('Fetched patients data:', data);
        
        if (data.patients && Array.isArray(data.patients)) {
          setDoctorPatients(data.patients);
        } else {
          console.error('Invalid patients data format:', data);
          setDoctorPatients([]);
        }
      } catch (error) {
        console.error('Error fetching doctor patients:', error);
        setDoctorPatients([]);
      } finally {
        setIsLoadingPatients(false);
      }
    };

    fetchDoctorPatients();
  }, [profileData]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isLoggedIn || !profileData.id) {
      toast.error("Please complete your registration first to upload a photo.");
      return;
    }

    const formData = new FormData();
    const isDoctor = profileData.userType === "doctor";
    
    // The backend update routes expect 'profileImage' for patients and 'profilePhoto' for doctors
    if (isDoctor) {
      formData.append("profilePhoto", file);
    } else {
      formData.append("profileImage", file);
    }

    const uploadToast = toast.loading("Uploading photo...");

    try {
      const endpoint = isDoctor 
        ? `${import.meta.env.VITE_API_URL}/api/doctors/${profileData.typeId.id || profileData.id}`
        : `${import.meta.env.VITE_API_URL}/api/patients/update/${profileData.typeId.id || profileData.id}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Upload failed");

      toast.success("Profile photo updated!", { id: uploadToast });
      // Refresh profile data
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo", { id: uploadToast });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-700">
        Loading profile...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  if (!profileData)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-700">
        No profile data available.
      </div>
    );

  const isDoctor = profileData.userType === "doctor";
  const isPatient = profileData.userType === "patient";
  const details = profileData.typeId || {};

  const toast = (message) => {
    // Simple implementation - in a real app, you'd use a proper toast library
    const toastElement = document.createElement("div");
    toastElement.className = "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out";
    toastElement.textContent = message;
    document.body.appendChild(toastElement);
    
    setTimeout(() => {
      toastElement.classList.add("opacity-0");
      setTimeout(() => document.body.removeChild(toastElement), 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-10 mt-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="shadow-2xl rounded-xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative group">
              <img
                src={details.profilePhoto || "/placeholder.png"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />
              <label className="absolute bottom-1 right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {details.fullName || profileData.fullname}
                  </h1>
                  <p className="text-gray-600 dark:text-slate-400 mt-1">{profileData.email}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    profileData.userType ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {profileData.userType ? profileData.userType.toUpperCase() : 'PROFILE INCOMPLETE'}
                  </span>
                </div>
                <div className="flex gap-3">
                  {isPatient && (
                    <Link
                      to={`/patient/profile/${details.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                    >
                      Edit Profile
                    </Link>
                  )}
                  {isDoctor && (
                    <Link
                      to={`/doctor/profile/${details.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                    >
                      Edit Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-300 hover:text-red-600 px-5 py-2.5 rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!profileData.userType && (
            <div className="mt-10 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border border-blue-100 dark:border-slate-700 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-600/20">
                <User className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Complete Your Profile</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                You haven't selected your role yet. To add a profile photo, medical history, and other details, please choose how you'll use DigiCare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/patient-registration" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                  I'm a Patient
                </Link>
                <Link to="/doctor-registration" className="px-8 py-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold rounded-xl border border-blue-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all">
                  I'm a Doctor
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">User Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              {isPatient && (
                <>
                  <p>
                    <strong>Phone:</strong> {details.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {details.dateOfBirth
                      ? new Date(details.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Age:</strong> {details.age || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {details.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {details.bloodGroup || "N/A"}
                  </p>
                </>
              )}
              {isDoctor && (
                <>
                  <p>
                    <strong>Phone:</strong> {details.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {details.yearsOfExperience || "N/A"} years
                  </p>
                  <p>
                    <strong>Specializations:</strong>{" "}
                    {details.specializations?.join(", ") || "N/A"}
                  </p>
                </>
              )}
            </div>
          </div>

          {isPatient && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">
                Uploaded Medical Reports
              </h2>
              {details.documents?.length > 0 ? (
                <div className="space-y-4">
                  {details.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 p-4 border rounded-md shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FaFilePdf className="text-red-500 w-6 h-6" />
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-blue-700 hover:underline"
                          >
                            Report {idx + 1}
                          </a>
                        </div>
                        <button
                          onClick={() => handleAnalyzeReport(idx, doc)}
                          disabled={analyzingIndex === idx}
                          className={`${
                            analyzingIndex === idx ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                          } text-white px-4 py-1.5 rounded-md shadow`}
                        >
                          {analyzingIndex === idx ? 'Analyzing...' : 'Analyze Report'}
                        </button>
                      </div>
                      {analyzedReports[idx] && (
                        <div className="mt-4 border rounded-lg overflow-hidden shadow-sm">
                          <div className="bg-blue-50 border-b px-4 py-2 flex justify-between items-center">
                            <h3 className="text-blue-800 font-medium">Report Analysis</h3>
                            <button 
                              onClick={() => setAnalyzedReports(prev => {
                                const newState = {...prev};
                                delete newState[idx];
                                return newState;
                              })}
                              className="text-gray-500 hover:text-red-500"
                            >
                              ×
                            </button>
                          </div>
                          <div className="p-4 bg-white">
                            {analyzedReports[idx].error ? (
                              <p className="text-red-500">{analyzedReports[idx].error}</p>
                            ) : (
                              <div className="text-gray-700">
                                {formatResponseText(analyzedReports[idx]?.analysis?.split('**Response:**')[1]?.split('**Reasoning:**')[0]?.trim()).map((paragraph, i) => (
                                  <p key={i} className="mb-3">{paragraph}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No medical reports uploaded.</p>
              )}
            </div>
          )}

          {isDoctor && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  Patients Under Your Care
                </h2>
                <button
                  onClick={() => {
                    console.log('Doctor ID:', profileData.typeId.id);
                    navigate("/add-patient", { state: { doctorId: profileData.typeId.id } });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
                >
                  + Add Patient
                </button>
              </div>

              <div className="overflow-x-auto">
                {isLoadingPatients ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : doctorPatients.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                    <svg className="w-14 h-14 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <p className="text-gray-500 font-medium">No patients added yet</p>
                    <p className="text-sm mt-2 text-gray-400">Click the Add Patient button to add patients to your list</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctorPatients.map((patient) => (
                      <div key={patient.id} className="border rounded-xl shadow-md hover:shadow-lg transition bg-white p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={patient.profilePhoto || "/placeholder.png"}
                            alt={patient.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold">{patient.name}</h3>
                            <p className="text-sm text-gray-600">
                              Email: {patient.email}
                            </p>
                            <p className="text-sm text-gray-600">Age: {patient.age}</p>
                            <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
                            {patient.bloodGroup && (
                              <p className="text-sm text-gray-600">Blood Group: {patient.bloodGroup}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaFilePdf className="text-red-500 w-5 h-5" />
                              {patient.documents && patient.documents.length > 0 ? (
                                <a
                                  href={patient.documents[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-700 hover:underline text-sm"
                                >
                                  View Report
                                </a>
                              ) : (
                                <span className="text-gray-500 text-sm">No reports</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleSmartScan(patient)}
                              disabled={scanningPatientId === patient.id}
                              className={`${
                                scanningPatientId === patient.id 
                                  ? 'bg-gray-400 cursor-not-allowed' 
                                  : 'bg-green-600 hover:bg-green-700'
                              } text-white px-3 py-1 rounded-md text-sm shadow flex items-center gap-2`}
                            >
                              {scanningPatientId === patient.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Generating...
                                </>
                              ) : (
                                'Smart Scan'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
