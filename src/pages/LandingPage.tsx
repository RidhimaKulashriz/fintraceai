import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  Zap, 
  Globe, 
  Database, 
  Cpu, 
  BarChart3,
  Network,
  Bell,
  FileText,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center neon-glow">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">FinTrace <span className="text-primary">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/technology" className="text-white/70 hover:text-primary transition-colors">Technology</Link>
          <Link to="/how-it-works" className="text-white/70 hover:text-primary transition-colors">How It Works</Link>
          <Link to="/signin" className="text-white/70 hover:text-primary transition-colors">Sign In</Link>
          <Link to="/dashboard" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold hover:bg-neon transition-all neon-glow">
            Launch Platform
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden bg-bg-dark">
    {/* Animated background glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">Next-Gen Fraud Intelligence</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 text-warning animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">Hackathon Demo Mode</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight"
        >
          Investigate Fund Flows with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon">AI-Powered Precision</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          FinTrace AI helps financial institutions detect complex fraud patterns using graph analytics, 
          generative AI copilots, and blockchain-secured evidence storage.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup" className="w-full sm:w-auto px-10 py-4 bg-primary text-black rounded-full font-bold text-lg hover:bg-neon transition-all neon-glow flex items-center justify-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/technology" className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            View Technology
          </Link>
        </motion.div>
      </div>
    </div>
    
    {/* Dashboard Preview with Parallax */}
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="max-w-6xl mx-auto mt-20 px-4"
    >
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl border border-white/10 bg-card-dark/80 backdrop-blur-xl p-2 shadow-2xl overflow-hidden"
      >
        <motion.img 
          src="https://picsum.photos/seed/fintech-dashboard/1920/1080" 
          alt="Dashboard Preview" 
          className="rounded-xl w-full h-auto opacity-80"
          referrerPolicy="no-referrer"
          style={{ y: "10%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
      </motion.div>
    </motion.div>
  </section>
);

const Stats = () => (
  <section className="py-20 bg-bg-dark border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Fraud Detected', value: '$4.2B+', icon: ShieldCheck },
          { label: 'Analysis Speed', value: '0.4ms', icon: Zap },
          { label: 'Accuracy Rate', value: '99.9%', icon: TrendingUp },
          { label: 'Institutions', value: '150+', icon: Globe },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-bg-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold text-white mb-4">Enterprise-Grade Investigation</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Built for the most demanding financial environments, combining speed, security, and intelligence.
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Graph Analytics',
            desc: 'Visualize complex transaction networks and identify hidden money laundering paths instantly.',
            icon: Network,
          },
          {
            title: 'AI Copilot',
            desc: 'Natural language interface for fraud analysts to query and investigate suspicious behavior.',
            icon: Cpu,
          },
          {
            title: 'Blockchain Evidence',
            desc: 'Immutable audit trails for every investigation, ensuring evidence integrity for legal proceedings.',
            icon: Lock,
          },
          {
            title: 'Real-time Alerts',
            desc: 'Proprietary risk scoring engine that flags suspicious transactions as they happen.',
            icon: Bell,
          },
          {
            title: 'Case Management',
            desc: 'Collaborative tools for investigation teams to manage and resolve fraud cases.',
            icon: FileText,
          },
          {
            title: 'Global Compliance',
            desc: 'Automated SAR reporting and compliance checks across multiple jurisdictions.',
            icon: Database,
          },
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:neon-glow transition-all">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-white/50 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-dark font-sans selection:bg-primary selection:text-black">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      
      {/* CTA Section */}
      <section className="py-24 bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full translate-y-1/2" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="p-12 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-xl">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to secure your institution?</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Join the world's leading banks using FinTrace AI to stay ahead of financial crime.
            </p>
            <Link to="/signup" className="px-12 py-5 bg-primary text-black rounded-full font-bold text-xl hover:bg-neon transition-all neon-glow inline-flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="py-12 border-t border-white/5 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShieldCheck className="text-primary w-6 h-6" />
            <span className="text-xl font-bold text-white">FinTrace <span className="text-primary">AI</span></span>
          </div>
          <p className="text-white/40 text-sm">© 2026 FinTrace AI. All rights reserved. Enterprise Grade Fraud Detection.</p>
        </div>
      </footer>
    </div>
  );
}
