import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Clock, 
  ExternalLink, 
  Copy, 
  Search, 
  Filter, 
  RefreshCw,
  MoreVertical,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

const EvidenceCard = ({ id, hash, timestamp, caseId, status }: { id: string, hash: string, timestamp: string, caseId: string, status: 'Verified' | 'Pending' }) => (
  <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:neon-glow transition-all">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-sm">Evidence ID: {id}</h4>
          <p className="text-xs text-foreground/40">Case Reference: #{caseId}</p>
        </div>
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
        status === 'Verified' ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
      )}>
        {status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <RefreshCw className="w-3 h-3 animate-spin" />}
        {status}
      </div>
    </div>

    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-foreground/5 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Blockchain Hash</span>
          <button className="text-primary hover:text-neon transition-colors">
            <Copy className="w-3 h-3" />
          </button>
        </div>
        <p className="text-xs font-mono text-foreground/80 break-all leading-relaxed">
          {hash}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-foreground/5 border border-border">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Timestamp</p>
          <div className="flex items-center gap-2 text-xs font-bold">
            <Clock className="w-3 h-3 text-primary" />
            {timestamp}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-foreground/5 border border-border">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Network</p>
          <div className="flex items-center gap-2 text-xs font-bold">
            <Database className="w-3 h-3 text-primary" />
            Ethereum Mainnet
          </div>
        </div>
      </div>

      <button className="w-full py-3 rounded-xl border border-border text-foreground/60 font-bold hover:bg-foreground/5 transition-all flex items-center justify-center gap-2 text-sm">
        View on Explorer <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function BlockchainEvidence() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Evidence</h1>
          <p className="text-foreground/60">Immutable audit trails and fraud proof records.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search hash or Case ID..." 
              className="pl-10 pr-4 py-2 rounded-xl bg-card border border-border outline-none focus:border-primary/50 transition-all w-64"
            />
          </div>
          <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">12,482</p>
            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Verified Proofs</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Evidence Integrity</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">4.2 TB</p>
            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Secured Data</p>
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EvidenceCard 
          id="EVD-99021" 
          hash="0x7d9f2a8b3c4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e" 
          timestamp="Mar 28, 2026 • 14:22:05" 
          caseId="8492" 
          status="Verified" 
        />
        <EvidenceCard 
          id="EVD-99022" 
          hash="0x2a8b3c4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e7d9f" 
          timestamp="Mar 28, 2026 • 11:05:12" 
          caseId="8491" 
          status="Verified" 
        />
        <EvidenceCard 
          id="EVD-99023" 
          hash="0x4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e7d9f2a8b3c" 
          timestamp="Mar 28, 2026 • 09:12:45" 
          caseId="8490" 
          status="Pending" 
        />
        <EvidenceCard 
          id="EVD-99024" 
          hash="0x6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e7d9f2a8b3c4e5f" 
          timestamp="Mar 27, 2026 • 16:45:30" 
          caseId="8489" 
          status="Verified" 
        />
        <EvidenceCard 
          id="EVD-99025" 
          hash="0x8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e7d9f2a8b3c4e5f6g7h" 
          timestamp="Mar 27, 2026 • 10:30:15" 
          caseId="8488" 
          status="Verified" 
        />
        <EvidenceCard 
          id="EVD-99026" 
          hash="0x0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e7d9f2a8b3c4e5f6g7h8i9j" 
          timestamp="Mar 26, 2026 • 13:15:00" 
          caseId="8487" 
          status="Verified" 
        />
      </div>
    </div>
  );
}
