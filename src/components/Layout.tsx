import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Network, 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Settings, 
  Menu, 
  X,
  Sun,
  Moon,
  LogOut,
  Bell
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

const SidebarItem = ({ icon: Icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
        active 
          ? "bg-primary/10 text-primary border border-primary/20 neon-glow" 
          : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
      )}
    >
      <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-foreground/40 group-hover:text-foreground")} />
      <span className="font-medium">{label}</span>
      {active && (
        <motion.div 
          layoutId="active-pill"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
        />
      )}
      {!active && (
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </Link>
  </motion.div>
);

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: Network, label: 'Graph Explorer', to: '/graph' },
    { icon: Search, label: 'Investigation', to: '/investigation' },
    { icon: MessageSquare, label: 'AI Copilot', to: '/copilot' },
    { icon: ShieldCheck, label: 'Blockchain Evidence', to: '/blockchain' },
    { icon: FileText, label: 'Case Reports', to: '/reports' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between px-2 py-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center neon-glow">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">FinTrace <span className="text-primary">AI</span></span>
            </div>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-foreground/5"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.to}
                {...item}
                active={location.pathname === item.to}
              />
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-foreground/60 hover:bg-foreground/5 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <Link 
              to="/"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-fraud/60 hover:bg-fraud/5 transition-colors mt-1"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-64"
      )}>
        {/* Navbar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="p-2 rounded-lg hover:bg-foreground/5 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-sm text-foreground/40 font-medium">
            <span>FinTrace AI</span>
            <span>/</span>
            <span className="text-foreground capitalize">{location.pathname.replace('/', '')}</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-lg hover:bg-foreground/5 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-fraud rounded-full border-2 border-card" />
            </button>
            <div className="h-8 w-px bg-border mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Admin Analyst</p>
                <p className="text-xs text-foreground/50">Level 4 Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold">AA</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
