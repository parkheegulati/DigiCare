import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Brain, Calendar, FileText, Pill,
  Phone, Activity, ChevronLeft, ChevronRight, Menu,
  TrendingUp, Heart, Droplets, Moon, Target,
  Bell, User, Clock, CheckCircle, AlertTriangle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';

const healthData = [
  { day: 'Mon', heartRate: 72, bp: 118, sugar: 95 },
  { day: 'Tue', heartRate: 78, bp: 122, sugar: 102 },
  { day: 'Wed', heartRate: 70, bp: 115, sugar: 88 },
  { day: 'Thu', heartRate: 82, bp: 130, sugar: 110 },
  { day: 'Fri', heartRate: 75, bp: 120, sugar: 98 },
  { day: 'Sat', heartRate: 68, bp: 112, sugar: 90 },
  { day: 'Sun', heartRate: 74, bp: 118, sugar: 94 },
];

const upcomingAppointments = [
  { doctor: 'Dr. Anjali Nair', specialty: 'Cardiologist', time: '10:30 AM', date: 'Today', avatar: 'AN', status: 'upcoming' },
  { doctor: 'Dr. Rahul Verma', specialty: 'Neurologist', time: '2:00 PM', date: 'Tomorrow', avatar: 'RV', status: 'upcoming' },
  { doctor: 'Dr. Priya Sharma', specialty: 'General Physician', time: '11:00 AM', date: 'May 18', avatar: 'PS', status: 'scheduled' },
];

const medicines = [
  { name: 'Metformin 500mg', time: '8:00 AM', taken: true, streak: 14 },
  { name: 'Amlodipine 5mg', time: '9:00 PM', taken: false, streak: 7 },
  { name: 'Vitamin D3', time: '1:00 PM', taken: true, streak: 30 },
];

const recentReports = [
  { name: 'Complete Blood Count', date: 'May 10', status: 'Normal', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
  { name: 'Lipid Profile', date: 'May 5', status: 'Attention', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
  { name: 'HbA1c Test', date: 'Apr 28', status: 'Normal', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Brain, label: 'AI Assistant', href: '/ai-assistant' },
  { icon: Calendar, label: 'Appointments', href: '/appointments' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Pill, label: 'Medicines', href: '/medicine' },
  { icon: Phone, label: 'Emergency', href: '/emergency' },
  { icon: Activity, label: 'Analytics', href: '/analytics' },
  { icon: User, label: 'Profile', href: '/profile' },
];

const scoreData = [{ name: 'Health Score', value: 78, fill: '#4CA0C0' }];

export default function Dashboard({ user }) {
  return (
    <div className="w-full min-h-full bg-white dark:bg-[#191919]">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#191919]/90 backdrop-blur-sm border-b border-[#e9e9e7] dark:border-[#2f2f2f] px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#37352f] dark:text-[#e3e3e3]">
              Good morning, {user?.fullname?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="text-xs text-[#787774] dark:text-[#9b9b9b]">Here's your health summary for today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#787774] dark:text-[#9b9b9b]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Health Score', value: '92', unit: '/100', icon: Activity, bg: 'bg-[#e8f3ff] text-[#2383e2] dark:bg-[#1e2d3d] dark:text-[#388bfd]', trend: '+3%' },
              { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, bg: 'bg-[#fdebec] text-[#c43838] dark:bg-[#361e1f] dark:text-[#f87171]', trend: 'Normal' },
              { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: TrendingUp, bg: 'bg-[#edf3ec] text-[#448361] dark:bg-[#1c2c21] dark:text-[#4ade80]', trend: 'Optimal' },
              { label: 'Blood Sugar', value: '94', unit: 'mg/dL', icon: Droplets, bg: 'bg-[#fbf3db] text-[#d9730d] dark:bg-[#392e1e] dark:text-[#fbbf24]', trend: 'Normal' },
            ].map(({ label, value, unit, icon: Icon, bg, trend }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${bg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${bg}`}>{trend}</span>
                </div>
                <div className="text-xl font-bold text-[#37352f] dark:text-[#e3e3e3]">
                  {value}<span className="text-xs font-normal text-[#787774] dark:text-[#9b9b9b] ml-1">{unit}</span>
                </div>
                <p className="text-xs text-[#787774] dark:text-[#9b9b9b] mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts + Appointments Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Analytics Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">Weekly Health Trends</h3>
                  <p className="text-xs text-[#787774] dark:text-[#9b9b9b]">Heart rate, BP & sugar levels</p>
                </div>
                <select className="text-xs border border-[#e9e9e7] dark:border-[#2f2f2f] rounded px-2 py-1 bg-[#f7f6f3] dark:bg-[#252525] text-[#37352f] dark:text-[#e3e3e3]">
                  <option>This Week</option>
                  <option>Last Month</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={healthData}>
                  <defs>
                    <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#37352f" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#37352f" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sugar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2383e2" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2383e2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9e9e7" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#787774' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#787774' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 6, border: '1px solid #e9e9e7', background: '#fff', fontSize: 12 }} />
                  <Area type="monotone" dataKey="heartRate" stroke="#37352f" strokeWidth={2} fill="url(#hr)" name="Heart Rate" />
                  <Area type="monotone" dataKey="sugar" stroke="#2383e2" strokeWidth={2} fill="url(#sugar)" name="Blood Sugar" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Health Score + Wellness */}
            <div className="space-y-4">
              {/* Health Score Radial */}
              <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 text-center">
                <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3] mb-1">Health Score</h3>
                <div className="relative">
                  <ResponsiveContainer width="100%" height={120}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" data={scoreData} startAngle={90} endAngle={-270}>
                      <RadialBar background={{ fill: '#f7f6f3' }} dataKey="value" cornerRadius={4} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-2xl font-bold text-[#37352f] dark:text-[#e3e3e3]">78</div>
                      <div className="text-xs text-[#787774]">/ 100</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#787774] dark:text-[#9b9b9b] mt-1">Good — Above average</p>
              </div>

              {/* Daily Wellness */}
              <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4">
                <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3] mb-2.5">Daily Goals</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Steps', value: 7200, max: 10000, icon: Target, color: 'bg-[#37352f] dark:bg-[#e3e3e3]' },
                    { label: 'Water', value: 1.5, max: 2.5, icon: Droplets, color: 'bg-[#2383e2]' },
                    { label: 'Sleep', value: 7, max: 8, icon: Moon, color: 'bg-[#787774]' },
                  ].map(({ label, value, max, icon: Icon, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1 text-[#787774] dark:text-[#9b9b9b]">
                          <Icon className="w-3 h-3" />{label}
                        </div>
                        <span className="text-[#37352f] dark:text-[#e3e3e3] font-medium">{value} / {max}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#f7f6f3] dark:bg-[#252525] rounded overflow-hidden">
                        <div className={`h-full ${color} rounded transition-all`} style={{ width: `${(value / max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appointments + Medicines + Reports Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appointments */}
            <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">Upcoming Appointments</h3>
                <Link to="/appointments" className="text-xs text-[#2383e2] hover:underline">View all</Link>
              </div>
              <div className="space-y-2">
                {upcomingAppointments.map(({ doctor, specialty, time, date, avatar }) => (
                  <div key={doctor} className="flex items-center gap-3 p-2.5 rounded-md bg-[#f7f6f3] dark:bg-[#252525] hover:bg-[#efefed] dark:hover:bg-[#2c2c2c] transition-colors">
                    <div className="w-8 h-8 rounded bg-[#37352f] dark:bg-[#e3e3e3] flex items-center justify-center text-white dark:text-[#191919] text-xs font-bold flex-shrink-0">{avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#37352f] dark:text-[#e3e3e3] truncate">{doctor}</div>
                      <div className="text-xs text-[#787774] dark:text-[#9b9b9b]">{specialty}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-[#37352f] dark:text-[#e3e3e3]">{time}</div>
                      <div className="text-xs text-[#787774] dark:text-[#9b9b9b]">{date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medicines */}
            <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">Medicine Reminders</h3>
                <Link to="/medicine" className="text-xs text-[#2383e2] hover:underline">View all</Link>
              </div>
              <div className="space-y-2">
                {medicines.map(({ name, time, taken, streak }) => (
                  <div key={name} className={`flex items-center gap-3 p-2.5 rounded-md border transition-colors ${taken ? 'bg-[#edf3ec] dark:bg-[#1c2c21] border-[#d3e5d1] dark:border-[#2b4431]' : 'bg-[#f7f6f3] dark:bg-[#252525] border-[#e9e9e7] dark:border-[#2f2f2f]'}`}>
                    <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${taken ? 'bg-[#448361] text-white' : 'bg-[#787774] text-white'}`}>
                      {taken ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#37352f] dark:text-[#e3e3e3] truncate">{name}</div>
                      <div className="text-xs text-[#787774] dark:text-[#9b9b9b]">{time} · 🔥 {streak} day streak</div>
                    </div>
                    {!taken && <span className="text-xs px-2 py-0.5 rounded bg-[#fbf3db] text-[#d9730d] dark:bg-[#392e1e] dark:text-[#fbbf24]">Due</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3]">Recent Reports</h3>
                <Link to="/reports" className="text-xs text-[#2383e2] hover:underline">View all</Link>
              </div>
              <div className="space-y-2">
                {recentReports.map(({ name, date, status }) => (
                  <div key={name} className="flex items-center gap-3 p-2.5 rounded-md bg-[#f7f6f3] dark:bg-[#252525] hover:bg-[#efefed] dark:hover:bg-[#2c2c2c] transition-colors cursor-pointer">
                    <div className="w-7 h-7 rounded bg-[#e8f3ff] dark:bg-[#1e2d3d] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-[#2383e2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#37352f] dark:text-[#e3e3e3] truncate">{name}</div>
                      <div className="text-xs text-[#787774] dark:text-[#9b9b9b]">{date}</div>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#edf3ec] text-[#448361] dark:bg-[#1c2c21] dark:text-[#4ade80]">{status}</span>
                  </div>
                ))}
              </div>
              <Link to="/reports"
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-md border border-dashed border-[#e9e9e7] dark:border-[#2f2f2f] text-xs text-[#787774] dark:text-[#9b9b9b] hover:border-[#37352f] hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition-colors">
                + Upload new report
              </Link>
            </div>
          </div>

          {/* AI CTA Callout */}
          <Link to="/ai-assistant"
            className="block bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md p-5 hover:bg-[#efefed] dark:hover:bg-[#252525] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-[#448361] rounded-full animate-pulse" />
                  <span className="text-[#787774] dark:text-[#9b9b9b] text-xs font-medium">AI Health Assistant · Online</span>
                </div>
                <h3 className="text-lg font-bold text-[#37352f] dark:text-[#e3e3e3] mb-1">Talk to your AI doctor</h3>
                <p className="text-[#787774] dark:text-[#9b9b9b] text-sm">Describe symptoms, get instant analysis and recommendations.</p>
              </div>
              <div className="w-10 h-10 rounded bg-[#37352f] dark:bg-[#e3e3e3] flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-white dark:text-[#191919]" />
              </div>
            </div>
          </Link>
        </div>
    </div>
  );
}
