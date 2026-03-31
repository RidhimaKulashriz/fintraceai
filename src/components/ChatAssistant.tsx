import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { AIService } from '../services/aiService';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your FinTrace AI Investigation Copilot. How can I help you trace fraud routes today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real app, we'd pass the current graph context here
      const response = await AIService.askCopilot(input, { currentView: 'Dashboard' });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '60px' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "w-[350px] md:w-[400px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 transition-all duration-300",
              isMinimized && "h-[60px]"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/20 rounded-lg text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Investigation Copilot</h3>
                  <p className="text-[10px] text-primary/60 font-medium uppercase tracking-wider">AI Powered</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-foreground/5 rounded-lg transition-colors text-foreground/40"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-foreground/5 rounded-lg transition-colors text-foreground/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        msg.role === 'user' ? "bg-primary/20 text-primary" : "bg-foreground/10 text-foreground/60"
                      )}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-foreground/5 text-foreground/80 rounded-tl-none border border-border"
                      )}>
                        {msg.content}
                        <p className="text-[10px] opacity-40 mt-1 text-right">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 mr-auto max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-foreground/10 text-foreground/60 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 rounded-2xl bg-foreground/5 border border-border rounded-tl-none">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-foreground/5">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about fraud routes..."
                      className="flex-1 bg-card border border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="p-2 bg-primary text-white rounded-xl disabled:opacity-50 hover:neon-glow transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {['Explain risk', 'Trace routes', 'Summarize'].map((hint) => (
                      <button
                        key={hint}
                        onClick={() => setInput(hint)}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-foreground/5 border border-border text-foreground/40 hover:text-primary hover:border-primary/30 transition-all whitespace-nowrap"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl neon-glow transition-all",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
