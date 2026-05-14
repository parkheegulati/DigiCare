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

const scoreData = [{ name: 'Health Score', value: 78, fill: '#2563EB' }];

export default function Dashboard({ user }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 pt-16 overflow-hidden font-inter">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 overflow-hidden"
      >
        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-3 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = location.pathname === href;
            return (
              <Link key={href} to={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Emergency SOS */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <Link to="/emergency"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <Phone className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-semibold">Emergency SOS</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-manrope text-xl font-bold text-slate-900 dark:text-white">
              Good morning, {user?.fullname?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Here's your health summary for today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Health Score', value: '92', unit: '/100', icon: Activity, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+3%' },
              { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'from-red-400 to-rose-500', bg: 'bg-red-50 dark:bg-red-900/20', trend: 'Normal' },
              { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: TrendingUp, color: 'from-teal-400 to-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', trend: 'Optimal' },
              { label: 'Blood Sugar', value: '94', unit: 'mg/dL', icon: Droplets, color: 'from-violet-400 to-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', trend: 'Normal' },
            ].map(({ label, value, unit, icon: Icon, color, bg, trend }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${bg} text-slate-700 dark:text-slate-300`}>{trend}</span>
                </div>
                <div className="font-manrope text-2xl font-bold text-slate-900 dark:text-white">
                  {value}<span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts + Appointments Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Analytics Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Weekly Health Trends</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Heart rate, BP & sugar levels</p>
                </div>
                <select className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-transparent text-slate-600 dark:text-slate-400">
                  <option>This Week</option>
                  <option>Last Month</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={healthData}>
                  <defs>
                    <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sugar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="heartRate" stroke="#2563EB" strokeWidth={2} fill="url(#hr)" name="Heart Rate" />
                  <Area type="monotone" dataKey="sugar" stroke="#14B8A6" strokeWidth={2} fill="url(#sugar)" name="Blood Sugar" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Health Score + Wellness */}
            <div className="space-y-4">
              {/* Health Score Radial */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Health Score</h3>
                <div className="relative">
                  <ResponsiveContainer width="100%" height={120}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" data={scoreData} startAngle={90} endAngle={-270}>
                      <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={8} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="font-manrope text-3xl font-bold text-blue-600">78</div>
                      <div className="text-xs text-slate-400">/ 100</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Good — Above average</p>
              </div>

              {/* Daily Wellness */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Daily Goals</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Steps', value: 7200, max: 10000, icon: Target, color: 'bg-blue-500' },
                    { label: 'Water', value: 1.5, max: 2.5, icon: Droplets, color: 'bg-cyan-500' },
                    { label: 'Sleep', value: 7, max: 8, icon: Moon, color: 'bg-violet-500' },
                  ].map(({ label, value, max, icon: Icon, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <Icon className="w-3 h-3" />{label}
                        </div>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{value} / {max}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${(value / max) * 100}%` }} />
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">Upcoming Appointments</h3>
                <Link to="/appointments" className="text-xs text-blue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map(({ doctor, specialty, time, date, avatar }) => (
                  <div key={doctor} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{doctor}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{specialty}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-slate-800 dark:text-slate-200">{time}</div>
                      <div className="text-xs text-slate-400">{date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medicines */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">Medicine Reminders</h3>
                <Link to="/medicine" className="text-xs text-blue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {medicines.map(({ name, time, taken, streak }) => (
                  <div key={name} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${taken ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${taken ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                      {taken ? <CheckCircle className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{time} · 🔥 {streak} day streak</div>
                    </div>
                    {!taken && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">Due</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">Recent Reports</h3>
                <Link to="/reports" className="text-xs text-blue-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {recentReports.map(({ name, date, status, color }) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{date}</div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{status}</span>
                  </div>
                ))}
              </div>
              <Link to="/reports"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-colors">
                + Upload new report
              </Link>
            </div>
          </div>

          {/* AI CTA */}
          <Link to="/ai-assistant"
            className="block bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white/80 text-sm font-medium">AI Health Assistant · Online</span>
                </div>
                <h3 className="font-manrope text-xl font-bold text-white mb-1">Talk to your AI doctor</h3>
                <p className="text-blue-100 text-sm">Describe symptoms, get instant analysis and recommendations.</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-7 h-7 text-white" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
