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
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mt-10 mb-10 transition-colors">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8 font-manrope">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            placeholder="+1 (555) 000-0000"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            min={0}
            required
            placeholder="25"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Gender</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
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
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            required
            placeholder="123 Street, City, Country"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Upload Profile Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-slate-600 dark:text-slate-400">
                <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input type="file" name="profileImage" onChange={handleChange} accept="image/*" required className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory || ''}
            onChange={handleChange}
            rows="4"
            required
            placeholder="List any past illnesses, surgeries, or chronic conditions..."
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Current Medications</label>
          <textarea
            name="currentMedications"
            value={formData.currentMedications || ''}
            onChange={handleChange}
            rows="3"
            required
            placeholder="List any medications you are currently taking..."
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Family Medical History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory || ''}
            onChange={handleChange}
            rows="4"
            required
            placeholder="E.g., Father has diabetes, grandmother had hypertension..."
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Upload Reports (PDFs)</label>
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            multiple
            accept="application/pdf"
            required
            className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all text-sm"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-12 rounded-2xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-[0.98]"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;