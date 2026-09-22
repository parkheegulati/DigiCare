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
    <div className="min-h-screen bg-white dark:bg-[#191919] pt-14 font-sans text-[#37352f] dark:text-[#e3e3e3]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#fdebec] dark:bg-[#361e1f] border border-[#fbd6d8] dark:border-[#542829] text-[#c43838] dark:text-[#f87171] text-xs font-medium mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            Emergency Response System
          </div>
          <h1 className="text-3xl font-extrabold text-[#37352f] dark:text-[#e3e3e3] mb-1">Emergency SOS</h1>
          <p className="text-sm text-[#787774] dark:text-[#9b9b9b]">One tap to alert emergency services and your contacts</p>
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
                    className="absolute inset-0 rounded-full bg-[#c43838] pointer-events-none"
                  />
                ))}
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={activateSOS}
              disabled={sosActive}
              className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center font-bold text-white transition-all select-none ${
                sosSent
                  ? 'bg-[#448361]'
                  : sosActive
                  ? 'bg-[#c43838] animate-pulse'
                  : 'bg-[#eb5757] hover:bg-[#c43838] cursor-pointer'
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
                  {!sosActive && <span className="text-xs font-normal opacity-85 mt-0.5">Tap to activate</span>}
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Status Tracker */}
        <AnimatePresence>
          {sosActive && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-5 mb-6 text-left">
              <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3] mb-3 text-sm">
                {sosSent ? '✅ Emergency services notified' : '🚨 Sending emergency alert...'}
              </h3>
              <div className="space-y-2.5">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      i < currentStep || sosSent ? 'bg-[#448361]' : i === currentStep ? 'bg-[#c43838] animate-pulse' : 'bg-[#e9e9e7] dark:bg-[#2f2f2f]'
                    }`}>
                      {(i < currentStep || sosSent)
                        ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      }
                    </div>
                    <span className={`text-xs ${i <= currentStep || sosSent ? 'text-[#37352f] dark:text-[#e3e3e3] font-medium' : 'text-[#787774]'}`}>{step}</span>
                  </div>
                ))}
              </div>
              {sosSent && (
                <button onClick={() => { setSosActive(false); setSosSent(false); setCurrentStep(-1); }}
                  className="mt-4 w-full py-2 rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#787774] dark:text-[#9b9b9b] hover:bg-[#efefed] dark:hover:bg-[#252525] transition-colors">
                  Cancel Emergency
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {/* Emergency Contacts */}
          <div className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-[#37352f] dark:text-[#e3e3e3]">Emergency Contacts</h3>
              <button className="text-xs text-[#2383e2] hover:underline">+ Add</button>
            </div>
            <div className="space-y-2">
              {emergencyContacts.map(({ name, phone, relation, avatar }) => (
                <div key={name} className="flex items-center gap-3 p-2.5 rounded-md bg-white dark:bg-[#191919] border border-[#e9e9e7] dark:border-[#2f2f2f]">
                  <div className="w-8 h-8 rounded bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] flex items-center justify-center text-xs font-bold flex-shrink-0">{avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#37352f] dark:text-[#e3e3e3]">{name}</div>
                    <div className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">{relation} · {phone}</div>
                  </div>
                  <a href={`tel:${phone}`}
                    className="p-1.5 rounded bg-[#edf3ec] dark:bg-[#1c2c21] text-[#448361] hover:bg-[#d3e5d1] transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Hospitals */}
          <div className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-[#37352f] dark:text-[#e3e3e3]">Nearby Hospitals</h3>
              <div className="flex items-center gap-1 text-[11px] text-[#448361]">
                <span className="w-1.5 h-1.5 bg-[#448361] rounded-full animate-pulse" />
                Live
              </div>
            </div>
            <div className="space-y-2">
              {nearbyHospitals.map(({ name, distance, beds }) => (
                <div key={name} className="flex items-center gap-3 p-2.5 rounded-md bg-white dark:bg-[#191919] border border-[#e9e9e7] dark:border-[#2f2f2f]">
                  <div className="w-7 h-7 rounded bg-[#fdebec] dark:bg-[#361e1f] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-3.5 h-3.5 text-[#c43838]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#37352f] dark:text-[#e3e3e3]">{name}</div>
                    <div className="flex items-center gap-2 text-[11px] text-[#787774] dark:text-[#9b9b9b]">
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{distance}</span>
                      <span>·</span>
                      <span>{beds} beds available</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#fdebec] dark:bg-[#361e1f] text-[#c43838] dark:text-[#f87171] font-medium">24/7</span>
                </div>
              ))}
            </div>
            {/* Simulated Map Placeholder */}
            <div className="mt-3 h-28 rounded-md bg-white dark:bg-[#191919] border border-[#e9e9e7] dark:border-[#2f2f2f] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-5 h-5 text-[#2383e2] mx-auto mb-1" />
                <p className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">Live map · 3 hospitals nearby</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Call Ambulance', icon: Activity, phone: '102' },
            { label: 'Police', icon: Shield, phone: '100' },
            { label: 'Fire Brigade', icon: AlertTriangle, phone: '101' },
          ].map(({ label, icon: Icon, phone }) => (
            <a key={label} href={`tel:${phone}`}
              className="flex flex-col items-center justify-center gap-1 p-3.5 bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] rounded-md hover:bg-[#23211d] transition-colors">
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
              <span className="text-lg font-extrabold">{phone}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
