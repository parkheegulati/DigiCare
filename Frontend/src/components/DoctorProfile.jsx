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
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mt-10 mb-10 transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">Doctor Profile</h2>
        {!isEditing ? (
          <button onClick={handleEditToggle} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <FaPencilAlt className="mr-2" /> Edit
          </button>
        ) : (
          <div className="flex space-x-3">
            <button onClick={handleSubmit} className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
              <FaCheck className="mr-2" /> Save
            </button>
            <button onClick={handleEditToggle} className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500">
            <img src={doctor.profilePhoto || '/default-avatar.png'} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {isEditing && (
            <div className="mt-4">
              <label className="block font-semibold mb-2">Update Photo</label>
              <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              {isEditing ? (
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.fullName}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <p className="p-3 bg-white border rounded-lg">{doctor.email}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              {isEditing ? (
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Date of Birth</label>
              {isEditing ? (
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Gender</label>
              {isEditing ? (
                <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 border rounded-lg">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.gender}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Clinic Address</label>
              {isEditing ? (
                <input type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.clinicAddress}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">City</label>
              {isEditing ? (
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.city}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">State</label>
              {isEditing ? (
                <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">{doctor.state}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Country</label>
              {isEditing ? (
                <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">{doctor.country}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Available Hours</label>
              {isEditing ? (
                <input type="text" name="availableHours" value={formData.availableHours} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.availableHours}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Registration #</label>
              {isEditing ? (
                <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.registrationNumber}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Specialization</label>
              {isEditing ? (
                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.specializations.join(', ')}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Experience (years)</label>
              {isEditing ? (
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.yearsOfExperience}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Degrees</label>
              {isEditing ? (
                <input type="text" name="degrees" value={formData.degrees} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
              ) : (
                <p className="p-3 bg-white border rounded-lg">{doctor.degrees.join(', ')}</p>
              )}
            </div>
          </form>
          {isEditing && (
            <div className="mt-8 border-t pt-6 flex justify-end">
              <button onClick={handleDeleteProfile} className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                <FaTrash className="mr-2" /> Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
