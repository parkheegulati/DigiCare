import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Brain, Calendar, FileText, Pill,
  Phone, Activity, ChevronLeft, ChevronRight, User, ShieldCheck
} from 'lucide-react';

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

export default function DashboardLayout({ children, user }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#fafbfc] dark:bg-[#0f1115] pt-16 overflow-hidden font-sans">
      {/* Persistent Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-shrink-0 bg-white dark:bg-[#16181d] border-r border-slate-200/80 dark:border-slate-800 flex flex-col z-30 overflow-hidden shadow-xs"
      >
        {/* Collapse Toggle Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-200/60 dark:border-slate-800/80">
          {!collapsed && (
            <div className="flex items-center gap-2 px-1">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Care Portal
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                  active
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-xs whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Emergency SOS Button */}
        <div className="p-2.5 border-t border-slate-200/60 dark:border-slate-800/80">
          <Link
            to="/emergency"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
          >
            <Phone className="w-4 h-4 flex-shrink-0 animate-pulse" />
            {!collapsed && <span className="text-xs font-bold">Emergency SOS</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#fafbfc] dark:bg-[#0f1115] relative">
        {children}
      </main>
    </div>
  );
}
