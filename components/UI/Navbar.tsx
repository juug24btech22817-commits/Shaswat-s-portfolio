
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1.5, scrollTo: { y: `#${id}`, offsetY: 80 }, ease: "expo.inOut" });
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-5 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'py-10 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter flex items-center gap-3 cursor-pointer group"
          onClick={() => gsap.to(window, { duration: 1.2, scrollTo: 0, ease: "expo.inOut" })}
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500 text-black flex items-center justify-center text-base font-black transition-transform group-hover:rotate-12 group-hover:bg-white">S</div>
          <span className="hidden sm:inline text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">SHASWAT.</span>
        </motion.div>

        <ul className="flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.li 
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="hidden md:block"
            >
              <button 
                onClick={() => scrollTo(link.id)}
                className="text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-cyan-400 transition-colors font-black"
              >
                {link.name}
              </button>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => scrollTo('contact')}
              className="px-7 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all shadow-xl active:scale-95"
            >
              HIRE NODE
            </button>
          </motion.li>
        </ul>
      </div>
    </nav>
  );
};
