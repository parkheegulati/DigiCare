import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, AlertTriangle, Heart, Activity, User, Shield, CheckCircle, Ambulance } from 'lucide-react';

const emergencyContacts = [
  { name: 'Mom', phone: '+91 98765 43210', relation: 'Mother', avatar: 'M' },
  { name: 'Dr. Anjali Nair', phone: '+91 87654 32109', relation: 'Cardiologist', avatar: 'AN' },
  { name: 'Raj (Brother)', phone: '+91 76543 21098', relation: 'Family', avatar: 'R' },
];

const nearbyHospitals = [
  { name: 'AIIMS Delhi', distance: '2.3 km', type: 'Government', beds: 42, emergency: true },
  { name: 'Apollo Hospital', distance: '3.1 km', type: 'Private', beds: 18, emergency: true },
  { name: 'Fortis Healthcare', distance: '4.5 km', type: 'Private', beds: 7, emergency: true },
];

const steps = ['Locating you', 'Alerting contacts', 'Dispatching ambulance', 'ETA: 8 minutes'];

export default function Emergency() {
  const [sosActive, setSosActive] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const activateSOS = () => {
    setSosActive(true);
    setSosSent(false);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setSosSent(true);
      } else {
        setCurrentStep(step);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 font-inter">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            Emergency Response System
          </div>
          <h1 className="font-manrope text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Emergency SOS</h1>
          <p className="text-slate-500 dark:text-slate-400">One tap to alert emergency services and your contacts</p>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* Pulse rings */}
            {sosActive && !sosSent && (
              <>
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute inset-0 rounded-full bg-red-500 pointer-events-none"
                  />
                ))}
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={activateSOS}
              disabled={sosActive}
              className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl font-bold text-white transition-all select-none ${
                sosSent
                  ? 'bg-green-500 shadow-green-500/40'
                  : sosActive
                  ? 'bg-red-600 shadow-red-500/50 animate-pulse'
                  : 'bg-red-500 hover:bg-red-600 shadow-red-500/40 cursor-pointer'
              }`}
            >
              {sosSent ? (
                <>
                  <CheckCircle className="w-10 h-10 mb-1" />
                  <span className="text-sm font-bold">Help Coming</span>
                </>
              ) : (
                <>
                  <Phone className="w-10 h-10 mb-1" />
                  <span className="text-xl font-extrabold tracking-wider">SOS</span>
                  {!sosActive && <span className="text-xs font-normal opacity-75 mt-0.5">Tap to activate</span>}
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Status Tracker */}
        <AnimatePresence>
          {sosActive && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 mb-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                {sosSent ? '✅ Emergency services notified' : '🚨 Sending emergency alert...'}
              </h3>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      i < currentStep || sosSent ? 'bg-green-500' : i === currentStep ? 'bg-red-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'
                    }`}>
                      {(i < currentStep || sosSent)
                        ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                        : <span className="w-2 h-2 rounded-full bg-white" />
                      }
                    </div>
                    <span className={`text-sm ${i <= currentStep || sosSent ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400'}`}>{step}</span>
                  </div>
                ))}
              </div>
              {sosSent && (
                <button onClick={() => { setSosActive(false); setSosSent(false); setCurrentStep(-1); }}
                  className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Cancel Emergency
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Emergency Contacts</h3>
              <button className="text-xs text-blue-600 hover:underline">+ Add</button>
            </div>
            <div className="space-y-3">
              {emergencyContacts.map(({ name, phone, relation, avatar }) => (
                <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{relation} · {phone}</div>
                  </div>
                  <a href={`tel:${phone}`}
                    className="p-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Hospitals */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Nearby Hospitals</h3>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </div>
            </div>
            <div className="space-y-3">
              {nearbyHospitals.map(({ name, distance, type, beds, emergency }) => (
                <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{name}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{distance}</span>
                      <span>·</span>
                      <span>{beds} beds available</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium">24/7</span>
                </div>
              ))}
            </div>
            {/* Simulated Map Placeholder */}
            <div className="mt-4 h-32 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-slate-500 dark:text-slate-400">Live map · 3 hospitals nearby</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Call Ambulance', icon: Activity, phone: '102', color: 'from-red-500 to-red-600' },
            { label: 'Police', icon: Shield, phone: '100', color: 'from-blue-600 to-blue-700' },
            { label: 'Fire Brigade', icon: AlertTriangle, phone: '101', color: 'from-orange-500 to-orange-600' },
          ].map(({ label, icon: Icon, phone, color }) => (
            <a key={label} href={`tel:${phone}`}
              className={`flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br ${color} text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all`}>
              <Icon className="w-6 h-6" />
              <span className="text-xs font-bold">{label}</span>
              <span className="text-xl font-extrabold">{phone}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
