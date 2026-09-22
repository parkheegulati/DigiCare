import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import authBg from '../assets/auth-bg.png';
import logoImg from '../assets/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        toast.success('Account created! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1800);
      } else {
        const msg = data.error || data.message || 'Registration failed.';
        setError(msg);
        toast.error(msg);
      }
    } catch {
      const msg = 'Unable to connect. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const strength = formData.password.length >= 10 ? 'strong' : formData.password.length >= 6 ? 'medium' : 'weak';

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
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
            Create your account
          </h1>
          <p className="text-slate-600 text-xs font-medium">
            Start managing your health today — it's free
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 sm:p-8 text-left shadow-xl">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Account Created!</h3>
              <p className="text-slate-600 text-xs font-medium">Redirecting you to login...</p>
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-600 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text" name="fullname" value={formData.fullname} onChange={handleChange}
                      required placeholder="Dr. Jane Smith"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4CA0C0] transition-colors text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      required placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4CA0C0] transition-colors text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                      required placeholder="Min. 6 characters"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4CA0C0] transition-colors text-xs font-medium"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Password strength */}
                  {formData.password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        {['weak', 'medium', 'strong'].map((level, i) => (
                          <div key={level} className={`h-1 flex-1 rounded transition-colors ${
                            (strength === 'weak' && i === 0) ? 'bg-red-500' :
                            (strength === 'medium' && i <= 1) ? 'bg-amber-500' :
                            (strength === 'strong') ? 'bg-emerald-500' :
                            'bg-slate-200'
                          }`} />
                        ))}
                      </div>
                      <span className={`text-[11px] font-semibold ${
                        strength === 'strong' ? 'text-emerald-600' : strength === 'medium' ? 'text-amber-600' : 'text-red-600'
                      }`}>{strength}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4CA0C0] hover:bg-[#3988a7] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Create account <ArrowRight className="w-3.5 h-3.5" /></>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-slate-600 mt-5 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-[#4CA0C0] font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-[11px] text-[#787774] mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Register;