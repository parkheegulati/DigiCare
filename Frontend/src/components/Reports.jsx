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
  Normal: { color: 'text-[#448361] bg-[#edf3ec] dark:bg-[#1c2c21] dark:text-[#4ade80]', icon: CheckCircle },
  Attention: { color: 'text-[#d9730d] bg-[#fbf3db] dark:bg-[#392e1e] dark:text-[#fbbf24]', icon: AlertTriangle },
  Critical: { color: 'text-[#c43838] bg-[#fdebec] dark:bg-[#361e1f] dark:text-[#f87171]', icon: AlertTriangle },
};

export default function Reports() {
  const [dragging, setDragging] = useState(false);
  const [activeChart, setActiveChart] = useState('bp');

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] pt-14 font-sans text-[#37352f] dark:text-[#e3e3e3]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-3xl font-extrabold text-[#37352f] dark:text-[#e3e3e3] mb-1">Medical Reports</h1>
          <p className="text-sm text-[#787774] dark:text-[#9b9b9b]">Upload, analyze, and track your health records over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Reports List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Upload Area */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); }}
              className={`border border-dashed rounded-md p-6 text-center transition-colors cursor-pointer ${
                dragging
                  ? 'border-[#37352f] bg-[#f7f6f3] dark:border-[#e3e3e3] dark:bg-[#252525]'
                  : 'border-[#e9e9e7] dark:border-[#2f2f2f] bg-[#f7f6f3] dark:bg-[#202020] hover:bg-[#efefed] dark:hover:bg-[#252525]'
              }`}>
              <div className="w-10 h-10 rounded bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="font-medium text-sm text-[#37352f] dark:text-[#e3e3e3] mb-0.5">Drop your reports here</p>
              <p className="text-xs text-[#787774] dark:text-[#9b9b9b]">or <span className="text-[#2383e2] hover:underline cursor-pointer">browse files</span> — PDF, PNG, JPG up to 20MB</p>
            </div>

            {/* Reports Table */}
            <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e9e9e7] dark:border-[#2f2f2f] flex items-center justify-between">
                <h2 className="font-semibold text-sm text-[#37352f] dark:text-[#e3e3e3]">Report History</h2>
                <span className="text-xs text-[#787774] bg-[#f7f6f3] dark:bg-[#252525] px-2 py-0.5 rounded border border-[#e9e9e7] dark:border-[#2f2f2f]">{reports.length} records</span>
              </div>
              <div className="divide-y divide-[#e9e9e7] dark:divide-[#2f2f2f]">
                {reports.map((r, i) => {
                  const { color, icon: StatusIcon } = statusConfig[r.status] || statusConfig.Normal;
                  return (
                    <motion.div key={r.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#f7f6f3] dark:hover:bg-[#252525] transition-colors group text-left">
                      <div className="w-8 h-8 rounded bg-[#e8f3ff] dark:bg-[#1e2d3d] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-[#2383e2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#37352f] dark:text-[#e3e3e3] text-sm">{r.name}</div>
                        <div className="text-xs text-[#787774] dark:text-[#9b9b9b]">{r.type} · {r.date} · {r.doctor}</div>
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${color}`}>
                        <StatusIcon className="w-3 h-3" />{r.status}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-[#e9e9e7] dark:hover:bg-[#2f2f2f] text-[#787774] transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-[#e9e9e7] dark:hover:bg-[#2f2f2f] text-[#787774] transition-colors">
                          <Download className="w-3.5 h-3.5" />
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
                { label: 'Total Reports', value: reports.length, icon: FileText, bg: 'bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919]' },
                { label: 'Attention', value: reports.filter(r => r.status === 'Attention').length, icon: AlertTriangle, bg: 'bg-[#fbf3db] text-[#d9730d] dark:bg-[#392e1e] dark:text-[#fbbf24]' },
                { label: 'Normal', value: reports.filter(r => r.status === 'Normal').length, icon: CheckCircle, bg: 'bg-[#edf3ec] text-[#448361] dark:bg-[#1c2c21] dark:text-[#4ade80]' },
                { label: 'This Month', value: 2, icon: Calendar, bg: 'bg-[#f7f6f3] text-[#37352f] dark:bg-[#252525] dark:text-[#e3e3e3]' },
              ].map(({ label, value, icon: Icon, bg }) => (
                <div key={label} className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-3 text-left">
                  <div className={`w-7 h-7 rounded ${bg} flex items-center justify-center mb-1.5`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xl font-bold text-[#37352f] dark:text-[#e3e3e3]">{value}</div>
                  <div className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">{label}</div>
                </div>
              ))}
            </div>

            {/* Chart Toggle */}
            <div className="bg-white dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 text-left">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#37352f] dark:text-[#e3e3e3] text-xs">Health Trends</h3>
                <div className="flex rounded border border-[#e9e9e7] dark:border-[#2f2f2f] overflow-hidden text-xs">
                  <button onClick={() => setActiveChart('bp')}
                    className={`px-2.5 py-0.5 font-medium transition-colors ${activeChart === 'bp' ? 'bg-[#37352f] text-white dark:bg-[#e3e3e3] dark:text-[#191919]' : 'text-[#787774] hover:bg-[#f7f6f3] dark:hover:bg-[#252525]'}`}>BP</button>
                  <button onClick={() => setActiveChart('sugar')}
                    className={`px-2.5 py-0.5 font-medium transition-colors ${activeChart === 'sugar' ? 'bg-[#37352f] text-white dark:bg-[#e3e3e3] dark:text-[#191919]' : 'text-[#787774] hover:bg-[#f7f6f3] dark:hover:bg-[#252525]'}`}>Sugar</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                {activeChart === 'bp' ? (
                  <LineChart data={bpData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9e9e7" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#787774' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#787774' }} axisLine={false} tickLine={false} domain={[60, 150]} />
                    <Tooltip contentStyle={{ borderRadius: 4, border: '1px solid #e9e9e7', fontSize: 11 }} />
                    <ReferenceLine y={120} stroke="#eb5757" strokeDasharray="4 4" strokeOpacity={0.5} />
                    <Line type="monotone" dataKey="systolic" stroke="#37352f" strokeWidth={2} dot={{ r: 3 }} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#2383e2" strokeWidth={2} dot={{ r: 3 }} name="Diastolic" />
                  </LineChart>
                ) : (
                  <LineChart data={sugarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9e9e7" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#787774' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#787774' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 4, border: '1px solid #e9e9e7', fontSize: 11 }} />
                    <ReferenceLine y={100} stroke="#eb5757" strokeDasharray="4 4" strokeOpacity={0.5} />
                    <Line type="monotone" dataKey="fasting" stroke="#37352f" strokeWidth={2} dot={{ r: 3 }} name="Fasting" />
                    <Line type="monotone" dataKey="ppbs" stroke="#d9730d" strokeWidth={2} dot={{ r: 3 }} name="Post-meal" />
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
