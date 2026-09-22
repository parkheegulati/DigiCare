import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Heart, TrendingUp, Droplets, Moon, Target,
  Calendar, Award, Brain, ArrowUpRight, ArrowDownRight, ShieldCheck, Download
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

const weeklyVitals = [
  { day: 'Mon', heartRate: 72, sysBP: 118, diaBP: 78, sugar: 95, sleep: 7.2 },
  { day: 'Tue', heartRate: 78, sysBP: 122, diaBP: 82, sugar: 102, sleep: 6.8 },
  { day: 'Wed', heartRate: 70, sysBP: 115, diaBP: 75, sugar: 88, sleep: 8.0 },
  { day: 'Thu', heartRate: 82, sysBP: 130, diaBP: 85, sugar: 110, sleep: 6.5 },
  { day: 'Fri', heartRate: 75, sysBP: 120, diaBP: 80, sugar: 98, sleep: 7.5 },
  { day: 'Sat', heartRate: 68, sysBP: 112, diaBP: 74, sugar: 90, sleep: 8.5 },
  { day: 'Sun', heartRate: 74, sysBP: 118, diaBP: 78, sugar: 94, sleep: 7.8 },
];

const monthlyTrends = [
  { week: 'Week 1', heartAvg: 73, bpAvg: 119, sugarAvg: 96 },
  { week: 'Week 2', heartAvg: 75, bpAvg: 121, sugarAvg: 99 },
  { week: 'Week 3', heartAvg: 71, bpAvg: 116, sugarAvg: 92 },
  { week: 'Week 4', heartAvg: 74, bpAvg: 118, sugarAvg: 95 },
];

export default function Analytics({ user }) {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-900 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" /> Real-time Vitals & AI Diagnostics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Health Analytics & Vitals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Comprehensive biometrics breakdown, trends, and predictive health insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert('Exporting Health Analytics Report (PDF)...')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Resting Heart Rate', value: '73 bpm', trend: '-2 bpm vs last week', isGood: true, icon: Heart, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' },
          { label: 'Blood Pressure', value: '118 / 78', trend: 'Optimal Range', isGood: true, icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Fasting Blood Glucose', value: '95 mg/dL', trend: 'Normal', isGood: true, icon: Droplets, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
          { label: 'Avg Sleep Duration', value: '7.5 hrs', trend: '+45 mins improved', isGood: true, icon: Moon, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
        ].map(({ label, value, trend, isGood, icon: Icon, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${isGood ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-50 text-amber-700'}`}>
                {trend}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mb-0.5">{value}</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heart Rate & BP Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Blood Pressure & Heart Rate</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Daily recordings synchronized from DigiCare Vitals</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> Sys BP</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Heart Rate</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weeklyVitals}>
              <defs>
                <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="sysBP" stroke="#2563eb" strokeWidth={2.5} fill="url(#bpGrad)" name="Systolic BP" />
              <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2.5} fill="url(#hrGrad)" name="Heart Rate" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Health Score breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">AI Health Risk Profile</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Based on continuous telemetry, sleep patterns, and medical history analysis.
            </p>

            <div className="space-y-4">
              {[
                { category: 'Cardiovascular Risk', score: 'Low (4%)', color: 'bg-emerald-500' },
                { category: 'Metabolic Stability', score: 'Optimal (96%)', color: 'bg-blue-500' },
                { category: 'Sleep Recovery Index', score: 'Good (88%)', color: 'bg-indigo-500' },
                { category: 'Stress & Fatigue', score: 'Moderate (24%)', color: 'bg-amber-500' },
              ].map(({ category, score, color }) => (
                <div key={category}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">{category}</span>
                    <span className="text-slate-900 dark:text-white">{score}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: score.replace(/\D/g, '') + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">
              <ShieldCheck className="w-4 h-4" /> Doctor AI Summary
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
              Your overall physical metrics are in the top 10% for your age group. Keep up 30 mins of daily cardio.
            </p>
          </div>
        </div>
      </div>

      {/* Glucose & Sleep Dual Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Blood Sugar vs Sleep Metrics</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Correlating sleep duration with fasting glucose response</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyVitals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="sugar" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Glucose (mg/dL)" />
            <Bar dataKey="sleep" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Sleep (Hours)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
