import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is DigiCare?",
    answer: "DigiCare is an AI-powered healthcare platform that helps users manage medical reports, analyze medical images, track symptoms, and get AI-driven diagnostics."
  },
  {
    question: "How does the AI image analysis work?",
    answer: "Our AI scans medical images (X-rays, ECGs, MRIs) using deep learning to detect patterns, anomalies, and possible diagnoses with high accuracy."
  },
  {
    question: "Is my medical data secure?",
    answer: "Yes! DigiCare prioritizes security by encrypting all medical records and using cloud storage solutions like Cloudinary to ensure safe and private data handling."
  },
  {
    question: "Can I use DigiCare without a doctor's consultation?",
    answer: "DigiCare provides first-hand AI insights and suggestions but should not replace professional medical advice. Always consult a certified healthcare provider."
  },
  {
    question: "Does DigiCare offer disease prediction?",
    answer: "Yes, our system analyzes your medical history and symptoms to predict potential diseases using machine learning models."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white text-gray-900 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p className="text-gray-500 mt-2">Find answers to the most common questions about DigiCare.</p>
      </div>

      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-gray-300 rounded-lg shadow-md p-4 transition-all duration-300 ${
              openIndex === index ? "bg-indigo-400 text-black" : "bg-white"
            }`}
          >
            <button
              className={`w-full flex justify-between items-center text-lg font-medium transition-colors duration-300 ${
                openIndex === index ? "text-black text-lg font-semibold" : "text-gray-900"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <FaChevronDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180 text-white" : "text-gray-500"
                }`}
              />
            </button>
            {openIndex === index && (
              <p className="mt-2  text-black border-t border-gray-200 pt-2">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
