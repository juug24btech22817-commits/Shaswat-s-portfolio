
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44-1.44-.645-1.44-1.44.645-1.44 1.44-1.44z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Partnership / Internship',
    message: ''
  });

  useEffect(() => {
    const handleTrigger = () => {
      setFormData(prev => ({ ...prev, reason: 'Partnership / Internship' }));
      if (formRef.current) {
        gsap.fromTo(formRef.current, 
          { borderColor: 'rgba(6, 182, 212, 0)' },
          { borderColor: 'rgba(6, 182, 212, 1)', duration: 0.5, yoyo: true, repeat: 3 }
        );
      }
    };

    window.addEventListener('trigger-hiring-mode', handleTrigger);
    return () => window.removeEventListener('trigger-hiring-mode', handleTrigger);
  }, []);

  useEffect(() => {
    if (logEndRef.current && formState === 'loading') {
      logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [logs, formState]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setLogs([]);
    setErrorMessage('');
    
    addLog("INITIATING NEURAL UPLINK...");
    await new Promise(r => setTimeout(r, 600));
    addLog("ENCRYPTING PACKETS...");
    await new Promise(r => setTimeout(r, 800));
    addLog("HANDSHAKING WITH GATEWAY...");

    try {
      const response = await fetch('http://127.0.0.1:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addLog("TRANSMISSION DELIVERED.");
        setFormState('success');
        setFormData({ name: '', email: '', reason: 'Partnership / Internship', message: '' });
      } else {
        setFormState('error');
        setErrorMessage('Gateway rejected signal.');
      }
    } catch (err) {
      addLog("GATEWAY TIMEOUT.");
      setFormState('error');
      setErrorMessage('Backend Offline.');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('shaswatshaswat620@gmail.com');
  };

  return (
    <section id="contact" className="py-48 px-6 relative bg-transparent">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/[0.03] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-500 block mb-6">04 / Contact Node</span>
          <h3 className="text-5xl md:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter text-white">
            ESTABLISH <br/><span className="text-cyan-500">SYNC.</span>
          </h3>
          
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6 group cursor-pointer" onClick={copyEmail}>
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-2xl">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <p className="text-[10px] text-cyan-500/50 uppercase tracking-[0.4em] font-black mb-1">Official Relay</p>
                <p className="text-white group-hover:text-cyan-400 transition-colors font-medium text-lg">shaswatshaswat620@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open('tel:+918867329989')}>
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-2xl">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <p className="text-[10px] text-cyan-500/50 uppercase tracking-[0.4em] font-black mb-1">Direct Line</p>
                <p className="text-white group-hover:text-cyan-400 transition-colors font-medium text-lg">+91 88673 29989</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-6">
            <a href="https://github.com/juug24btech22817-commits" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/30 transition-all shadow-xl group">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/shaswat-shaswat-1b094b378/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#0077b5] hover:border-cyan-500/30 transition-all shadow-xl group">
              <LinkedInIcon />
            </a>
            <a href="https://www.instagram.com/_.shaswat__?igsh=MTFueml0ODExZzI3aA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#e4405f] hover:border-cyan-500/30 transition-all shadow-xl group">
              <InstagramIcon />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div ref={formRef} className="relative p-10 md:p-14 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-cyan-500/20">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-24 text-center">
                  <div className="w-24 h-24 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-5xl mb-8 animate-pulse border border-cyan-500/20">✓</div>
                  <h4 className="text-4xl font-bold mb-4 text-white">Signal Received</h4>
                  <p className="text-gray-500 text-lg">Transmission successfully delivered to the core node.</p>
                  <button onClick={() => setFormState('idle')} className="mt-12 text-[10px] uppercase tracking-[0.4em] text-cyan-500 font-black hover:text-white transition-colors">Send New Signal</button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-widest text-cyan-500/40 font-black ml-4">Identity</p>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-6 py-5 focus:border-cyan-500/50 transition-all text-sm outline-none placeholder:text-gray-700 text-white" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-widest text-cyan-500/40 font-black ml-4">Channel</p>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-6 py-5 focus:border-cyan-500/50 transition-all text-sm outline-none placeholder:text-gray-700 text-white" placeholder="Email Address" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-cyan-500/40 font-black ml-4">Mission Type</p>
                    <div className="relative">
                      <select value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-6 py-5 focus:border-cyan-500/50 transition-all text-sm outline-none appearance-none cursor-pointer text-white">
                        <option className="bg-[#0D0F12]">Partnership / Internship</option>
                        <option className="bg-[#0D0F12]">Project Collaboration</option>
                        <option className="bg-[#0D0F12]">General Inquiry</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500/50 text-xs">▼</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-cyan-500/40 font-black ml-4">Transmission Content</p>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-6 py-5 focus:border-cyan-500/50 transition-all text-sm outline-none resize-none placeholder:text-gray-700 text-white" placeholder="Enter your message here..."></textarea>
                  </div>
                  
                  {logs.length > 0 && (
                    <div className="bg-black/40 border border-white/5 rounded-[1.5rem] p-6 font-mono text-[10px]">
                      {logs.map((log, i) => <div key={i} className="text-cyan-500/60 mb-1">{log}</div>)}
                      <div ref={logEndRef} />
                    </div>
                  )}

                  <button type="submit" disabled={formState === 'loading'} className="py-6 rounded-[1.5rem] bg-cyan-500 text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-[0_10px_40px_rgba(6,182,212,0.2)] active:scale-[0.98] disabled:opacity-50">
                    {formState === 'loading' ? 'Transmitting...' : 'Establish Connection'}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
