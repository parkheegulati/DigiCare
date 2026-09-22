import React from 'react';
import { useNavigate } from 'react-router-dom';
import docnew from './images/docnew.jpeg';

const Description = () => {
  const navigate = useNavigate();

  const handleGuideClick = () => {
    navigate('/user-guided-flow');
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center font-sans"
      id="description"
      style={{ backgroundImage: `url(${docnew})` }}
    >
      {/* Semi-Transparent Gradient Overlay */}
      <div className="absolute inset-0 bg-[#191919]/70 backdrop-blur-xs"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-white">
          From Symptoms to Solutions— <br className="hidden sm:block" />
          <span className="text-[#9fe0fa]">DigiCare Got You Covered!</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl mx-auto font-normal mb-6 text-gray-200 leading-relaxed">
          An AI-powered diagnostic assistant designed to help healthcare professionals make 
          faster, more accurate diagnoses. Analyze medical images, patient data, and symptoms 
          with unparalleled efficiency.
        </p>

        {/* Guide Me Button */}
        <button
          onClick={handleGuideClick}
          className="bg-[#ffffff] hover:bg-[#efefed] text-[#37352f] font-medium text-xs py-2.5 px-6 rounded-md border border-[#e9e9e7] shadow-sm transition-colors"
        >
          Guide Me
        </button>
      </div>
    </section>
  );
};

export default Description;
