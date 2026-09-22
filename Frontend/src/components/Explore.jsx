
// import { useNavigate } from "react-router-dom";
// import medicalImage from './images/docnew.jpeg';
// import patientHistory from './images/Analysis.jpg';
// import symptomCorrelation from './images/docnew.jpeg';
// import confidenceScore from './images/Confidence.jpg';
// import erpPortal from './images/Erp.jpg';
// import multiLingualChat from './images/Chatbot.jpg';

// export default function Explore() {
// //   const { loginWithRedirect, isAuthenticated } = useAuth0();
//   const navigate = useNavigate();

// //   const handleNavigation = (link) => {
// //     if (!isAuthenticated) {
// //       loginWithRedirect(); // Redirects to Auth0 login page
// //     } else {
// //       navigate(link); // Navigates to the feature page
// //     }
// //   };

//   const services = [
//     { icon: medicalImage, title: "AI Image Analysis", description: "Unlock insights from X-rays, MRIs, and more with the power of AI. Fast, accurate, and insightful.", link: '/image-analysis', highlight: true },
//     { icon: erpPortal, title: "Patient & Doctor Portal", description: "Seamless care, connected experience. Your central hub for appointments, records, and communication.", link: '/portal', highlight: true },
//     { icon: patientHistory, title: "Smart History Scan", description: "Weaving the story of your health. NLP extracts key insights from your patient history & symptoms.", link: '/history', highlight: true },
//     { icon: symptomCorrelation, title: "Symptom Matcher", description: "Connecting the dots. Correlating image findings with your symptoms for a clearer picture.", link: '/symptom-correlation', highlight: true },
//     { icon: confidenceScore, title: "Diagnosis Confidence", description: "Understand the 'why' behind our suggestions. Each diagnosis comes with a probability score & reasoning.", link: '/confidence', highlight: true },
//     { icon: multiLingualChat, title: "Global Health Assistant", description: "Your health ally in 17+ languages. Chatbot support that understands you, wherever you are.", link: '/chatbot' }
//   ];

//   return (
//     <div id="features" className="max-w-7xl mx-auto px-4 py-20">
//       <h2 className="text-4xl font-bold mb-16 text-black">
//        Features
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className={`
//               p-6 rounded-lg flex flex-col
//               transform transition-all duration-300
//               bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
//               hover:scale-105 hover:bg-indigo-500 hover:border-transparent
//               group cursor-pointer
//               ${service.highlight 
//                 ? "hover:shadow-[0_0_20px_rgba(173,255,0,0.3)]" 
//                 : "hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
//               }
//             `}
//           >
//             <img src={service.icon} alt="Feature Icon" className="w-full h-48 object-cover rounded-md mb-4" />
//             <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-black">{service.title}</h3>
//             <p className="flex-grow text-gray-600 dark:text-gray-300 group-hover:text-gray-800">
//               {service.description}
//             </p>
//             {service.highlight && (
//               <button 
//                 onClick={() => handleNavigation(service.link)}
//                 className="
//                   mt-4 font-medium 
//                   transform transition-all duration-300
//                   hover:translate-x-2 hover:underline
//                   flex items-center gap-2
//                   text-gray-800 group-hover:text-black
//                 "
//               >
//                 Learn More 
//                 <span className="text-xl">→</span>
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import medicalImage from './images/docnew.jpeg';
import patientHistory from './images/Analysis.jpg';
import symptomCorrelation from './images/docnew.jpeg';
import confidenceScore from './images/Confidence.jpg';
import erpPortal from './images/Erp.jpg';
import multiLingualChat from './images/Chatbot.jpg';

export default function Explore({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(link);
    }
  };

  const services = [
    { icon: medicalImage, title: "Report Analysis", description: "Unlock insights from X-rays, MRIs, and more with the power of AI. Fast, accurate, and insightful.", link: '/image-analysis', highlight: true },
    { icon: erpPortal, title: "Patient & Doctor Portal", description: "Seamless care, connected experience. Your central hub for appointments, records, and communication.", link: '/portal', highlight: true },
    { icon: patientHistory, title: "Smart History Scan", description: "Weaving the story of your health. NLP extracts key insights from your patient history & symptoms.", link: '/history', highlight: true },
    { icon: symptomCorrelation, title: "Symptom Matcher", description: "Connecting the dots. Correlating image findings with your symptoms for a clearer picture.", link: '/symptom-correlation', highlight: true },
    { icon: confidenceScore, title: "Diagnosis Confidence", description: "Understand the 'why' behind our suggestions. Each diagnosis comes with a probability score & reasoning.", link: '/confidence', highlight: true },
    { icon: multiLingualChat, title: "Global Health Assistant", description: "Your health ally in 17+ languages. Chatbot support that understands you, wherever you are.", link: '/chatbot' }
  ];

  return (
    <div id="features" className="max-w-7xl mx-auto px-6 py-16 font-sans text-left text-[#37352f] dark:text-[#e3e3e3] transition-colors">
      <h2 className="text-3xl font-extrabold mb-10 text-[#37352f] dark:text-[#e3e3e3]">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-5 rounded-md flex flex-col bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] hover:border-[#37352f] dark:hover:border-[#e3e3e3] transition-colors cursor-pointer"
            onClick={() => handleNavigation(service.link)}
          >
            <img src={service.icon} alt="Feature Icon" className="w-full h-44 object-cover rounded-md mb-4 border border-[#e9e9e7] dark:border-[#2f2f2f]" />
            <h3 className="text-sm font-bold mb-1.5 text-[#37352f] dark:text-[#e3e3e3]">{service.title}</h3>
            <p className="flex-grow text-xs text-[#787774] dark:text-[#9b9b9b] leading-relaxed mb-3">
              {service.description}
            </p>
            {service.highlight && (
              <span 
                className="mt-2 text-xs font-semibold text-[#2383e2] hover:underline flex items-center gap-1"
              >
                Learn More 
                <span>→</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

