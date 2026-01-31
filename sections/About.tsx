
import React from 'react';
import { motion } from 'framer-motion';
import { useIdentity } from '../context/IdentityContext';

export const About: React.FC = () => {
  const { profileImage } = useIdentity();
  const intro = "I AM SHASWAT, A CSE AI ENGINEER AT JAIN UNIVERSITY. AS A 2ND YEAR FULL STACK DEVELOPER, I ARCHITECT INTELLIGENT SYSTEMS THAT BRIDGE THE GAP BETWEEN COMPLEX AI LOGIC AND PREMIUM USER EXPERIENCES.";
  const words = intro.split(" ");

  const expertise = [
    { 
      title: "AI & ML ENGINEERING", 
      desc: "Architecting predictive neural models with focus on large-scale data integrity and real-time inference." 
    },
    { 
      title: "FULL STACK ARCHITECTURE", 
      desc: "Engineering high-throughput backend systems paired with pixel-perfect, high-performance user interfaces." 
    }
  ];

  return (
    <section id="about" className="py-48 px-6 bg-[#0D0F12]/30 backdrop-blur-sm relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-6 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-500">01 / Biography</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">The <span className="text-cyan-500">Visionary</span> Node.</h3>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr_1.1fr] gap-16 xl:gap-24 items-start">
          
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.01, duration: 0.4 }}
                className="text-2xl md:text-4xl font-bold text-white/90 leading-[1.1] tracking-tight hover:text-cyan-400 transition-colors cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group lg:mt-12"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl z-20 bg-[#161B22] transition-all duration-700 group-hover:border-cyan-500/40">
              <div className="ui-scan-line"></div>
              <div className="ui-scan-overlay"></div>
              <img 
                src={profileImage} 
                alt="Shaswat Professional Avatar" 
                className="w-full h-full object-cover brightness-110 opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            </div>
            <div className="absolute -inset-6 border border-white/5 rounded-[3rem] -z-10 group-hover:border-cyan-500/10 transition-colors duration-700"></div>
            
            <div className="absolute -bottom-4 -right-4 z-30 bg-black/80 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500/80">Active Protocol</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 lg:mt-24"
          >
            {expertise.map((item, idx) => (
              <div key={idx} className="group bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl hover:border-cyan-500/20 transition-all shadow-2xl hover:-translate-y-1 duration-500">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-cyan-500 mb-4">
                  {item.title}
                </h4>
                <p className="text-lg font-medium text-gray-400 group-hover:text-white leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
            
            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full"></div>
              <p className="text-cyan-500 uppercase text-[9px] tracking-[0.4em] font-black mb-3">Core Base</p>
              <h3 className="text-xl font-bold text-white uppercase leading-tight">
                JAIN UNIVERSITY
                <br/>
                <span className="text-xs font-light text-gray-500 tracking-[0.1em] mt-1 block group-hover:text-cyan-400/60 transition-colors uppercase">CSE AI • Season 2</span>
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
