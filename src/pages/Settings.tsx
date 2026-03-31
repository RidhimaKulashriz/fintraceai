import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Cpu, 
  Moon, 
  Sun,
  ChevronRight,
  Save
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

const SettingItem = ({ icon: Icon, title, desc, action }: { icon: any, title: string, desc: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-sm text-foreground/40">{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {action ? action : <ChevronRight className="w-5 h-5 text-foreground/20" />}
    </div>
  </div>
);

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-foreground/60">Manage your account and platform preferences.</p>
        </div>
        <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all neon-glow flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 px-2">Account Profile</h3>
        <div className="p-8 rounded-2xl border border-border bg-card flex items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 neon-glow">
              <User className="w-12 h-12" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-card border border-border text-primary hover:bg-foreground/5 transition-all shadow-lg">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-foreground/40 font-bold uppercase">Full Name</p>
              <p className="font-bold">Admin Analyst</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground/40 font-bold uppercase">Email Address</p>
              <p className="font-bold">analyst@fintrace.ai</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground/40 font-bold uppercase">Role</p>
              <p className="font-bold">Senior Fraud Investigator</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground/40 font-bold uppercase">Access Level</p>
              <p className="font-bold text-primary">Level 4 (Full Access)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 px-2">Platform Preferences</h3>
        <div className="space-y-4">
          <SettingItem 
            icon={theme === 'dark' ? Moon : Sun} 
            title="Appearance" 
            desc="Toggle between dark and light mode for the interface."
            action={
              <button 
                onClick={toggleTheme}
                className="w-14 h-8 rounded-full bg-foreground/10 p-1 relative transition-all"
              >
                <div className={cn(
                  "w-6 h-6 rounded-full bg-primary shadow-lg transition-all",
                  theme === 'dark' ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            }
          />
          <SettingItem 
            icon={Bell} 
            title="Notifications" 
            desc="Configure real-time alerts and email notifications."
          />
          <SettingItem 
            icon={Lock} 
            title="Security & Privacy" 
            desc="Manage 2FA, password, and session settings."
          />
          <SettingItem 
            icon={Globe} 
            title="Regional Compliance" 
            desc="Set jurisdiction and compliance reporting standards."
          />
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 px-2">Advanced Configuration</h3>
        <div className="space-y-4">
          <SettingItem 
            icon={Cpu} 
            title="AI Model Configuration" 
            desc="Select and tune the generative AI models for Copilot."
          />
          <SettingItem 
            icon={Database} 
            title="Data Integration" 
            desc="Manage core banking API keys and data ingestion sources."
          />
          <SettingItem 
            icon={Shield} 
            title="Blockchain Node" 
            desc="Configure the evidence storage network and node settings."
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-8 border-t border-border">
        <button className="w-full p-6 rounded-2xl border border-fraud/20 bg-fraud/5 text-fraud font-bold hover:bg-fraud/10 transition-all flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6" />
            <div className="text-left">
              <p className="text-lg">Deactivate Account</p>
              <p className="text-sm font-normal opacity-60">Permanently remove your access to the platform.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
