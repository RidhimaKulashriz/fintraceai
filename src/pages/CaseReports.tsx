import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';

const ReportCard = ({ id, title, analyst, date, status, risk }: { id: string, title: string, analyst: string, date: string, status: 'Draft' | 'Final' | 'Reviewed', risk: 'High' | 'Medium' | 'Critical' }) => (
  <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group">
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:neon-glow transition-all">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">{title}</h4>
          <p className="text-xs text-foreground/40 font-mono">Report ID: #{id}</p>
        </div>
      </div>
      <button className="p-2 rounded-lg hover:bg-foreground/5">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="p-3 rounded-xl bg-foreground/5 border border-border">
        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Analyst</p>
        <p className="text-xs font-bold">{analyst}</p>
      </div>
      <div className="p-3 rounded-xl bg-foreground/5 border border-border">
        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Date</p>
        <p className="text-xs font-bold">{date}</p>
      </div>
    </div>

    <div className="flex items-center justify-between mb-6">
      <div className={cn(
        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
        status === 'Final' ? "bg-primary/10 text-primary" : status === 'Reviewed' ? "bg-warning/10 text-warning" : "bg-foreground/10 text-foreground/60"
      )}>
        {status === 'Final' ? <CheckCircle2 className="w-3 h-3" /> : status === 'Reviewed' ? <Eye className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
        {status}
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
        risk === 'Critical' ? "bg-fraud/10 text-fraud" : risk === 'High' ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
      )}>
        <AlertTriangle className="w-3 h-3" />
        {risk} Risk
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all neon-glow flex items-center justify-center gap-2">
        <Download className="w-4 h-4" /> Download PDF
      </button>
      <button className="p-2.5 rounded-xl border border-border hover:bg-foreground/5 transition-all">
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function CaseReports() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Reports</h1>
          <p className="text-foreground/60">Generate and manage detailed investigation summaries.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="pl-10 pr-4 py-2 rounded-xl bg-card border border-border outline-none focus:border-primary/50 transition-all w-64"
            />
          </div>
          <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all neon-glow flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Report
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ReportCard 
          id="REP-2026-001" 
          title="Wilson Account Investigation" 
          analyst="Sarah Chen" 
          date="Mar 28, 2026" 
          status="Final" 
          risk="Critical" 
        />
        <ReportCard 
          id="REP-2026-002" 
          title="Offshore Trust X Fund Flow" 
          analyst="James Wilson" 
          date="Mar 27, 2026" 
          status="Reviewed" 
          risk="High" 
        />
        <ReportCard 
          id="REP-2026-003" 
          title="Crypto Exchange Z Analysis" 
          analyst="Robert Fox" 
          date="Mar 26, 2026" 
          status="Draft" 
          risk="Medium" 
        />
        <ReportCard 
          id="REP-2026-004" 
          title="Shell Corp A Network Map" 
          analyst="Sarah Chen" 
          date="Mar 25, 2026" 
          status="Final" 
          risk="Critical" 
        />
        <ReportCard 
          id="REP-2026-005" 
          title="Local Bank B Audit" 
          analyst="James Wilson" 
          date="Mar 24, 2026" 
          status="Reviewed" 
          risk="High" 
        />
        <ReportCard 
          id="REP-2026-006" 
          title="Quarterly Fraud Summary" 
          analyst="Robert Fox" 
          date="Mar 23, 2026" 
          status="Final" 
          risk="Medium" 
        />
      </div>
    </div>
  );
}
