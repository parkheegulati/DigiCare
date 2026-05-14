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
    icon: <UserPlus size={40} className="text-indigo-400" />,
    title: 'Create Account',
    desc: 'Register with name, email & password',
  },
  {
    icon: <LogIn size={40} className="text-indigo-400" />,
    title: 'Login',
    desc: 'Access your account securely',
  },
  {
    icon: <GitBranch size={40} className="text-indigo-400" />,
    title: 'Choose Path',
    desc: 'Select doctor or patient',
  },
];

const stepsPatient = [
  {
    icon: <FileText size={40} className="text-blue-400" />,
    title: 'Complete Profile',
    desc: 'Add DOB, gender & medical history',
  },
  {
    icon: <Activity size={40} className="text-blue-400" />,
    title: 'Submit Reports',
    desc: 'Upload medical records securely',
  },
  {
    icon: <BarChart2 size={40} className="text-blue-400" />,
    title: 'View Analysis',
    desc: 'Review individual reports',
  },
];

const stepsDoctor = [
  {
    icon: <Award size={40} className="text-teal-400" />,
    title: 'Verify Credentials',
    desc: 'Add qualifications & specialization',
  },
  {
    icon: <Users size={40} className="text-teal-400" />,
    title: 'Add Patients',
    desc: 'Monitor patients under your care',
  },
  {
    icon: <Search size={40} className="text-teal-400" />,
    title: 'Comprehensive View',
    desc: 'Access medical history for better decisions',
  },
];

const FlowSection = ({ title, color, steps }) => {
  const borderColor = {
    indigo: 'border-indigo-500',
    blue: 'border-blue-500',
    teal: 'border-teal-500',
  };
  
  const textColor = {
    indigo: 'text-indigo-400',
    blue: 'text-blue-400',
    teal: 'text-teal-400',
  };
  
  const arrowColor = {
    indigo: 'text-indigo-400',
    blue: 'text-blue-400',
    teal: 'text-teal-400',
  };
  
  return (
    <div className="mb-20">
      <h3 className={`text-2xl font-semibold ${textColor[color]} text-center mb-12`}>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center col-span-1 md:col-span-1">
              <div
                className={`w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center shadow-lg border-2 ${borderColor[color]}`}
              >
                {step.icon}
              </div>
              <p className="text-white font-semibold mt-4">{step.title}</p>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
            
            {/* Add arrow if not the last item */}
            {idx < steps.length - 1 && (
              <div className={`hidden md:flex justify-center ${arrowColor[color]}`}>
                <ArrowRight size={32} />
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
    <section id="user-flow" className="py-24 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          How DigiCare Works
        </h2>
        {/* Common Section */}
        <FlowSection title="Getting Started" color="indigo" steps={stepsCommon} />
        {/* Patient Journey */}
        <FlowSection title="For Patients" color="blue" steps={stepsPatient} />
        {/* Doctor Journey */}
        <FlowSection title="For Doctors" color="teal" steps={stepsDoctor} />
        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/register">
            <button className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserGuidedFlow;