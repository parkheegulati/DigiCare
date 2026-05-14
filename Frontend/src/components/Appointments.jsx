import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Star, Clock, Video, MapPin, Search, Filter, ChevronRight, CheckCircle, X } from 'lucide-react';

const specializations = ['All', 'Cardiologist', 'Neurologist', 'Dermatologist', 'Orthopedic', 'General Physician', 'Psychiatrist'];

const doctors = [
  { id: 1, name: 'Dr. Anjali Nair', specialty: 'Cardiologist', rating: 4.9, reviews: 312, experience: '12 yrs', fee: '₹800', avatar: 'AN', available: true, slots: ['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'], online: true },
  { id: 2, name: 'Dr. Rahul Verma', specialty: 'Neurologist', rating: 4.8, reviews: 245, experience: '15 yrs', fee: '₹1200', avatar: 'RV', available: true, slots: ['11:00 AM', '3:00 PM', '5:00 PM'], online: true },
  { id: 3, name: 'Dr. Priya Sharma', specialty: 'General Physician', rating: 4.7, reviews: 528, experience: '8 yrs', fee: '₹500', avatar: 'PS', available: true, slots: ['9:30 AM', '11:30 AM', '1:00 PM', '3:30 PM'], online: false },
  { id: 4, name: 'Dr. Vikram Singh', specialty: 'Orthopedic', rating: 4.9, reviews: 189, experience: '20 yrs', fee: '₹1500', avatar: 'VS', available: false, slots: [], online: false },
  { id: 5, name: 'Dr. Meera Pillai', specialty: 'Dermatologist', rating: 4.6, reviews: 402, experience: '10 yrs', fee: '₹700', avatar: 'MP', available: true, slots: ['10:00 AM', '12:00 PM', '4:00 PM'], online: true },
  { id: 6, name: 'Dr. Arjun Das', specialty: 'Psychiatrist', rating: 4.8, reviews: 167, experience: '9 yrs', fee: '₹900', avatar: 'AD', available: true, slots: ['10:30 AM', '2:30 PM', '5:30 PM'], online: true },
];

const gradients = ['from-blue-500 to-blue-600', 'from-violet-500 to-violet-600', 'from-teal-500 to-teal-600', 'from-orange-500 to-orange-600', 'from-pink-500 to-pink-600', 'from-cyan-500 to-cyan-600'];

function BookingModal({ doctor, onClose }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mode, setMode] = useState('video');
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-manrope text-xl font-bold text-slate-900 dark:text-white mb-2">Appointment Booked!</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
            Your {mode === 'video' ? 'video' : 'in-person'} consultation with <strong>{doctor.name}</strong> is confirmed.
          </p>
          <p className="text-blue-600 font-semibold mb-6">Today at {selectedSlot}</p>
          <button onClick={onClose} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors">
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-manrope text-lg font-bold text-slate-900 dark:text-white">Book Appointment</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-5">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[doctor.id % gradients.length]} flex items-center justify-center text-white font-bold`}>
            {doctor.avatar}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{doctor.name}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{doctor.specialty} · {doctor.fee}</div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-5">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Consultation Mode</p>
          <div className="grid grid-cols-2 gap-2">
            {[{ key: 'video', label: '📹 Video Call', desc: 'Online consultation' }, { key: 'clinic', label: '🏥 In-Clinic', desc: 'Visit in person' }].map(({ key, label, desc }) => (
              <button key={key} onClick={() => setMode(key)}
                className={`p-3 rounded-2xl border text-left transition-all ${mode === key ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Available Slots — Today</p>
          <div className="grid grid-cols-2 gap-2">
            {doctor.slots.map(slot => (
              <button key={slot} onClick={() => setSelectedSlot(slot)}
                className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  selectedSlot === slot
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/25'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-600'
                }`}>
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => { if (selectedSlot) setConfirmed(true); }}
          disabled={!selectedSlot}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all shadow-md shadow-blue-600/20">
          Confirm Booking {selectedSlot ? `· ${selectedSlot}` : ''}
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 font-inter">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-manrope text-3xl sm:text-4xl font-extrabold text-white mb-3">Find & Book a Doctor</h1>
          <p className="text-blue-100 mb-8">Instant appointments with top specialists. Video or in-person.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search doctors, specializations..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Specialization Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {specializations.map(spec => (
            <button key={spec} onClick={() => setFilter(spec)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === spec
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}>
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((doc, i) => (
            <motion.div key={doc.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:-translate-y-1 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[doc.id % gradients.length]} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                  {doc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{doc.name}</h3>
                    {doc.online && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full flex-shrink-0">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />Online
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{doc.specialty}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{doc.rating}</span>
                    <span className="text-xs text-slate-400">({doc.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{doc.experience} exp</div>
                <div className="font-semibold text-slate-900 dark:text-white">{doc.fee} / session</div>
              </div>

              <button
                onClick={() => doc.available && setSelectedDoctor(doc)}
                disabled={!doc.available}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  doc.available
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 hover:shadow-blue-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}>
                {doc.available ? 'Book Appointment' : 'Unavailable Today'}
              </button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No doctors found for "{search}" in "{filter}"</p>
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
