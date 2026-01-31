
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse, generateTechnicalArt } from '../../services/gemini';
import { useIdentity } from '../../context/IdentityContext';

interface Message {
  role: 'user' | 'ai';
  text?: string;
  image?: string;
}

export const AIAssistant: React.FC = () => {
  const { profileImage } = useIdentity();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! I'm Shaswat's AI Assistant. I've synced with your identity protocol. How can I assist your mission today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    if (userMsg.toLowerCase().includes('generate') || userMsg.toLowerCase().includes('visualize') || userMsg.toLowerCase().includes('show me')) {
      const art = await generateTechnicalArt(userMsg);
      if (art) {
        setMessages(prev => [...prev, { role: 'ai', text: "Neural engine output synthesized:", image: art }]);
        setIsTyping(false);
        return;
      }
    }

    const response = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response.text || "Neural link unstable." }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[350px] h-[550px] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-xs uppercase tracking-widest font-black text-cyan-500">Neural Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex flex-col gap-3`}>
                    {msg.text && (
                      <div className={`px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-lg ${
                        msg.role === 'user' 
                          ? 'bg-cyan-500 text-black font-bold' 
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    {msg.image && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                      >
                        <img src={msg.image} alt="Generated Visualization" className="w-full h-auto" />
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query the system..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 pr-14 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-cyan-500 text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                >
                  ↑
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full border-2 border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/30 relative group"
      >
        <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        {isOpen ? (
          <div className="w-full h-full flex items-center justify-center bg-black text-white text-2xl z-20 relative">✕</div>
        ) : (
          <img src={profileImage} alt="Neural Link" className="w-full h-full object-cover transition-all duration-500" />
        )}
      </motion.button>
    </div>
  );
};
