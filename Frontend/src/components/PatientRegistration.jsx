import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: e.target.multiple ? Array.from(files) : files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file) => formDataToSend.append(key, file));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/register`, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to register patient');

      const data = await response.json();
      console.log('Patient registered:', data);
      navigate('/patient-dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-left text-[#37352f] dark:text-[#e3e3e3] font-sans mt-14 mb-10 transition-colors">
      <h2 className="text-2xl font-extrabold text-center text-[#37352f] dark:text-[#e3e3e3] mb-6">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            placeholder="+1 (555) 000-0000"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ''}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            min={0}
            required
            placeholder="25"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ''}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Gender</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || ''}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          >
            <option value="">Select Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            required
            placeholder="123 Street, City, Country"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Upload Profile Image</label>
          <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border border-dashed border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md bg-white dark:bg-[#191919] hover:bg-[#f7f6f3] dark:hover:bg-[#252525] transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-8 w-8 text-[#787774]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-xs text-[#787774] dark:text-[#9b9b9b]">
                <label className="relative cursor-pointer bg-transparent rounded font-medium text-[#2383e2] hover:underline focus-within:outline-none">
                  <span>Upload a file</span>
                  <input type="file" name="profileImage" onChange={handleChange} accept="image/*" required className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-[11px] text-[#787774]">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory || ''}
            onChange={handleChange}
            rows="3"
            required
            placeholder="List any past illnesses, surgeries, or chronic conditions..."
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Current Medications</label>
          <textarea
            name="currentMedications"
            value={formData.currentMedications || ''}
            onChange={handleChange}
            rows="2"
            required
            placeholder="List any medications you are currently taking..."
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Family Medical History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory || ''}
            onChange={handleChange}
            rows="3"
            required
            placeholder="E.g., Father has diabetes, grandmother had hypertension..."
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Upload Reports (PDFs)</label>
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            multiple
            accept="application/pdf"
            required
            className="w-full p-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] font-medium text-xs py-2.5 px-8 rounded-md transition-colors"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;