
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Secondary School Graduate (10th)",
    company: "Arvind International School",
    period: "Completed 2022",
    desc: "Established a robust academic foundation with a focus on fundamental sciences and logical reasoning.",
    tags: ["AISSE", "Foundation"]
  },
  {
    role: "Higher Secondary Graduate (12th)",
    company: "Deeksha Jnana Sweekar",
    period: "2022 - 2024",
    desc: "Specialized in PCMB, building the mathematical and scientific rigor required for high-end engineering.",
    tags: ["PCMB", "Pre-University"]
  },
  {
    role: "CSE AI Student (2nd Year)",
    company: "Jain University",
    period: "2024 - Present",
    desc: "Architecting the future of intelligence. Active in research and high-throughput full-stack systems.",
    tags: ["Academic", "AI Core", "Architect"]
  },
  {
    role: "Open Source Contributor",
    company: "GitHub Global",
    period: "2025 - Present",
    desc: "Engineering at the edge. Focusing on high-performance web architectures and neural UI components.",
    tags: ["React", "JavaScript", "OSS"]
  }
];

export const Experience: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
        }
      );
    }
  }, []);

  return (
    <section id="experience" className="py-48 px-6 bg-[#0D0F12]/20 backdrop-blur-[2px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-cyan-500 block mb-6">02 / Historical Log</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Career <span className="text-cyan-500">Timeline.</span>
          </h2>
        </motion.div>

        <div className="relative w-full max-w-5xl">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block"></div>
          <div ref={lineRef} className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent -translate-x-1/2 origin-top hidden md:block shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>

          <div className="flex flex-col gap-24">
            {experiences.map((exp, i) => (
              <div key={i} className={`relative flex items-center w-full ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-cyan-500 -translate-x-1/2 z-20 shadow-[0_0_20px_rgba(6,182,212,0.6)] hidden md:block"></div>
                
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full md:w-[46%] p-10 md:p-14 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-cyan-500/30 transition-all duration-700 group shadow-2xl relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">{exp.period}</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors tracking-tight">{exp.role}</h3>
                  <h4 className="text-gray-500 mb-8 font-medium text-lg uppercase tracking-[0.1em]">{exp.company}</h4>
                  <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light group-hover:text-gray-300 transition-colors">{exp.desc}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-5 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] uppercase font-black tracking-widest text-gray-500 group-hover:text-cyan-500 group-hover:border-cyan-500/20 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
