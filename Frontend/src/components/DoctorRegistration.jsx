import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    profilePhoto: null,
    clinicAddress: "",
    city: "",
    state: "",
    country: "",
    availableHours: "",
    registrationNumber: "",
    specialization: "",
    experience: "",
    degrees: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    // Clear any previous errors when user makes changes
    setError(null);
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.registrationNumber) {
      setError("Please fill in all required fields");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
          console.log(`Adding to FormData - ${key}:`, formData[key]);
        }
      }

      // Log the actual FormData entries
      console.log('FormData entries:');
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/register`, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register doctor');
      }

      // Show success message
      alert('Registration successful! Redirecting to dashboard...');
      navigate('/doctor-dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'There was an error submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mt-10 mb-10 transition-colors">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8 font-manrope">Doctor Registration</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            required
            placeholder="Dr. Jane Smith"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="jane.smith@hospital.com"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
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
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Clinic/Hospital Address</label>
          <input
            type="text"
            name="clinicAddress"
            onChange={handleChange}
            required
            placeholder="Medical Center, 456 Avenue, City"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            required
            placeholder="New York"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">State</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            required
            placeholder="NY"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Country</label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            required
            placeholder="USA"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Available Hours</label>
          <input
            type="text"
            name="availableHours"
            placeholder="e.g., 10AM - 5PM"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Medical Reg. Number</label>
          <input
            type="text"
            name="registrationNumber"
            onChange={handleChange}
            required
            placeholder="REG-123456"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Specialization</label>
          <input
            type="text"
            name="specialization"
            onChange={handleChange}
            required
            placeholder="e.g., Cardiologist"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Experience (years)</label>
          <input
            type="number"
            name="experience"
            onChange={handleChange}
            required
            placeholder="10"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Degrees</label>
          <input
            type="text"
            name="degrees"
            onChange={handleChange}
            placeholder="e.g., MBBS, MD"
            required
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-bold py-3.5 px-12 rounded-2xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              'Complete Registration'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
