import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart, Activity, Shield, Brain, Calendar, FileText,
  Pill, Phone, ChevronRight, Star, Users, CheckCircle,
  ArrowRight, Play, Zap, Globe, Clock, Award
} from 'lucide-react';

const stats = [
  { label: 'Active Patients', value: '50K+', icon: Users },
  { label: 'AI Diagnoses', value: '2M+', icon: Brain },
  { label: 'Healthcare Partners', value: '500+', icon: Shield },
  { label: 'Avg Response Time', value: '<2min', icon: Clock },
];

const features = [
  { icon: Brain, title: 'AI Health Assistant', desc: 'Conversational AI that analyzes symptoms, suggests diagnoses, and recommends next steps instantly.', color: 'from-blue-500 to-blue-600', link: '/ai-assistant' },
  { icon: Calendar, title: 'Smart Appointments', desc: 'Book with top specialists instantly. Real-time availability, video consultations, and reminders.', color: 'from-cyan-500 to-cyan-600', link: '/appointments' },
  { icon: FileText, title: 'Medical Reports', desc: 'Upload, analyze, and track all your medical reports with AI-powered insights and trend analysis.', color: 'from-teal-500 to-teal-600', link: '/reports' },
  { icon: Pill, title: 'Medicine Reminders', desc: 'Never miss a dose. Smart reminders with streak tracking and dosage management.', color: 'from-violet-500 to-violet-600', link: '/medicine' },
  { icon: Phone, title: 'Emergency SOS', desc: 'One-tap emergency alerts to hospitals, ambulances, and your emergency contacts.', color: 'from-red-500 to-red-600', link: '/emergency' },
  { icon: Activity, title: 'Health Analytics', desc: 'Comprehensive dashboards tracking vitals, trends, and personalized health scores over time.', color: 'from-orange-500 to-orange-600', link: '/dashboard' },
];

const testimonials = [
  { name: 'Dr. Priya Sharma', role: 'Cardiologist, AIIMS Delhi', text: 'DigiCare has transformed how I interact with patient data. The AI insights are remarkably accurate.', rating: 5, avatar: 'PS' },
  { name: 'Rahul Mehta', role: 'Patient', text: 'The medicine reminder and health tracking features keep me on top of my health like never before.', rating: 5, avatar: 'RM' },
  { name: 'Dr. Anjali Nair', role: 'General Physician', text: 'The report analysis saves me hours each week. This is the future of healthcare.', rating: 5, avatar: 'AN' },
];

const faqs = [
  { q: 'Is my health data secure?', a: 'Yes. All data is encrypted end-to-end and complies with HIPAA and GDPR standards.' },
  { q: 'Can I consult a doctor online?', a: 'Absolutely. Book video or chat consultations with verified specialists from our network.' },
  { q: 'How accurate is the AI diagnosis?', a: 'Our AI is trained on millions of clinical cases and achieves >95% accuracy on symptom triage.' },
  { q: 'Is there a free plan?', a: 'Yes! The free tier includes AI health chat, basic reports, and up to 3 appointments per month.' },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt(target.replace(/\D/g, ''));
  const suffix = target.replace(/[\d]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(start);
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
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-white dark:bg-slate-950 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              Powered by Advanced AI · Trusted by 50K+ patients
            </div>

            <h1 className="font-manrope text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              AI-Powered Smart
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Healthcare Platform
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
              From instant symptom analysis to smart appointments and real-time health analytics — DigiCare is your complete digital health companion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all hover:scale-[1.03]"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/appointments')}
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </motion.div>

          {/* Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-20 relative max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50 overflow-hidden p-6">
              {/* Mock Dashboard Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg ml-4" />
              </div>
              {/* Mock Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {['Health Score', 'Heart Rate', 'Blood Pressure', 'Appointments'].map((label, i) => (
                  <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                    <div className={`w-8 h-8 rounded-xl mb-2 bg-gradient-to-br ${['from-blue-500 to-blue-600', 'from-red-400 to-red-500', 'from-teal-400 to-teal-500', 'from-violet-400 to-violet-500'][i]}`} />
                    <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
                    <div className="text-lg font-bold text-slate-800 dark:text-white mt-1">
                      {['92/100', '72 bpm', '120/80', '3 Today'][i]}
                    </div>
                  </div>
                ))}
              </div>
              {/* Mock Chart Area */}
              <div className="h-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-end px-6 pb-4 gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-500 to-cyan-400 opacity-70"
                  />
                ))}
              </div>
            </div>
            {/* Floating badge elements */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -left-8 top-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-white">Report Ready</div>
                <div className="text-xs text-slate-400">Blood Test Analysis</div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
              className="absolute -right-8 top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-3">
              <div className="text-xs font-semibold text-slate-800 dark:text-white mb-1">AI Diagnosis</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="text-xs text-green-600">98% Confidence</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-manrope text-3xl font-bold mb-1">
                  <AnimatedCounter target={value} />
                </div>
                <div className="text-blue-100 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" /> Everything you need
            </div>
            <h2 className="font-manrope text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              A complete healthcare ecosystem
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Every tool you need to manage your health, all in one beautifully designed platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, link }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(link)}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-manrope text-4xl font-extrabold text-slate-900 dark:text-white mb-4">How DigiCare works</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Three simple steps to better health</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your profile', desc: 'Sign up and build your personalized health profile. Import existing records in seconds.' },
              { step: '02', title: 'Talk to the AI', desc: 'Describe symptoms to our AI assistant. Get instant analysis, triage, and recommendations.' },
              { step: '03', title: 'Connect with care', desc: 'Book appointments, receive reports, track medications — all from one dashboard.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center relative">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                  <span className="font-manrope font-bold text-white text-xl">{step}</span>
                </div>
                {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-700 dark:to-cyan-700" />}
                <h3 className="font-semibold text-slate-900 dark:text-white text-xl mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-manrope text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Loved by patients & doctors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating, avatar }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">{avatar}</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-manrope text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div key={q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="font-medium text-slate-900 dark:text-white">{q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-manrope text-4xl font-extrabold text-white mb-4">Start your health journey today</h2>
            <p className="text-blue-100 text-lg mb-8">Join 50,000+ users who trust DigiCare for their healthcare management.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/register')}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 shadow-lg transition-all hover:scale-[1.02]">
                Get Started — It's Free
              </button>
              <button onClick={() => navigate('/ai-assistant')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/30 transition-all">
                Try AI Assistant
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-manrope font-bold text-xl text-white">Digi<span className="text-blue-400">Care</span></span>
              </div>
              <p className="text-sm leading-relaxed">AI-powered healthcare platform for patients and professionals.</p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                {['Dashboard', 'AI Assistant', 'Appointments', 'Reports', 'Medicine Reminders', 'Emergency SOS'].map(l => (
                  <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <p className="text-sm mb-3">Have questions or feedback? Reach out to us.</p>
              <a
                href="mailto:parkheegulati8@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors break-all"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                parkheegulati8@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 DigiCare. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4" /> <span>Available in 15+ languages</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}