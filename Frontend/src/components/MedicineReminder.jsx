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
    <div className="min-h-screen bg-white dark:bg-[#191919] pt-14 font-sans text-[#37352f] dark:text-[#e3e3e3]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 text-left">
          <div>
            <h1 className="text-3xl font-extrabold text-[#37352f] dark:text-[#e3e3e3] mb-1">Medicine Reminders</h1>
            <p className="text-sm text-[#787774] dark:text-[#9b9b9b]">Track your medication schedule and streaks</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] font-medium text-xs rounded-md transition-colors">
            <Plus className="w-4 h-4" /> Add Medicine
          </button>
        </div>

        {/* Progress Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md p-5 mb-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[#787774] dark:text-[#9b9b9b] text-xs font-medium mb-0.5">Today's Progress</p>
              <p className="text-2xl font-bold text-[#37352f] dark:text-[#e3e3e3]">{completedToday} / {totalDoses} doses</p>
            </div>
            <div className="w-12 h-12 rounded bg-[#37352f] dark:bg-[#e3e3e3] flex items-center justify-center">
              <Pill className="w-6 h-6 text-white dark:text-[#191919]" />
            </div>
          </div>
          <div className="w-full h-2 bg-[#e9e9e7] dark:bg-[#2f2f2f] rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedToday / totalDoses) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#37352f] dark:bg-[#e3e3e3] rounded"
            />
          </div>
          <p className="text-[#787774] dark:text-[#9b9b9b] text-xs mt-2">{Math.round((completedToday / totalDoses) * 100)}% complete · Keep it up!</p>
        </motion.div>

        {/* Weekly Adherence */}
        <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 mb-6 text-left">
          <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3] text-sm mb-3">Weekly Adherence</h3>
          <div className="flex items-end gap-2">
            {days.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: 80 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${adherence[i]}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`w-full rounded ${adherence[i] === 100 ? 'bg-[#448361]' : adherence[i] >= 75 ? 'bg-[#2383e2]' : 'bg-[#d9730d]'}`}
                    style={{ maxHeight: 80 }}
                  />
                </div>
                <div className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">{day}</div>
                <div className="text-[11px] font-medium text-[#37352f] dark:text-[#e3e3e3]">{adherence[i]}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Cards */}
        <div className="space-y-3">
          {meds.map((med, i) => (
            <motion.div key={med.id}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 hover:bg-[#efefed] dark:hover:bg-[#252525] transition-colors text-left">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] flex items-center justify-center flex-shrink-0">
                  <Pill className="w-5 h-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3] text-sm">{med.name}</h3>
                    <span className="text-[11px] px-2 py-0.5 bg-[#e9e9e7] dark:bg-[#2f2f2f] text-[#787774] dark:text-[#9b9b9b] rounded">{med.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#787774] dark:text-[#9b9b9b] mb-2.5">
                    <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" />{med.frequency}</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#d9730d]" />
                      <span className="font-medium text-[#d9730d]">{med.streak} day streak</span>
                    </span>
                    {med.notes && <span className="text-[#787774]">· {med.notes}</span>}
                  </div>

                  {/* Dose Toggles */}
                  <div className="flex gap-2 flex-wrap">
                    {med.times.map((time, di) => (
                      <button key={time} onClick={() => toggleTaken(med.id, di)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                          med.taken[di]
                            ? 'bg-[#edf3ec] dark:bg-[#1c2c21] border-[#d3e5d1] dark:border-[#2b4431] text-[#448361] dark:text-[#4ade80]'
                            : 'bg-white dark:bg-[#191919] border-[#e9e9e7] dark:border-[#2f2f2f] text-[#37352f] dark:text-[#e3e3e3] hover:bg-[#f7f6f3] dark:hover:bg-[#252525]'
                        }`}>
                        {med.taken[di]
                          ? <CheckCircle className="w-3.5 h-3.5 text-[#448361]" />
                          : <Clock className="w-3.5 h-3.5 text-[#787774]" />
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
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#202020] rounded-md p-5 max-w-sm w-full border border-[#e9e9e7] dark:border-[#2f2f2f] text-left text-[#37352f] dark:text-[#e3e3e3]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-[#37352f] dark:text-[#e3e3e3]">Add Medicine</h3>
                <button onClick={() => setShowAdd(false)} className="p-1 rounded hover:bg-[#f7f6f3] dark:hover:bg-[#252525] text-[#787774]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#787774] dark:text-[#9b9b9b] mb-1">Medicine Name</label>
                  <input value={newMed.name} onChange={e => setNewMed({...newMed, name: e.target.value})}
                    placeholder="e.g. Paracetamol 500mg"
                    className="w-full px-3 py-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-[#787774] dark:text-[#9b9b9b] mb-1">Type</label>
                    <select value={newMed.type} onChange={e => setNewMed({...newMed, type: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]">
                      {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Softgel'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#787774] dark:text-[#9b9b9b] mb-1">Frequency</label>
                    <select value={newMed.frequency} onChange={e => setNewMed({...newMed, frequency: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]">
                      {['Once daily', 'Twice daily', 'Thrice daily', 'Weekly'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#787774] dark:text-[#9b9b9b] mb-1">Time</label>
                  <input type="time" value={newMed.time} onChange={e => setNewMed({...newMed, time: e.target.value})}
                    className="w-full px-3 py-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]" />
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
                  className="w-full py-2 bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] font-medium text-xs rounded-md transition-colors">
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
