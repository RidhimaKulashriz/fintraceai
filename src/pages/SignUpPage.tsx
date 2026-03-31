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
  User,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign up
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
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center neon-glow">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">FinTrace <span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/40">Join the world's leading fraud investigation platform.</p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 ml-1">Institution</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Global Bank" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Work Email Address</label>
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
              <label className="text-sm font-bold text-white/60 ml-1">Password</label>
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

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xs text-white/40">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <p>I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
              </div>
              <div className="flex items-start gap-3 text-xs text-white/40">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <p>I confirm that I am an authorized employee of the financial institution listed above.</p>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary text-black rounded-2xl font-bold text-lg hover:bg-neon transition-all neon-glow flex items-center justify-center gap-2"
            >
              Create Account <ArrowRight className="w-5 h-5" />
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
          Already have an account? <Link to="/signin" className="text-primary font-bold hover:underline">Sign In</Link>
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
