// DoctorProfile.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    clinicAddress: '',
    city: '',
    state: '',
    country: '',
    availableHours: '',
    registrationNumber: '',
    specialization: '',
    experience: '',
    degrees: ''
  });
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  useEffect(() => {
    fetchDoctorProfile();
  }, [id]);

  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const { doctor: data } = await res.json();
      setDoctor(data);
      setFormData({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phoneNumber || '',
        dob: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
        gender: data.gender || '',
        clinicAddress: data.clinicAddress || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        availableHours: data.availableHours || '',
        registrationNumber: data.registrationNumber || '',
        specialization: data.specializations?.[0] || '',
        experience: data.yearsOfExperience?.toString() || '',
        degrees: data.degrees?.[0] || ''
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Could not load profile.');
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto' && files?.length) {
      setNewProfilePhoto(files[0]);
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      setNewProfilePhoto(null);
    } else {
      setIsEditing(true);
      setNewProfilePhoto(null);
      setFormData({
        fullName: doctor.fullName || '',
        email: doctor.email || '',
        phone: doctor.phoneNumber || '',
        dob: doctor.dateOfBirth ? new Date(doctor.dateOfBirth).toISOString().split('T')[0] : '',
        gender: doctor.gender || '',
        clinicAddress: doctor.clinicAddress || '',
        city: doctor.city || '',
        state: doctor.state || '',
        country: doctor.country || '',
        availableHours: doctor.availableHours || '',
        registrationNumber: doctor.registrationNumber || '',
        specialization: doctor.specializations?.[0] || '',
        experience: doctor.yearsOfExperience?.toString() || '',
        degrees: doctor.degrees?.[0] || ''
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v != null) payload.append(k, v);
      });
      if (newProfilePhoto) payload.append('profilePhoto', newProfilePhoto);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`, {
        method: 'PUT',
        body: payload,
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Update failed');
      await res.json();
      fetchDoctorProfile();
      setIsEditing(false);
      alert('Updated!');
    } catch (err) {
      console.error(err);
      alert('Update error');
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm('Delete profile?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error();
      alert('Deleted');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Delete error');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-5">{error}</div>;
  if (!doctor) return <div className="text-center p-5">Not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-left text-[#37352f] dark:text-[#e3e3e3] font-sans mt-14 mb-10 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-[#37352f] dark:text-[#e3e3e3]">Doctor Profile</h2>
        {!isEditing ? (
          <button onClick={handleEditToggle} className="flex items-center gap-1.5 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors">
            <FaPencilAlt /> Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button onClick={handleSubmit} className="flex items-center gap-1.5 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors">
              <FaCheck /> Save
            </button>
            <button onClick={handleEditToggle} className="flex items-center gap-1.5 bg-white dark:bg-[#191919] hover:bg-[#efefed] dark:hover:bg-[#252525] text-[#787774] dark:text-[#9b9b9b] border border-[#e9e9e7] dark:border-[#2f2f2f] px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors">
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-3 rounded-md overflow-hidden border border-[#e9e9e7] dark:border-[#2f2f2f]">
            <img src={doctor.profilePhoto || '/default-avatar.png'} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {isEditing && (
            <div className="mt-3">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Update Photo</label>
              <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} className="w-full p-2 border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs rounded-md" />
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Full Name</label>
              {isEditing ? (
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Email</label>
              <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.email}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Phone</label>
              {isEditing ? (
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Date of Birth</label>
              {isEditing ? (
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Gender</label>
              {isEditing ? (
                <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Clinic Address</label>
              {isEditing ? (
                <input type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.clinicAddress}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">City</label>
              {isEditing ? (
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.city}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">State</label>
              {isEditing ? (
                <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.state}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Country</label>
              {isEditing ? (
                <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.country}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Available Hours</label>
              {isEditing ? (
                <input type="text" name="availableHours" value={formData.availableHours} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.availableHours}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Registration #</label>
              {isEditing ? (
                <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.registrationNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Specialization</label>
              {isEditing ? (
                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.specializations.join(', ')}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Experience (years)</label>
              {isEditing ? (
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.yearsOfExperience}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Degrees</label>
              {isEditing ? (
                <input type="text" name="degrees" value={formData.degrees} onChange={handleChange} required className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
              ) : (
                <p className="p-2.5 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#37352f] dark:text-[#e3e3e3]">{doctor.degrees.join(', ')}</p>
              )}
            </div>
          </form>
          {isEditing && (
            <div className="mt-6 border-t border-[#e9e9e7] dark:border-[#2f2f2f] pt-4 flex justify-end">
              <button onClick={handleDeleteProfile} className="flex items-center gap-1.5 bg-[#eb5757] hover:bg-[#c43838] text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors">
                <FaTrash /> Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
