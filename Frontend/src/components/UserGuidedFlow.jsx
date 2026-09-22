import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  LogIn,
  GitBranch,
  FileText,
  BarChart2,
  Award,
  Users,
  Search,
  Activity,
  ArrowRight
} from 'lucide-react';

const stepsCommon = [
  {
    icon: <UserPlus size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Create Account',
    desc: 'Register with name, email & password',
  },
  {
    icon: <LogIn size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Login',
    desc: 'Access your account securely',
  },
  {
    icon: <GitBranch size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Choose Path',
    desc: 'Select doctor or patient',
  },
];

const stepsPatient = [
  {
    icon: <FileText size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Complete Profile',
    desc: 'Add DOB, gender & medical history',
  },
  {
    icon: <Activity size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Submit Reports',
    desc: 'Upload medical records securely',
  },
  {
    icon: <BarChart2 size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'View Analysis',
    desc: 'Review individual reports',
  },
];

const stepsDoctor = [
  {
    icon: <Award size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Verify Credentials',
    desc: 'Add qualifications & specialization',
  },
  {
    icon: <Users size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Add Patients',
    desc: 'Monitor patients under your care',
  },
  {
    icon: <Search size={28} className="text-[#37352f] dark:text-[#e3e3e3]" />,
    title: 'Comprehensive View',
    desc: 'Access medical history for better decisions',
  },
];

const FlowSection = ({ title, steps }) => {
  return (
    <div className="mb-14">
      <h3 className="text-xl font-bold text-center mb-8 text-[#37352f] dark:text-[#e3e3e3]">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center col-span-1">
              <div className="w-20 h-20 rounded-md bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] flex items-center justify-center">
                {step.icon}
              </div>
              <p className="text-xs font-bold mt-3 text-[#37352f] dark:text-[#e3e3e3]">{step.title}</p>
              <p className="text-[11px] text-[#787774] dark:text-[#9b9b9b] mt-0.5">{step.desc}</p>
            </div>
            
            {/* Add arrow if not the last item */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex justify-center text-[#787774]">
                <ArrowRight size={20} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const UserGuidedFlow = () => {
  return (
    <section id="user-flow" className="py-16 px-6 bg-white dark:bg-[#191919] font-sans text-[#37352f] dark:text-[#e3e3e3] transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-[#37352f] dark:text-[#e3e3e3] mb-12">
          How DigiCare Works
        </h2>
        {/* Common Section */}
        <FlowSection title="Getting Started" steps={stepsCommon} />
        {/* Patient Journey */}
        <FlowSection title="For Patients" steps={stepsPatient} />
        {/* Doctor Journey */}
        <FlowSection title="For Doctors" steps={stepsDoctor} />
        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/register">
            <button className="px-6 py-2.5 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] font-medium text-xs rounded-md transition-colors">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserGuidedFlow;