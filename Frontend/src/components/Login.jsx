import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

import authBg from '../assets/auth-bg.png';
import logoImg from '../assets/logo.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Welcome back, ${data.user?.fullname || 'there'}! 👋`);
        onLogin(true, email, data.user);
        setTimeout(() => {
          if (data.user?.userType === 'doctor') navigate('/doctor-dashboard');
          else if (data.user?.userType === 'patient') navigate('/patient-dashboard');
          else navigate('/dashboard');
        }, 800);
      } else {
        const msg = data.message || data.error || 'Login failed. Please try again.';
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = 'Unable to connect to server. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 flex items-center justify-center px-4 pt-14 font-sans overflow-hidden">
      {/* Isometric Healthcare Ecosystem Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={authBg}
          alt="Healthcare Ecosystem Background"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '6px', fontFamily: 'Inter, sans-serif' } }} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md my-8"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <img src={logoImg} alt="DigiCare Logo" className="w-8 h-8 rounded-full object-contain" />
            <span className="font-bold text-xl text-slate-900">
              Digi<span className="text-[#4CA0C0]">Care</span>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#37352f] dark:text-[#e3e3e3] mb-1">
            Welcome back
          </h1>
          <p className="text-[#787774] dark:text-[#9b9b9b] text-xs">
            Sign in to your healthcare dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 sm:p-8 text-left shadow-xl">
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-600 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4CA0C0] transition-colors text-xs font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-xs text-[#4CA0C0] font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4CA0C0] transition-colors text-xs font-medium"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4CA0C0] hover:bg-[#3988a7] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-5 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#4CA0C0] font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-[#787774] mt-4">
          Protected by end-to-end encryption · HIPAA compliant
        </p>
      </motion.div>
    </div>
  );
};

Login.propTypes = { onLogin: PropTypes.func.isRequired };
export default Login;