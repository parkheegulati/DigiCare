import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Heart, Activity, Shield, Brain, Calendar, FileText,
  Pill, Phone, ChevronRight, Star, Users, CheckCircle2,
  ArrowRight, Play, Zap, Globe, Clock, Award,
  Sparkles, Check, Stethoscope, ShieldCheck
} from 'lucide-react';

// User's attached realistic doctor consultation photo as the hero background
import doctorHeroBg from '../assets/doctor-consultation.png';
import medicalTechBg from '../assets/medical-tech-bg.png';
import logoImg from '../assets/logo.png';

const stats = [
  { label: 'Active Patients', value: '50K+', icon: Users },
  { label: 'AI Diagnoses', value: '2M+', icon: Brain },
  { label: 'Healthcare Partners', value: '500+', icon: Shield },
  { label: 'Avg Response Time', value: '<2min', icon: Clock },
];

const features = [
  {
    icon: Brain,
    title: 'AI Health Assistant',
    desc: 'Conversational AI that analyzes symptoms, suggests diagnoses, and recommends next steps instantly.',
    link: '/ai-assistant'
  },
  {
    icon: Calendar,
    title: 'Smart Appointments',
    desc: 'Book with top specialists instantly. Real-time availability, video consultations, and reminders.',
    link: '/appointments'
  },
  {
    icon: FileText,
    title: 'Medical Reports',
    desc: 'Upload, analyze, and track all your medical reports with AI-powered insights and trend analysis.',
    link: '/reports'
  },
  {
    icon: Pill,
    title: 'Medicine Reminders',
    desc: 'Never miss a dose. Smart reminders with streak tracking and dosage management.',
    link: '/medicine'
  },
  {
    icon: Phone,
    title: 'Emergency SOS',
    desc: 'One-tap emergency alerts to hospitals, ambulances, and your emergency contacts.',
    link: '/emergency'
  },
  {
    icon: Activity,
    title: 'Health Analytics',
    desc: 'Comprehensive dashboards tracking vitals, trends, and personalized health scores over time.',
    link: '/dashboard'
  },
];

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Cardiologist, AIIMS Delhi',
    text: 'DigiCare has transformed how I interact with patient data. The AI insights are remarkably accurate.',
    rating: 5,
    avatar: 'PS'
  },
  {
    name: 'Rahul Mehta',
    role: 'Patient',
    text: 'The medicine reminder and health tracking features keep me on top of my health like never before.',
    rating: 5,
    avatar: 'RM'
  },
  {
    name: 'Dr. Anjali Nair',
    role: 'General Physician',
    text: 'The report analysis saves me hours each week. This is the future of healthcare.',
    rating: 5,
    avatar: 'AN'
  },
];

const faqs = [
  {
    q: 'Is my health data secure?',
    a: 'Yes. All data is encrypted end-to-end and complies with HIPAA and GDPR standards.'
  },
  {
    q: 'Can I consult a doctor online?',
    a: 'Absolutely. Book video or chat consultations with verified specialists from our network.'
  },
  {
    q: 'How accurate is the AI diagnosis?',
    a: 'Our AI is trained on millions of clinical cases and achieves >95% accuracy on symptom triage.'
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes! The free tier includes AI health chat, basic reports, and up to 3 appointments per month.'
  },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt(target.replace(/\D/g, '')) || 0;
  const suffix = target.replace(/[\d]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.max(1, Math.ceil(num / 40));
        const timer = setInterval(() => {
          start += step;
          if (start >= num) {
            setCount(num);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION: FULL-WIDTH EDGE-TO-EDGE PHOTO BACKGROUND (NO RECTANGULAR BOX)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
        
        {/* ── True Full-Screen Edge-to-Edge Background Image ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={doctorHeroBg}
            alt="Medical Doctor Consultation"
            className="w-full h-full object-cover object-right lg:object-center"
          />
          {/* Gradient overlay — semi-transparent so photo shows through */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafbfc]/80 via-transparent to-transparent" />
        </div>


        {/* ── Content on top of Background ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="tracking-tight mb-6"
            >
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white block">
                DigiCare
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 block mt-2">
                Smarter healthcare, built for real life.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-normal"
            >
              From quick symptom checks to booking and tracking care, DigiCare cuts through the chaos. Fast, reliable, and designed to keep things moving when it matters most.
            </motion.p>

            {/* Action Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => navigate('/register')}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Register</span>
                <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-slate-900/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              <button
                onClick={() => navigate('/appointments')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-300/80 dark:border-slate-700 backdrop-blur-md transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Book Appointment</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STATS ROW (Original Content with Modern Pill/Card Styling)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white dark:bg-[#12141a] border-t border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-0.5 tracking-tight">
                  <AnimatedCounter target={value} />
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FEATURES SECTION: BRIGHT MEDICAL TECH PHOTO BACKGROUND
      ───────────────────────────────────────────────────────────── */}
      <section id="features" className="relative py-28 overflow-hidden bg-[#fafbfc]">
        {/* Bright Doctor & Cyan Digital HUD Medical Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={medicalTechBg}
            alt="Doctor Digital Healthcare Medical Technology Background"
            className="w-full h-full object-cover object-center opacity-100"
          />
          {/* Subtle light overlay to ensure text readability while leaving image 100% visible */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafbfc] via-transparent to-[#fafbfc]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-4 backdrop-blur-md shadow-xs">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Everything you need</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-xs">
              A complete healthcare ecosystem
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-lg mx-auto leading-relaxed font-normal">
              Every tool you need to manage your health, powered by advanced medical diagnostics and AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, link }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(link)}
                className="group relative rounded-3xl p-6 bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-blue-500/60 hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          TESTIMONIALS (Original Content)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#fafbfc] dark:bg-[#0f1115]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Loved by patients & doctors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating, avatar }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 text-left shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-3 text-amber-500">
                    {Array.from({ length: rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 text-sm mb-6 leading-relaxed italic">
                    "{text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold text-xs">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CTA + FAQ  — side by side
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── LEFT: CTA card ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col items-center text-center h-full justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm border border-slate-200/80 p-2">
                <img src={logoImg} alt="DigiCare Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Start your health journey today
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mb-7 max-w-xs mx-auto leading-relaxed">
                Join 50,000+ users who trust DigiCare for their healthcare management.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-sm w-full sm:w-auto"
                >
                  Register Free →
                </button>
                <button
                  onClick={() => navigate('/ai-assistant')}
                  className="px-6 py-2.5 bg-white text-slate-700 border border-slate-200 font-semibold text-xs sm:text-sm rounded-full hover:bg-slate-50 transition-colors w-full sm:w-auto"
                >
                  Try AI Assistant
                </button>
              </div>
            </motion.div>

            {/* ── RIGHT: FAQ accordion ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                Frequently asked questions
              </h2>

              <div className="space-y-3">
                {faqs.map(({ q, a }, i) => (
                  <motion.div
                    key={q}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-slate-50/70 rounded-2xl border border-slate-200/80 overflow-hidden text-left"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-xs sm:text-sm text-slate-900 hover:text-[#4CA0C0] transition-colors"
                    >
                      <span>{q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                          openFaq === i ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-3">
                            {a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER (Original Content with Modern Clean Styling)
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-50 dark:bg-[#0b0d10] text-slate-600 dark:text-slate-400 py-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img src={logoImg} alt="DigiCare Logo" className="w-8 h-8 rounded-full object-contain" />
                <span className="font-bold text-base text-slate-900">
                  Digi<span className="text-[#4CA0C0]">Care</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                AI-powered healthcare platform for patients and professionals.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
                Platform
              </h4>
              <ul className="space-y-1.5">
                {['Dashboard', 'AI Assistant', 'Appointments', 'Reports', 'Medicine Reminders', 'Emergency SOS'].map(l => (
                  <li key={l}>
                    <button
                      onClick={() => navigate(`/${l.toLowerCase().split(' ')[0]}`)}
                      className="text-xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
                Contact Us
              </h4>
              <p className="text-xs mb-2">Have questions or feedback? Reach out to us.</p>
              <a
                href="mailto:parkheegulati8@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                parkheegulati8@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© 2025 DigiCare. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> <span>Available in 15+ languages</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}