
import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Java', category: 'Backend', level: 90, icon: '☕' },
  { name: 'Python', category: 'AI & Scripting', level: 85, icon: '🐍' },
  { name: 'React JS', category: 'Frontend', level: 95, icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', level: 88, icon: '🟢' },
  { name: 'JavaScript', category: 'Core Language', level: 92, icon: '📜' },
  { name: 'SQL/NoSQL', category: 'Database', level: 85, icon: '🗄️' },
  { name: 'C Programming', category: 'Systems', level: 82, icon: '💠' },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-40 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-cyan-500 border border-cyan-500/20 px-6 py-2 rounded-full bg-cyan-500/5 backdrop-blur-md">
              Capabilities
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
          >
            Toolkit of <span className="text-cyan-500 text-glow">Innovation.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            A high-performance stack engineered for low-latency systems and fluid architectural design.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group cursor-default transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.04] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] grayscale group-hover:grayscale-0">
                {skill.icon}
              </div>
              <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-cyan-400 transition-colors">{skill.name}</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black mb-8">{skill.category}</p>
              
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                ></motion.div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-[9px] font-mono text-cyan-500/30 uppercase tracking-widest">Efficiency Meta</span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
