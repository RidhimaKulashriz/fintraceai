import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  User, 
  ShieldAlert, 
  Activity, 
  ArrowRightLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  MoreVertical,
  Download,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileText,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AIService, FraudAnalysisResult, InvestigationReport } from '../services/aiService';
import { generateGraphData } from '../lib/data-generator';

const RiskMeter = ({ score }: { score: number }) => (
  <div className="relative w-full h-48 flex flex-col items-center justify-center">
    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="10"
        className="text-foreground/5"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray="251.2"
        strokeDashoffset={251.2 - (251.2 * score) / 100}
        strokeLinecap="round"
        className={cn(
          "transition-all duration-1000",
          score > 80 ? "text-fraud" : score > 50 ? "text-warning" : "text-primary"
        )}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-4xl font-bold tracking-tight">{score}</span>
      <span className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Risk Score</span>
    </div>
  </div>
);

const TransactionRow = ({ date, desc, amount, type, status }: { date: string, desc: string, amount: string, type: 'In' | 'Out', status: 'Flagged' | 'Cleared' }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-foreground/5 hover:bg-foreground/10 transition-all group">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        type === 'In' ? "bg-primary/10 text-primary" : "bg-fraud/10 text-fraud"
      )}>
        <ArrowRightLeft className={cn("w-5 h-5", type === 'Out' && "rotate-180")} />
      </div>
      <div>
        <p className="font-bold text-sm">{desc}</p>
        <p className="text-xs text-foreground/40">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={cn("font-bold text-sm", type === 'In' ? "text-primary" : "text-fraud")}>
        {type === 'In' ? '+' : '-'}{amount}
      </p>
      <div className={cn(
        "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1",
        status === 'Flagged' ? "bg-fraud/10 text-fraud" : "bg-primary/10 text-primary"
      )}>
        {status === 'Flagged' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
        {status}
      </div>
    </div>
  </div>
);

export default function InvestigationPanel() {
  const [searchQuery, setSearchQuery] = useState('ACC-8492-X');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FraudAnalysisResult | null>(null);
  const [report, setReport] = useState<InvestigationReport | null>(null);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { nodes, links } = generateGraphData(20, 30);
      const result = await AIService.analyzeTransactions(nodes, links);
      setAnalysis(result);
      
      const reportResult = await AIService.generateReport(nodes, links);
      setReport(reportResult);
    } catch (error) {
      console.error('AI Analysis Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Investigation Panel</h1>
          <p className="text-foreground/60">Deep dive into suspicious accounts and entities.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAIAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all neon-glow disabled:opacity-50 shadow-lg shadow-primary/20"
            aria-label="Run AI Deep Analysis"
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            AI Deep Analysis
          </motion.button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Enter Account ID..." 
              className="pl-10 pr-4 py-2 rounded-xl bg-card border border-border outline-none focus:border-primary/50 transition-all w-full md:w-48 lg:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all" aria-label="Download Report">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all" aria-label="Share Investigation">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Profile */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-1 space-y-8"
        >
          <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-border bg-card text-center">
            <div className="relative inline-block mb-6">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-24 h-24 rounded-3xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 neon-glow"
              >
                <User className="w-12 h-12" />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-fraud text-white shadow-lg">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">James Wilson</h2>
            <p className="text-sm text-foreground/40 font-mono mb-6">ACC-8492-X-9902</p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full bg-fraud/10 text-fraud text-xs font-bold border border-fraud/20">High Risk</span>
              <span className="px-3 py-1 rounded-full bg-foreground/5 text-foreground/60 text-xs font-bold border border-border">Personal Account</span>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-foreground/40" />
                <span>London, United Kingdom</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-foreground/40" />
                <span>+44 7700 900123</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-foreground/40" />
                <span>j.wilson@email.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-foreground/40" />
                <span>Member since Oct 2022</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-bold mb-6">Risk Assessment</h3>
            <RiskMeter score={85} />
            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl bg-fraud/5 border border-fraud/20">
                <p className="text-xs font-bold text-fraud uppercase tracking-widest mb-2">Primary Risk Factor</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Unusual cross-border transaction volume exceeding 400% of historical average.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                <p className="text-xs font-bold text-warning uppercase tracking-widest mb-2">Secondary Risk Factor</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Connection to known high-risk entity "Offshore Trust X".
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Transactions & AI Analysis */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-2 space-y-8"
        >
          {/* AI Explanation */}
          <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="w-24 h-24 text-primary/10" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-primary mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-lg font-bold">AI Investigation Summary</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">
                {analysis?.riskExplanations || (
                  "Our AI engine has identified a \"Layering\" pattern in this account. Funds are being received in small increments from multiple local accounts and then immediately transferred in large bulk sums to offshore jurisdictions."
                )}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Detected Patterns</h4>
                  <div className="flex flex-wrap gap-2">
                    {(analysis?.detectedPatterns || ['Layering Pattern', 'Structuring Detected', 'High Confidence']).map((pattern) => (
                      <div key={pattern} className="px-3 py-1.5 rounded-lg bg-card border border-border text-[10px] font-bold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-fraud" /> {pattern}
                      </div>
                    ))}
                  </div>
                </div>
                {report && (
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Key Insights</h4>
                    <ul className="space-y-2">
                      {report.insights.map((insight, i) => (
                        <li key={i} className="text-xs text-foreground/60 flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {report && (
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 text-sm font-bold mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    AI Generated Report
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed italic">
                    "{report.summary}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Recent Transaction History</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-foreground/5 text-xs font-bold hover:bg-foreground/10 transition-all">All</button>
                <button className="px-3 py-1.5 rounded-lg bg-fraud/10 text-fraud text-xs font-bold hover:bg-fraud/20 transition-all">Flagged</button>
              </div>
            </div>
            <div className="space-y-4">
              <TransactionRow date="Mar 28, 2026 • 14:22" desc="Transfer to Offshore Trust X" amount="$7,000.00" type="Out" status="Flagged" />
              <TransactionRow date="Mar 28, 2026 • 11:05" desc="Incoming: Crypto Exchange Z" amount="$4,500.00" type="In" status="Flagged" />
              <TransactionRow date="Mar 27, 2026 • 09:12" desc="ATM Withdrawal - London" amount="$500.00" type="Out" status="Cleared" />
              <TransactionRow date="Mar 26, 2026 • 16:45" desc="Incoming: Salary - Tech Corp" amount="$3,200.00" type="In" status="Cleared" />
              <TransactionRow date="Mar 25, 2026 • 10:30" desc="Transfer to Shell Corp A" amount="$12,000.00" type="Out" status="Flagged" />
              <TransactionRow date="Mar 24, 2026 • 13:15" desc="Incoming: Local Bank B" amount="$1,500.00" type="In" status="Cleared" />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 py-3 rounded-xl border border-border text-foreground/60 font-bold hover:bg-foreground/5 transition-all flex items-center justify-center gap-2"
            >
              Load More Transactions <ExternalLink className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
