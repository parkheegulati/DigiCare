import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaCheck, FaTimes, FaTrash, FaFileDownload } from 'react-icons/fa';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    age: "",
    maritalStatus: "",
    gender: "",
    bloodGroup: "",
    address: "",
    profileImage: null,
    medicalHistory: "",
    currentMedications: "",
    familyHistory: "",
    documents: []
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newDocuments, setNewDocuments] = useState([]);

  useEffect(() => {
    fetchPatientProfile();
  }, [id]);

  const fetchPatientProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/profile/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patient profile');
      }

      const data = await response.json();
      setPatient(data);
      
      // Initialize form data with patient details
      setFormData({
        name: data.fullName || "",
        phone: data.phoneNumber || "",
        dob: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : "",
        age: data.age || "",
        maritalStatus: data.maritalStatus || "",
        gender: data.gender || "",
        bloodGroup: data.bloodGroup || "",
        address: data.address || "",
        medicalHistory: data.medicalHistory || "",
        currentMedications: data.currentMedications || "",
        familyHistory: data.familyMedicalHistory || "",
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching patient profile:', err);
      setError('Failed to load patient profile. Please try again later.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profileImage' && files?.length) {
      setNewProfileImage(files[0]);
    } else if (name === 'documents' && files?.length) {
      setNewDocuments(Array.from(files));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset form data to current patient data when entering edit mode
      setFormData({
        name: patient.fullName || "",
        phone: patient.phoneNumber || "",
        dob: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split('T')[0] : "",
        age: patient.age || "",
        maritalStatus: patient.maritalStatus || "",
        gender: patient.gender || "",
        bloodGroup: patient.bloodGroup || "",
        address: patient.address || "",
        medicalHistory: patient.medicalHistory || "",
        currentMedications: patient.currentMedications || "",
        familyHistory: patient.familyMedicalHistory || ""
      });
      setNewProfileImage(null);
      setNewDocuments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append new files if they exist
      if (newProfileImage) {
        formDataToSend.append('profileImage', newProfileImage);
      }
      
      if (newDocuments.length > 0) {
        newDocuments.forEach(doc => {
          formDataToSend.append('documents', doc);
        });
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/update/${id}`, {
        method: 'PUT',
        body: formDataToSend,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update patient profile');
      }

      const data = await response.json();
      console.log('Profile updated:', data);
      
      // Refresh patient data and exit edit mode
      fetchPatientProfile();
      setIsEditing(false);
      
      // Show success notification
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteDocument = async (documentUrl) => {
    if (!window.confirm('Are you sure you want to remove this document?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/remove-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: id,
          documentUrl
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to remove document');
      }

      // Refresh patient data
      fetchPatientProfile();
      alert('Document removed successfully');
    } catch (err) {
      console.error('Error removing document:', err);
      alert('Failed to remove document. Please try again.');
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      alert('Profile deleted successfully');
      navigate('/'); // Redirect to home or login page
    } catch (err) {
      console.error('Error deleting profile:', err);
      alert('Failed to delete profile. Please try again.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading patient profile...</div>;
  if (error) return <div className="text-red-500 text-center p-5">{error}</div>;
  if (!patient) return <div className="text-center p-5">Patient not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-left text-[#37352f] dark:text-[#e3e3e3] font-sans mt-14 mb-10 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-[#37352f] dark:text-[#e3e3e3]">Patient Profile</h2>
        {!isEditing ? (
          <button
            onClick={handleEditToggle}
            className="flex items-center gap-1.5 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors"
          >
            <FaPencilAlt /> Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              <FaCheck /> Save
            </button>
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-1.5 bg-white dark:bg-[#191919] hover:bg-[#efefed] dark:hover:bg-[#252525] text-[#787774] dark:text-[#9b9b9b] border border-[#e9e9e7] dark:border-[#2f2f2f] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-3 rounded-md overflow-hidden border border-[#e9e9e7] dark:border-[#2f2f2f]">
            <img 
              src={patient.profilePhoto || '/default-avatar.png'} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {isEditing && (
            <div className="mt-3">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Update Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
                className="w-full p-2 border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs rounded-md"
              />
            </div>
          )}
        </div>

        {/* Patient Details Section */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Email</label>
              <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.email}</p>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">
                  {new Date(patient.dateOfBirth).toLocaleDateString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min={0}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.age}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Marital Status</label>
              {isEditing ? (
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.maritalStatus}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Blood Group</label>
              {isEditing ? (
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.bloodGroup}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.address}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Medical History</label>
              {isEditing ? (
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                ></textarea>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3] whitespace-pre-wrap">
                  {patient.medicalHistory}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Current Medications</label>
              {isEditing ? (
                <textarea
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                ></textarea>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3] whitespace-pre-wrap">
                  {patient.currentMedications || "None specified"}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Family Medical History</label>
              {isEditing ? (
                <textarea
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
                ></textarea>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3] whitespace-pre-wrap">
                  {patient.familyMedicalHistory}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Upload Additional Documents (PDFs)</label>
                <input
                  type="file"
                  name="documents"
                  onChange={handleChange}
                  multiple
                  accept="application/pdf"
                  className="w-full p-2 border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs rounded-md"
                />
              </div>
            )}
          </form>

          {/* Documents Section */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-[#37352f] dark:text-[#e3e3e3] mb-3">Patient Documents</h3>
            
            {patient.documents && patient.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {patient.documents.map((doc, index) => (
                  <div key={index} className="flex justify-between items-center p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-[#f7f6f3] dark:bg-[#252525]">
                        <FaFileDownload className="text-[#2383e2]" />
                      </div>
                      <a 
                        href={doc} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#2383e2] hover:underline truncate max-w-xs"
                      >
                        Document {index + 1}
                      </a>
                    </div>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(doc)}
                        className="text-[#c43838] hover:opacity-80"
                        title="Delete document"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#787774] italic">No documents uploaded</p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 border-t border-[#e9e9e7] dark:border-[#2f2f2f] pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleDeleteProfile}
            className="flex items-center gap-1.5 bg-[#eb5757] hover:bg-[#c43838] text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors"
          >
            <FaTrash /> Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;