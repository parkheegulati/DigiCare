import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Plus, CheckCircle, Clock, Flame, RotateCcw, Bell, X, ChevronRight } from 'lucide-react';

const initialMeds = [
  { id: 1, name: 'Metformin 500mg', type: 'Tablet', times: ['8:00 AM', '8:00 PM'], taken: [true, false], streak: 14, color: 'from-blue-500 to-blue-600', frequency: 'Twice daily', notes: 'Take with food' },
  { id: 2, name: 'Amlodipine 5mg', type: 'Tablet', times: ['9:00 PM'], taken: [false], streak: 7, color: 'from-violet-500 to-violet-600', frequency: 'Once daily', notes: 'Avoid grapefruit' },
  { id: 3, name: 'Vitamin D3 60K', type: 'Capsule', times: ['1:00 PM'], taken: [true], streak: 30, color: 'from-orange-500 to-orange-600', frequency: 'Once daily', notes: 'After lunch' },
  { id: 4, name: 'Omega-3 Fatty Acids', type: 'Softgel', times: ['9:00 AM', '9:00 PM'], taken: [true, true], streak: 5, color: 'from-teal-500 to-teal-600', frequency: 'Twice daily', notes: '' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const adherence = [85, 100, 75, 100, 100, 50, 85];

export default function MedicineReminder() {
  const [meds, setMeds] = useState(initialMeds);
  const [showAdd, setShowAdd] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', type: 'Tablet', time: '', frequency: 'Once daily' });

  const toggleTaken = (medId, doseIndex) => {
    setMeds(prev => prev.map(m => {
      if (m.id !== medId) return m;
      const taken = [...m.taken];
      taken[doseIndex] = !taken[doseIndex];
      return { ...m, taken, streak: taken[doseIndex] ? m.streak + 1 : Math.max(0, m.streak - 1) };
    }));
  };

  const completedToday = meds.reduce((sum, m) => sum + m.taken.filter(Boolean).length, 0);
  const totalDoses = meds.reduce((sum, m) => sum + m.times.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 font-inter">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-manrope text-3xl font-extrabold text-slate-900 dark:text-white">Medicine Reminders</h1>
            <p className="text-slate-500 dark:text-slate-400">Track your medication schedule and streaks</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02]">
            <Plus className="w-4 h-4" /> Add Medicine
          </button>
        </div>

        {/* Progress Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Today's Progress</p>
              <p className="font-manrope text-3xl font-bold">{completedToday} / {totalDoses} doses</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Pill className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedToday / totalDoses) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-blue-100 text-xs mt-2">{Math.round((completedToday / totalDoses) * 100)}% complete · Keep it up!</p>
        </motion.div>

        {/* Weekly Adherence */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Weekly Adherence</h3>
          <div className="flex items-end gap-2">
            {days.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: 80 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${adherence[i]}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`w-full rounded-lg ${adherence[i] === 100 ? 'bg-green-500' : adherence[i] >= 75 ? 'bg-blue-500' : 'bg-yellow-400'}`}
                    style={{ maxHeight: 80 }}
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{day}</div>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{adherence[i]}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Cards */}
        <div className="space-y-4">
          {meds.map((med, i) => (
            <motion.div key={med.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${med.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Pill className="w-6 h-6 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{med.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">{med.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" />{med.frequency}</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" />
                      <span className="font-medium text-orange-500">{med.streak} day streak</span>
                    </span>
                    {med.notes && <span className="text-slate-400">· {med.notes}</span>}
                  </div>

                  {/* Dose Toggles */}
                  <div className="flex gap-2 flex-wrap">
                    {med.times.map((time, di) => (
                      <button key={time} onClick={() => toggleTaken(med.id, di)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                          med.taken[di]
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}>
                        {med.taken[di]
                          ? <CheckCircle className="w-4 h-4 text-green-600" />
                          : <Clock className="w-4 h-4 text-slate-400" />
                        }
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Medicine Modal */}
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-manrope text-lg font-bold text-slate-900 dark:text-white">Add Medicine</h3>
                <button onClick={() => setShowAdd(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Medicine Name</label>
                  <input value={newMed.name} onChange={e => setNewMed({...newMed, name: e.target.value})}
                    placeholder="e.g. Paracetamol 500mg"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Type</label>
                    <select value={newMed.type} onChange={e => setNewMed({...newMed, type: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
                      {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Softgel'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Frequency</label>
                    <select value={newMed.frequency} onChange={e => setNewMed({...newMed, frequency: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
                      {['Once daily', 'Twice daily', 'Thrice daily', 'Weekly'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Time</label>
                  <input type="time" value={newMed.time} onChange={e => setNewMed({...newMed, time: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <button
                  onClick={() => {
                    if (newMed.name && newMed.time) {
                      setMeds(prev => [...prev, {
                        id: Date.now(), name: newMed.name, type: newMed.type,
                        times: [newMed.time], taken: [false], streak: 0,
                        color: 'from-pink-500 to-pink-600', frequency: newMed.frequency, notes: ''
                      }]);
                      setShowAdd(false);
                      setNewMed({ name: '', type: 'Tablet', time: '', frequency: 'Once daily' });
                    }
                  }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors shadow-md shadow-blue-600/20">
                  Add Medicine
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
