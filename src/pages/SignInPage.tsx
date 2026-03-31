import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome, 
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign in
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 font-sans selection:bg-primary selection:text-black">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center neon-glow">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">FinTrace <span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/40">Enter your credentials to access the platform.</p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-white/60">Password</label>
                <button type="button" className="text-xs text-primary hover:underline font-bold">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white outline-none focus:border-primary/50 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary text-black rounded-2xl font-bold text-lg hover:bg-neon transition-all neon-glow flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Or Continue With</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href="/api/auth/google"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all font-bold text-sm"
            >
              <Chrome className="w-5 h-5" /> Google
            </a>
            <a 
              href="/api/auth/github"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all font-bold text-sm"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>

        <p className="text-center mt-8 text-white/40 text-sm">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-6 text-white/20 text-xs font-bold uppercase tracking-widest">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </motion.div>
    </div>
  );
}
