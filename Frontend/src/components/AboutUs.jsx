import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs2 from './images/docnew.jpeg';

const AboutUsSection = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white dark:bg-[#191919] font-sans border-t border-b border-[#e9e9e7] dark:border-[#2f2f2f] transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-[#37352f] dark:text-[#e3e3e3] mb-8">About Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img src={AboutUs2} alt="About Us" className="rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] w-full object-cover" />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] text-[#37352f] dark:text-[#e3e3e3] p-6 rounded-md text-left">
            <h3 className="text-xl font-bold text-[#37352f] dark:text-[#e3e3e3]">
              Revolutionizing Healthcare, One Patient at a Time
            </h3>
            <p className="mt-4 text-xs text-[#787774] dark:text-[#9b9b9b] leading-relaxed">
              At <span className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">DigiCare</span>, we're not just imagining the future of healthcare — we're building it.
              Fueled by innovation and a deep commitment to patient-first solutions, we’re transforming
              the way care is delivered. Our intelligent platform bridges the gap between technology and compassion,
              offering seamless, personalized healthcare experiences. With <span className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">DigiCare</span>,
              it’s not just about treatment — it’s about empowering healthier lives.
            </p>
            <Link to="/about-us-details">
              <button className="mt-6 px-4 py-2 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] font-medium text-xs rounded-md transition-colors">
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
