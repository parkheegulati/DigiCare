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
    <div className="min-h-screen bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] font-sans pt-14 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-8 text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative group">
              <img
                src={details.profilePhoto || "/placeholder.png"}
                alt="Profile"
                className="w-32 h-32 rounded-md object-cover border border-[#e9e9e7] dark:border-[#2f2f2f]"
              />
              <label className="absolute bottom-1 right-1 w-7 h-7 bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] rounded flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#37352f] dark:text-[#e3e3e3]">
                    {details.fullName || profileData.fullname}
                  </h1>
                  <p className="text-[#787774] dark:text-[#9b9b9b] text-xs mt-0.5">{profileData.email}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium bg-[#e9e9e7] dark:bg-[#2f2f2f] text-[#37352f] dark:text-[#e3e3e3]">
                    {profileData.userType ? profileData.userType.toUpperCase() : 'PROFILE INCOMPLETE'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {isPatient && (
                    <Link
                      to={`/patient/profile/${details.id}`}
                      className="bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-4 py-1.5 rounded-md text-xs font-medium transition-colors"
                    >
                      Edit Profile
                    </Link>
                  )}
                  {isDoctor && (
                    <Link
                      to={`/doctor/profile/${details.id}`}
                      className="bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-4 py-1.5 rounded-md text-xs font-medium transition-colors"
                    >
                      Edit Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-white dark:bg-[#191919] hover:bg-[#eb5757]/10 text-[#787774] hover:text-[#c43838] dark:text-[#9b9b9b] border border-[#e9e9e7] dark:border-[#2f2f2f] px-4 py-1.5 rounded-md text-xs font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!profileData.userType && (
            <div className="mt-8 p-6 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-center">
              <div className="w-12 h-12 bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] rounded flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#37352f] dark:text-[#e3e3e3] mb-1">Complete Your Profile</h2>
              <p className="text-[#787774] dark:text-[#9b9b9b] text-xs mb-5 max-w-md mx-auto">
                You haven't selected your role yet. To add a profile photo, medical history, and other details, please choose how you'll use DigiCare.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/patient-registration" className="px-5 py-2 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] font-medium text-xs rounded-md transition-colors">
                  I'm a Patient
                </Link>
                <Link to="/doctor-registration" className="px-5 py-2 bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] font-medium text-xs rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] hover:bg-[#f7f6f3] dark:hover:bg-[#252525] transition-colors">
                  I'm a Doctor
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 text-[#37352f] dark:text-[#e3e3e3]">User Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#787774] dark:text-[#9b9b9b]">
              {isPatient && (
                <>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Phone:</strong> {details.phoneNumber || "N/A"}</p>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Date of Birth:</strong> {details.dateOfBirth ? new Date(details.dateOfBirth).toLocaleDateString() : "N/A"}</p>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Age:</strong> {details.age || "N/A"}</p>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Gender:</strong> {details.gender || "N/A"}</p>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Blood Group:</strong> {details.bloodGroup || "N/A"}</p>
                </>
              )}
              {isDoctor && (
                <>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Phone:</strong> {details.phoneNumber || "N/A"}</p>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Experience:</strong> {details.yearsOfExperience || "N/A"} years</p>
                  <p><strong className="text-[#37352f] dark:text-[#e3e3e3]">Specializations:</strong> {details.specializations?.join(", ") || "N/A"}</p>
                </>
              )}
            </div>
          </div>

          {isPatient && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3 text-[#37352f] dark:text-[#e3e3e3]">
                Uploaded Medical Reports
              </h2>
              {details.documents?.length > 0 ? (
                <div className="space-y-3">
                  {details.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 p-3 bg-white dark:bg-[#191919] border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaFilePdf className="text-[#c43838] w-5 h-5" />
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-[#2383e2] hover:underline"
                          >
                            Report {idx + 1}
                          </a>
                        </div>
                        <button
                          onClick={() => handleAnalyzeReport(idx, doc)}
                          disabled={analyzingIndex === idx}
                          className={`${
                            analyzingIndex === idx ? 'opacity-50' : ''
                          } bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] text-xs px-3 py-1 rounded-md transition-colors`}
                        >
                          {analyzingIndex === idx ? 'Analyzing...' : 'Analyze Report'}
                        </button>
                      </div>
                      {analyzedReports[idx] && (
                        <div className="mt-3 border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md overflow-hidden text-xs">
                          <div className="bg-[#f7f6f3] dark:bg-[#252525] border-b border-[#e9e9e7] dark:border-[#2f2f2f] px-3 py-1.5 flex justify-between items-center">
                            <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">Report Analysis</h3>
                            <button 
                              onClick={() => setAnalyzedReports(prev => {
                                const newState = {...prev};
                                delete newState[idx];
                                return newState;
                              })}
                              className="text-[#787774] hover:text-[#c43838]"
                            >
                              ×
                            </button>
                          </div>
                          <div className="p-3 bg-white dark:bg-[#191919]">
                            {analyzedReports[idx].error ? (
                              <p className="text-[#c43838]">{analyzedReports[idx].error}</p>
                            ) : (
                              <div className="text-[#37352f] dark:text-[#e3e3e3]">
                                {formatResponseText(analyzedReports[idx]?.analysis?.split('**Response:**')[1]?.split('**Reasoning:**')[0]?.trim()).map((paragraph, i) => (
                                  <p key={i} className="mb-2">{paragraph}</p>
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
                <p className="text-xs text-[#787774]">No medical reports uploaded.</p>
              )}
            </div>
          )}

          {isDoctor && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-[#37352f] dark:text-[#e3e3e3]">
                  Patients Under Your Care
                </h2>
                <button
                  onClick={() => {
                    navigate("/add-patient", { state: { doctorId: profileData.typeId.id } });
                  }}
                  className="bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                >
                  + Add Patient
                </button>
              </div>

              <div className="overflow-x-auto">
                {isLoadingPatients ? (
                  <div className="flex justify-center py-6">
                    <div className="w-6 h-6 border-2 border-[#37352f] dark:border-[#e3e3e3] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : doctorPatients.length === 0 ? (
                  <div className="text-center py-8 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f]">
                    <p className="text-xs font-medium text-[#787774]">No patients added yet</p>
                    <p className="text-[11px] mt-1 text-[#787774]">Click the Add Patient button to add patients to your list</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctorPatients.map((patient) => (
                      <div key={patient.id} className="border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md bg-white dark:bg-[#191919] p-4 text-left">
                        <div className="flex items-center gap-3">
                          <img
                            src={patient.profilePhoto || "/placeholder.png"}
                            alt={patient.name}
                            className="w-14 h-14 rounded-md object-cover border border-[#e9e9e7] dark:border-[#2f2f2f]"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <h3 className="font-bold text-[#37352f] dark:text-[#e3e3e3]">{patient.name}</h3>
                            <p className="text-[#787774] dark:text-[#9b9b9b] truncate">Email: {patient.email}</p>
                            <p className="text-[#787774] dark:text-[#9b9b9b]">Age: {patient.age} · Gender: {patient.gender}</p>
                            {patient.bloodGroup && (
                              <p className="text-[#787774] dark:text-[#9b9b9b]">Blood: {patient.bloodGroup}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-[#e9e9e7] dark:border-[#2f2f2f]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <FaFilePdf className="text-[#c43838] w-4 h-4" />
                              {patient.documents && patient.documents.length > 0 ? (
                                <a
                                  href={patient.documents[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2383e2] hover:underline text-xs"
                                >
                                  View Report
                                </a>
                              ) : (
                                <span className="text-[#787774] text-xs">No reports</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleSmartScan(patient)}
                              disabled={scanningPatientId === patient.id}
                              className="bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              {scanningPatientId === patient.id ? (
                                'Generating...'
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
