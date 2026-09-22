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
    <section id="faq" className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] py-16 px-6 font-sans transition-colors">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-[#37352f] dark:text-[#e3e3e3]">Frequently Asked Questions</h2>
        <p className="text-xs text-[#787774] dark:text-[#9b9b9b] mt-2">Find answers to the most common questions about DigiCare.</p>
      </div>

      <div className="max-w-3xl mx-auto mt-8 space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md p-4 transition-colors ${
              openIndex === index ? "bg-[#f7f6f3] dark:bg-[#202020]" : "bg-white dark:bg-[#191919]"
            }`}
          >
            <button
              className="w-full flex justify-between items-center text-sm font-semibold text-[#37352f] dark:text-[#e3e3e3] text-left"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <FaChevronDown
                className={`transition-transform text-xs text-[#787774] ml-2 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <p className="mt-2.5 text-xs text-[#787774] dark:text-[#9b9b9b] border-t border-[#e9e9e7] dark:border-[#2f2f2f] pt-2.5 leading-relaxed text-left">
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
