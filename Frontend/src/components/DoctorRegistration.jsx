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
    <div className="max-w-4xl mx-auto p-6 bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-left text-[#37352f] dark:text-[#e3e3e3] font-sans mt-14 mb-10 transition-colors">
      <h2 className="text-2xl font-extrabold text-center text-[#37352f] dark:text-[#e3e3e3] mb-6">Doctor Registration</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-[#fdebec] dark:bg-[#361e1f] border border-[#fbd6d8] dark:border-[#542829] text-[#c43838] dark:text-[#f87171] rounded-md text-xs flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            required
            placeholder="Dr. Jane Smith"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="jane.smith@hospital.com"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Phone Number</label>
          <input
            type="tel"
            name="phone"
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
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Clinic/Hospital Address</label>
          <input
            type="text"
            name="clinicAddress"
            onChange={handleChange}
            required
            placeholder="Medical Center, 456 Avenue, City"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            required
            placeholder="New York"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">State</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            required
            placeholder="NY"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Country</label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            required
            placeholder="USA"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Available Hours</label>
          <input
            type="text"
            name="availableHours"
            placeholder="e.g., 10AM - 5PM"
            onChange={handleChange}
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Medical Reg. Number</label>
          <input
            type="text"
            name="registrationNumber"
            onChange={handleChange}
            required
            placeholder="REG-123456"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Specialization</label>
          <input
            type="text"
            name="specialization"
            onChange={handleChange}
            required
            placeholder="e.g., Cardiologist"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Experience (years)</label>
          <input
            type="number"
            name="experience"
            onChange={handleChange}
            required
            placeholder="10"
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#787774] dark:text-[#9b9b9b]">Degrees</label>
          <input
            type="text"
            name="degrees"
            onChange={handleChange}
            placeholder="e.g., MBBS, MD"
            required
            className="w-full p-2.5 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-white dark:text-[#191919] font-medium text-xs py-2.5 px-8 rounded-md transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-[#191919]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
