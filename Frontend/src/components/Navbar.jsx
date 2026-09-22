import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Menu, X, Bell, Sun, Moon, User, LogOut,
  ChevronDown, ArrowRight, Sparkles, PhoneCall, Plus, Mic,
  Activity, Calendar, FileText, Pill, ShieldCheck, Brain
} from 'lucide-react';
import { cn } from '../lib/utils';
import logoImg from '../assets/logo.png';

const navLinks = [
  { label: 'Features', href: '/#features', icon: Sparkles },
  { label: 'Dashboard', href: '/dashboard', icon: Activity },
  { label: 'AI Assistant', href: '/ai-assistant', icon: Brain },
];

export default function Navbar({ isLoggedIn, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 py-2.5 sm:py-3',
        scrolled ? 'pt-2' : 'pt-3 sm:pt-4'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            'flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300',
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm'
              : 'bg-white/70 backdrop-blur-lg border border-slate-200/50 shadow-xs'
          )}
        >
          {/* Left Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="DigiCare Logo"
                className="w-8 h-8 rounded-full object-contain shadow-xs transition-transform group-hover:scale-105"
              />
              <span className="font-sans font-bold text-lg tracking-tight text-slate-900">
                Digi<span className="text-[#4CA0C0]">Care</span>
              </span>
            </Link>
          </div>

          {/* Center Nav Links with Medical Icons */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => {
                    if (link.href === '/#features') {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        const el = document.getElementById('features');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                    location.pathname === link.href
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls & "Register ->" Pill Button */}
          <div className="flex items-center gap-2">

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button
                  onClick={() => alert('Notifications:\n• Appointment confirmed with Dr. Jena\n• Lab results analyzed and ready\n• Scheduled medicine reminder in 30m')}
                  className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </button>

                {/* Profile Pill */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {user?.fullname?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 max-w-[100px] truncate hidden sm:inline">
                      {user?.fullname || user?.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1f1f23] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <User className="w-3.5 h-3.5" /> My Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Activity className="w-3.5 h-3.5" /> Health Dashboard
                        </Link>
                        <hr className="my-1 border-slate-100 dark:border-slate-800" />
                        <button
                          onClick={() => { onLogout(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-block px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>

                {/* "Register" Pill Button */}
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all shadow-xs"
                >
                  <span>Register</span>
                  <div className="w-4 h-4 rounded-full bg-white/20 dark:bg-slate-900/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <div className="p-4 space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {!isLoggedIn && (
                <div className="pt-2 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2 text-xs font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full"
                  >
                    Register →
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}