import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldAlert, 
  Search, 
  FileText, 
  RefreshCw,
  MoreVertical,
  Terminal,
  Cpu
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AIService } from '../services/aiService';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SuggestionCard = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
  >
    <div className="flex items-center gap-2 text-primary mb-2">
      <Sparkles className="w-4 h-4" />
      <span className="text-[10px] font-bold uppercase tracking-widest">Suggested Query</span>
    </div>
    <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{text}</p>
  </button>
);

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello, I'm your FinTrace AI Copilot. I can help you investigate suspicious transaction patterns, analyze fund flows, and generate risk reports. What would you like to investigate today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await AIService.askCopilot(input, { currentView: 'Copilot Page' });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I encountered an error while processing your request. Please check your connection or try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Analyze the risk profile of account #8492",
    "Identify potential money laundering paths in the current graph",
    "Generate a summary of recent high-risk alerts",
    "What are the common fraud patterns detected this week?",
  ];

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center neon-glow">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Copilot</h1>
            <div className="text-foreground/60 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Intelligent Investigation Assistant
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4 max-w-3xl",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    msg.role === 'assistant' ? "bg-primary/10 text-primary" : "bg-foreground/10 text-foreground"
                  )}>
                    {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'assistant' 
                      ? "bg-foreground/5 border border-border" 
                      : "bg-primary text-white font-medium"
                  )}>
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <div className={cn(
                      "mt-2 text-[10px] opacity-40",
                      msg.role === 'user' ? "text-right" : ""
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center animate-pulse">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="p-4 rounded-2xl bg-foreground/5 border border-border flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card/50">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Copilot to investigate an account or pattern..."
                className="w-full bg-foreground/5 border border-border rounded-xl pl-4 pr-12 py-3 outline-none focus:border-primary/50 transition-all resize-none h-14"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all disabled:opacity-50 disabled:hover:bg-primary neon-glow"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-foreground/40 mt-2 text-center">
              FinTrace AI Copilot can make mistakes. Verify critical investigation data.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/60 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {suggestions.map((text, i) => (
                <SuggestionCard key={i} text={text} onClick={() => setInput(text)} />
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card flex-1">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/60 mb-6">Active Context</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-foreground/5 border border-border">
                <Terminal className="w-4 h-4 text-primary" />
                <div className="text-xs">
                  <p className="font-bold">Graph Data Loaded</p>
                  <p className="text-foreground/40">150 nodes, 420 edges</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-foreground/5 border border-border">
                <ShieldAlert className="w-4 h-4 text-fraud" />
                <div className="text-xs">
                  <p className="font-bold">High Risk Alert #8492</p>
                  <p className="text-foreground/40">Cross-border flow detected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-foreground/5 border border-border">
                <FileText className="w-4 h-4 text-warning" />
                <div className="text-xs">
                  <p className="font-bold">SAR Draft #12</p>
                  <p className="text-foreground/40">Pending analyst review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
