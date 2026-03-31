import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  Activity, 
  ShieldAlert, 
  Clock, 
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { Skeleton } from '../lib/Skeleton';

import { CustomHeatMap } from '../components/CustomHeatMap';
import { generateHeatmapData } from '../lib/data-generator';

const xLabels = ['00h', '04h', '08h', '12h', '16h', '20h'];
const yLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const heatmapData = generateHeatmapData(xLabels, yLabels);

const data = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 900 },
  { name: '23:59', value: 700 },
];

const riskData = [
  { name: 'Low', value: 45, color: '#00C389' },
  { name: 'Medium', value: 25, color: '#F59E0B' },
  { name: 'High', value: 15, color: '#FF4D4F' },
  { name: 'Critical', value: 5, color: '#991B1B' },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: { title: string, value: string, change: string, icon: any, trend: 'up' | 'down' }) => (
  <motion.div 
    whileHover={{ scale: 1.03, y: -5 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:neon-glow transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg",
        trend === 'up' ? "text-primary bg-primary/10" : "text-fraud bg-fraud/10"
      )}>
        {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <h3 className="text-foreground/60 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold tracking-tight">{value}</p>
  </motion.div>
);

const RecentAlert = ({ id, type, risk, time }: { id: string, type: string, risk: 'High' | 'Medium' | 'Critical', time: string }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
    className="flex items-center justify-between p-4 rounded-xl border border-border bg-foreground/5 transition-all cursor-pointer group relative overflow-hidden"
  >
    {risk === 'Critical' && (
      <div className="absolute inset-0 bg-fraud/5 animate-pulse pointer-events-none" />
    )}
    <div className="flex items-center gap-4 relative z-10">
      <div className={cn(
        "w-2 h-10 rounded-full shadow-[0_0_8px_rgba(var(--color-rgb),0.5)]",
        risk === 'Critical' ? "bg-fraud shadow-fraud/50" : risk === 'High' ? "bg-warning shadow-warning/50" : "bg-primary shadow-primary/50"
      )} />
      <div>
        <p className="font-bold text-sm">Case #{id}</p>
        <p className="text-xs text-foreground/50">{type}</p>
      </div>
    </div>
    <div className="text-right relative z-10">
      <p className={cn(
        "text-xs font-bold uppercase tracking-wider mb-1",
        risk === 'Critical' ? "text-fraud" : risk === 'High' ? "text-warning" : "text-primary"
      )}>{risk} Risk</p>
      <div className="flex items-center gap-1 text-[10px] text-foreground/40">
        <Clock className="w-3 h-3" />
        {time}
      </div>
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-48 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-[400px] rounded-2xl" />
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-1 h-[400px] rounded-2xl" />
          <Skeleton className="lg:col-span-2 h-[400px] rounded-2xl" />
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Security Overview</h1>
          <p className="text-foreground/60">Real-time fraud detection and risk analysis.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-xl border border-border bg-card flex items-center gap-2 text-sm font-medium shadow-lg shadow-primary/5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,195,137,0.8)]" />
            Live System Status: <span className="text-primary font-bold">Operational</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all neon-glow shadow-lg shadow-primary/20"
            aria-label="Generate Security Report"
          >
            Generate Report
          </motion.button>
        </div>
      </motion.div>

      {/* Real-time Metrics Bar */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm"
      >
        <div className="text-center md:border-r border-border/50">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Risk Score</p>
          <p className="text-xl font-bold text-primary">24.8<span className="text-xs opacity-50 ml-1">/100</span></p>
        </div>
        <div className="text-center md:border-r border-border/50">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Analyzed</p>
          <p className="text-xl font-bold">12,482<span className="text-xs opacity-50 ml-1">TX/s</span></p>
        </div>
        <div className="text-center md:border-r border-border/50">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Anomalies</p>
          <p className="text-xl font-bold text-fraud">142<span className="text-xs opacity-50 ml-1">Today</span></p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Uptime</p>
          <p className="text-xl font-bold text-warning">99.99%</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard title="Total Transactions" value="1.2M" change="+12.5%" icon={Activity} trend="up" />
        <StatCard title="Suspicious Accounts" value="1,482" change="+4.2%" icon={Users} trend="up" />
        <StatCard title="Fraud Prevented" value="$12.8M" change="+18.3%" icon={ShieldAlert} trend="up" />
        <StatCard title="Avg Risk Score" value="24/100" change="-2.1%" icon={AlertTriangle} trend="down" />
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Activity Chart */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ borderColor: 'rgba(0, 195, 137, 0.3)' }}
          className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Transaction Velocity
            </h3>
            <select className="bg-foreground/5 border border-border rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C389" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00C389" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#00C389' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00C389" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ borderColor: 'rgba(255, 77, 79, 0.3)' }}
          className="p-6 rounded-2xl border border-border bg-card"
        >
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-fraud" />
            Risk Distribution
          </h3>
          <div className="h-[250px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {riskData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-foreground/60">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Recent Alerts */}
        <motion.div variants={itemVariants} className="lg:col-span-1 p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Alerts</h3>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <RecentAlert id="8492" type="Unusual Cross-border Flow" risk="Critical" time="2 mins ago" />
            <RecentAlert id="8491" type="Rapid Account Depletion" risk="High" time="15 mins ago" />
            <RecentAlert id="8490" type="New Device Login - High Value" risk="Medium" time="42 mins ago" />
            <RecentAlert id="8489" type="Multiple Failed Auth Attempts" risk="High" time="1 hour ago" />
          </div>
        </motion.div>

        {/* Fraud Activity Heatmap */}
        <motion.div variants={itemVariants} className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Fraud Activity Heatmap</h3>
              <p className="text-sm text-foreground/60">Temporal density of suspicious clusters.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-fraud" />
              <span className="text-xs font-bold text-foreground/40 uppercase">High Risk</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[400px] py-4">
              <CustomHeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                data={heatmapData}
                yLabelWidth={60}
                cellRender={(value) => value && `${value}%`}
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-foreground/5 border border-border text-center">
              <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Peak Time</p>
              <p className="text-sm font-bold">02:00 - 04:00</p>
            </div>
            <div className="p-3 rounded-xl bg-foreground/5 border border-border text-center">
              <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Hot Day</p>
              <p className="text-sm font-bold">Wednesday</p>
            </div>
            <div className="p-3 rounded-xl bg-foreground/5 border border-border text-center">
              <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Avg. Risk</p>
              <p className="text-sm font-bold text-warning">42.8%</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
