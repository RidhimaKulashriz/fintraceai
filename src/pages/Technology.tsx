import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Network, 
  ShieldCheck, 
  Database, 
  Lock, 
  Zap, 
  Globe, 
  BarChart3,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TechCard = ({ icon: Icon, title, desc, details }: { icon: any, title: string, desc: string, details: string[] }) => (
  <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:neon-glow transition-all">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/60 mb-8 leading-relaxed">{desc}</p>
    <ul className="space-y-3">
      {details.map((detail, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-white/40">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          {detail}
        </li>
      ))}
    </ul>
  </div>
);

export default function Technology() {
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
              <Link to="/how-it-works" className="text-white/70 hover:text-primary transition-colors">How It Works</Link>
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
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">The Architecture of Intelligence</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
          >
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon">Advanced Graph AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            FinTrace AI combines state-of-the-art graph neural networks, generative AI, and blockchain technology 
            to provide the most comprehensive fraud detection system ever built.
          </motion.p>
        </div>
      </section>

      {/* Tech Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <TechCard 
            icon={Network} 
            title="Graph Neural Networks" 
            desc="Our proprietary GNN architecture analyzes millions of nodes in real-time to detect hidden money laundering paths."
            details={[
              "Sub-millisecond graph traversal",
              "Pattern recognition across 50+ hops",
              "Automated community detection",
              "Temporal graph analysis"
            ]}
          />
          <TechCard 
            icon={Cpu} 
            title="Generative AI Copilot" 
            desc="Powered by custom-trained LLMs, our Copilot helps analysts investigate complex cases using natural language."
            details={[
              "Context-aware investigation summaries",
              "Automated SAR report generation",
              "Natural language graph querying",
              "Multi-jurisdictional compliance knowledge"
            ]}
          />
          <TechCard 
            icon={Lock} 
            title="Blockchain Evidence" 
            desc="Every investigation step is hashed and stored on an immutable ledger, ensuring evidence integrity for legal proceedings."
            details={[
              "Cryptographic proof of investigation",
              "Immutable audit trails",
              "Decentralized evidence storage",
              "Zero-knowledge proof verification"
            ]}
          />
        </div>
      </section>

      {/* Architecture Visualization */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Seamless Integration Layer</h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                FinTrace AI integrates directly with your existing core banking systems, payment gateways, and 
                compliance databases through our high-performance API layer.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Core Banking Connectors', desc: 'Native support for Temenos, Mambu, and FIS.' },
                  { title: 'Real-time Webhooks', desc: 'Instant alerts for suspicious transaction events.' },
                  { title: 'Secure Data Vault', desc: 'AES-256 encryption for all sensitive PII data.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30" />
              <div className="relative p-8 rounded-3xl border border-white/10 bg-card-dark/80 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Database className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-sm font-bold">Data Ingestion</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-sm font-bold">Risk Scoring</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Network className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-sm font-bold">Graph Analysis</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-sm font-bold">Evidence Storage</p>
                  </div>
                </div>
                <div className="mt-4 p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                  <Cpu className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="text-sm font-bold">AI Copilot Layer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to explore the future of fraud detection?</h2>
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
