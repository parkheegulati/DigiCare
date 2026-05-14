import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs2 from './images/docnew.jpeg';

const AboutUsSection = () => {
  return (
    <section id="about" className="py-20 px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">About Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img src={AboutUs2} alt="About Us" className="rounded-2xl shadow-lg w-full" />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 bg-gray-800 text-white p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-500">
              Revolutionizing Healthcare, One Patient at a Time
            </h3>
            <p className="mt-6 text-gray-300 leading-relaxed">
              At <span className="font-bold text-white">DigiCare</span>, we're not just imagining the future of healthcare — we're building it.
              Fueled by innovation and a deep commitment to patient-first solutions, we’re transforming
              the way care is delivered. Our intelligent platform bridges the gap between technology and compassion,
              offering seamless, personalized healthcare experiences. With <span className="font-bold text-white">DigiCare</span>,
              it’s not just about treatment — it’s about empowering healthier lives.
            </p>
            <Link to="/about-us-details">
              <button className="mt-8 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">
                Know More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
