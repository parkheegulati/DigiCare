import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Star, Clock, Video, MapPin, Search, Filter, ChevronRight, CheckCircle2, X, Stethoscope, ShieldCheck, ArrowRight } from 'lucide-react';
import doctorTenaImg from '../assets/doctor_tena_johnson.jpg';
import drMeeraImg from '../assets/dr_meera.jpg';

const specializations = ['All', 'General Physician', 'Cardiologist', 'Surgeon', 'Neurologist', 'Dermatologist', 'Orthopedic', 'Psychiatrist'];

const doctors = [
  {
    id: 1,
    name: 'Dr. Meera Patel',
    specialty: 'General Physician',
    rating: 4.99,
    reviews: 512,
    experience: '12 yrs',
    fee: '₹1,000',
    avatar: drMeeraImg,
    available: true,
    slots: ['9:30 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
    online: true,
    hospital: 'DigiCare Medical Center'
  },
  {
    id: 2,
    name: 'Dr. Tena Johnson',
    specialty: 'Surgeon',
    rating: 4.98,
    reviews: 420,
    experience: '14 yrs',
    fee: '₹1,500',
    avatar: doctorTenaImg,
    available: true,
    slots: ['10:00 AM', '11:30 AM', '2:30 PM', '4:00 PM'],
    online: true,
    hospital: 'Metro Surgical Hospital'
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    rating: 4.95,
    reviews: 380,
    experience: '16 yrs',
    fee: '₹1,200',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    available: true,
    slots: ['9:00 AM', '10:30 AM', '2:00 PM', '5:00 PM'],
    online: true,
    hospital: 'AIIMS Heart Institute'
  },
  {
    id: 3,
    name: 'Dr. Rahul Verma',
    specialty: 'Neurologist',
    rating: 4.88,
    reviews: 260,
    experience: '12 yrs',
    fee: '₹1,400',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    available: true,
    slots: ['11:00 AM', '3:00 PM', '5:30 PM'],
    online: true,
    hospital: 'Apollo Neuroscience Clinic'
  },
  {
    id: 4,
    name: 'Dr. Meera Pillai',
    specialty: 'Dermatologist',
    rating: 4.92,
    reviews: 410,
    experience: '10 yrs',
    fee: '₹900',
    avatar: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?w=200&auto=format&fit=crop&q=80',
    available: true,
    slots: ['10:00 AM', '12:00 PM', '3:30 PM'],
    online: true,
    hospital: 'DermaCare Skin & Laser'
  },
  {
    id: 5,
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedic',
    rating: 4.85,
    reviews: 195,
    experience: '18 yrs',
    fee: '₹1,600',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    available: false,
    slots: [],
    online: false,
    hospital: 'Fortis Bone & Joint Center'
  },
  {
    id: 6,
    name: 'Dr. Arjun Das',
    specialty: 'Psychiatrist',
    rating: 4.91,
    reviews: 215,
    experience: '9 yrs',
    fee: '₹1,000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    available: true,
    slots: ['10:30 AM', '2:00 PM', '4:30 PM'],
    online: true,
    hospital: 'MindWellness Clinic'
  },
];

function BookingModal({ doctor, onClose }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mode, setMode] = useState('video');
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-[#18181b] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Appointment Confirmed!</h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs mb-3 leading-relaxed">
            Your {mode === 'video' ? 'video consultation' : 'in-clinic appointment'} with <strong className="text-slate-900 dark:text-white">{doctor.name}</strong> is scheduled.
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold text-xs mb-6">
            Today at {selectedSlot}
          </div>
          <button onClick={onClose} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-full font-semibold text-xs transition-all shadow-sm">
            Add to Calendar & Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-[#18181b] rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 text-left shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Schedule Consultation</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 rounded-2xl mb-4">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-xs"
          />
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">{doctor.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{doctor.specialty} · {doctor.hospital}</div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{doctor.fee} / consultation</div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Consultation Mode</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'video', label: '📹 Live Video', desc: 'Encrypted virtual room' },
              { key: 'clinic', label: '🏥 Hospital Visit', desc: 'In-person clinic slot' }
            ].map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  mode === key
                    ? 'border-slate-900 bg-slate-100/80 dark:border-white dark:bg-slate-800 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">{label}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Available Slots — Today</p>
          <div className="grid grid-cols-2 gap-2">
            {doctor.slots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedSlot === slot
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => { if (selectedSlot) setConfirmed(true); }}
          disabled={!selectedSlot}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs rounded-full transition-all shadow-md"
        >
          Confirm Consultation {selectedSlot ? `· ${selectedSlot}` : ''}
        </button>
      </motion.div>
    </div>
  );
}

export default function Appointments() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filtered = doctors.filter(d =>
    (filter === 'All' || d.specialty === filter) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f1115] pt-20 font-sans text-slate-900 dark:text-slate-100">
      {/* Hero Header */}
      <div className="relative border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-12 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-200/60 dark:border-blue-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Medical Specialist Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Find & Book Specialist Consultations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
            Choose from board-certified surgeons, cardiologists, and physicians. Book in seconds with instant digital confirmation.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search specialists, cardiology, surgery, or hospital..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Specialization Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {specializations.map(spec => (
            <button
              key={spec}
              onClick={() => setFilter(spec)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === spec
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 text-left shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{doc.name}</h3>
                      {doc.online && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded-full shrink-0">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Online
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400">{doc.specialty}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{doc.hospital}</div>
                    
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{doc.rating}</span>
                      <span className="text-[11px] text-slate-400">({doc.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 py-3 border-t border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.experience} clinical exp</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">{doc.fee} / slot</div>
                </div>
              </div>

              <button
                onClick={() => doc.available && setSelectedDoctor(doc)}
                disabled={!doc.available}
                className={`w-full py-2.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                  doc.available
                    ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {doc.available ? 'Book Consultation →' : 'Fully Booked Today'}
              </button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No specialists found matching "{search}".</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />}
      </AnimatePresence>
    </div>
  );
}

