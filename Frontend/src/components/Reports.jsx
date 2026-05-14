import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, TrendingUp, AlertTriangle, CheckCircle, Download, Eye, Calendar, BarChart2 } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts';

const reports = [
  { id: 1, name: 'Complete Blood Count', date: 'May 10, 2025', type: 'Blood Test', status: 'Normal', doctor: 'Dr. Anjali Nair' },
  { id: 2, name: 'Lipid Profile', date: 'May 5, 2025', type: 'Blood Test', status: 'Attention', doctor: 'Dr. Rahul Verma' },
  { id: 3, name: 'Chest X-Ray', date: 'Apr 20, 2025', type: 'Radiology', status: 'Normal', doctor: 'Dr. Priya Sharma' },
  { id: 4, name: 'HbA1c Test', date: 'Apr 15, 2025', type: 'Diabetes', status: 'Normal', doctor: 'Dr. Anjali Nair' },
  { id: 5, name: 'Kidney Function Test', date: 'Mar 30, 2025', type: 'Blood Test', status: 'Normal', doctor: 'Dr. Vikram Singh' },
];

const bpData = [
  { date: 'Jan', systolic: 118, diastolic: 75 },
  { date: 'Feb', systolic: 122, diastolic: 80 },
  { date: 'Mar', systolic: 115, diastolic: 74 },
  { date: 'Apr', systolic: 130, diastolic: 85 },
  { date: 'May', systolic: 120, diastolic: 78 },
];

const sugarData = [
  { date: 'Jan', fasting: 92, ppbs: 140 },
  { date: 'Feb', fasting: 98, ppbs: 155 },
  { date: 'Mar', fasting: 88, ppbs: 132 },
  { date: 'Apr', fasting: 105, ppbs: 168 },
  { date: 'May', fasting: 94, ppbs: 145 },
];

const statusConfig = {
  Normal: { color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400', icon: CheckCircle },
  Attention: { color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400', icon: AlertTriangle },
  Critical: { color: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400', icon: AlertTriangle },
};

export default function Reports() {
  const [dragging, setDragging] = useState(false);
  const [activeChart, setActiveChart] = useState('bp');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 font-inter">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-manrope text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Medical Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Upload, analyze, and track your health records over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Reports List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Upload Area */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                dragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-slate-700 dark:text-slate-200 mb-1">Drop your reports here</p>
              <p className="text-sm text-slate-400">or <span className="text-blue-600 hover:underline cursor-pointer">browse files</span> — PDF, PNG, JPG up to 20MB</p>
            </div>

            {/* Reports Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 dark:text-white">Report History</h2>
                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{reports.length} records</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {reports.map((r, i) => {
                  const { color, icon: StatusIcon } = statusConfig[r.status] || statusConfig.Normal;
                  return (
                    <motion.div key={r.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white text-sm">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.type} · {r.date} · {r.doctor}</div>
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}>
                        <StatusIcon className="w-3 h-3" />{r.status}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Analytics */}
          <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Reports', value: reports.length, icon: FileText, color: 'from-blue-500 to-blue-600' },
                { label: 'Attention', value: reports.filter(r => r.status === 'Attention').length, icon: AlertTriangle, color: 'from-yellow-500 to-yellow-600' },
                { label: 'Normal', value: reports.filter(r => r.status === 'Normal').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
                { label: 'This Month', value: 2, icon: Calendar, color: 'from-violet-500 to-violet-600' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-manrope text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
                </div>
              ))}
            </div>

            {/* Chart Toggle */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Health Trends</h3>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 text-xs">
                  <button onClick={() => setActiveChart('bp')}
                    className={`px-3 py-1.5 font-medium transition-colors ${activeChart === 'bp' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>BP</button>
                  <button onClick={() => setActiveChart('sugar')}
                    className={`px-3 py-1.5 font-medium transition-colors ${activeChart === 'sugar' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Sugar</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                {activeChart === 'bp' ? (
                  <LineChart data={bpData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[60, 150]} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 11 }} />
                    <ReferenceLine y={120} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
                    <Line type="monotone" dataKey="systolic" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#14B8A6" strokeWidth={2} dot={{ r: 3 }} name="Diastolic" />
                  </LineChart>
                ) : (
                  <LineChart data={sugarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 11 }} />
                    <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
                    <Line type="monotone" dataKey="fasting" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Fasting" />
                    <Line type="monotone" dataKey="ppbs" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="Post-meal" />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
