import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  Zap, 
  Network, 
  Cpu, 
  Lock, 
  FileText,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Step = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="relative p-10 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
    <div className="absolute top-6 right-6 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors">{number}</div>
    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:neon-glow transition-all">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/60 leading-relaxed">{desc}</p>
  </div>
);

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-primary selection:text-black">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center neon-glow">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">FinTrace <span className="text-primary">AI</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/technology" className="text-white/70 hover:text-primary transition-colors">Technology</Link>
              <Link to="/signin" className="text-white/70 hover:text-primary transition-colors">Sign In</Link>
              <Link to="/dashboard" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold hover:bg-neon transition-all neon-glow">
                Launch Platform
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">The Investigation Lifecycle</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
          >
            How FinTrace <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon">Secures Your Bank</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            A seamless, automated, and intelligent workflow designed to detect, investigate, and resolve fraud cases 
            faster than ever before.
          </motion.p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Step 
            number="01" 
            title="Data Ingestion" 
            desc="Securely ingest transaction data from core banking systems and external payment gateways in real-time."
            icon={Database}
          />
          <Step 
            number="02" 
            title="Risk Scoring" 
            desc="Our proprietary engine assigns a risk score to every transaction based on 500+ behavioral parameters."
            icon={Zap}
          />
          <Step 
            number="03" 
            title="Graph Mapping" 
            desc="Transactions are mapped into a global graph network to identify hidden connections and laundering paths."
            icon={Network}
          />
          <Step 
            number="04" 
            title="AI Investigation" 
            desc="Copilot analyzes high-risk nodes and provides natural language summaries of suspicious behavior."
            icon={Cpu}
          />
          <Step 
            number="05" 
            title="Evidence Locking" 
            desc="Investigation steps and findings are hashed and stored on an immutable blockchain ledger."
            icon={Lock}
          />
          <Step 
            number="06" 
            title="Case Resolution" 
            desc="Generate automated SAR reports and resolve cases with full audit trails and evidence integrity."
            icon={FileText}
          />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Traditional vs. FinTrace AI</h2>
            <p className="text-white/60 max-w-2xl mx-auto">See how we transform the investigation process.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl border border-white/5 bg-white/5">
              <h3 className="text-2xl font-bold mb-8 text-white/40">Traditional Systems</h3>
              <div className="space-y-6">
                {[
                  'Manual rule-based detection',
                  'High false positive rates (80%+)',
                  'Siloed data analysis',
                  'Days to investigate a single case',
                  'Vulnerable audit trails'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 rounded-3xl border border-primary/20 bg-primary/5 neon-glow">
              <h3 className="text-2xl font-bold mb-8 text-primary">FinTrace AI</h3>
              <div className="space-y-6">
                {[
                  'AI-powered behavioral detection',
                  'Low false positives (< 5%)',
                  'Global graph network analysis',
                  'Minutes to investigate a single case',
                  'Immutable blockchain evidence'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to secure your institution?</h2>
        <Link to="/signup" className="px-12 py-5 bg-primary text-black rounded-full font-bold text-xl hover:bg-neon transition-all neon-glow inline-flex items-center gap-2">
          Start Free Trial <ArrowRight className="w-6 h-6" />
        </Link>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">© 2026 FinTrace AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
