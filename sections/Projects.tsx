
import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_IMAGES } from '../constants/assets';

const projects = [
  {
    title: "SHASWAT'S ULTRA-PREMIUM PORTFOLIO",
    desc: "A sophisticated 3D scrollytelling architecture engineered with React Three Fiber, GSAP, and Gemini AI. This project serves as a masterclass in immersive UI, featuring real-time neural handshake protocols and high-performance shader animations to redefine digital identity.",
    image: PROFILE_IMAGES.projects.midnight,
    tags: ["Three.js", "React", "AI Integration", "GSAP"],
    accent: "from-cyan-500/20 to-blue-600/20",
    link: "https://shaswat-s-portfolio.vercel.app/"
  },
  {
    title: "THE LAND HUB",
    desc: "A comprehensive real estate discovery engine designed to simplify land acquisition through spatial intelligence. Integrated with advanced geospatial data and intuitive mapping interfaces, it empowers users to locate, evaluate, and acquire premium property parcels with unmatched clarity and efficiency.",
    image: PROFILE_IMAGES.projects.terra,
    tags: ["Real Estate", "Geospatial", "Spatial AI", "Node.js"],
    accent: "from-amber-500/20 to-orange-600/20"
  },
  {
    title: "HEALTHGUIDE AI",
    desc: "A personalized AI healthcare companion providing intelligent symptom analysis and wellness tracking. Engineered with advanced neural processing to deliver real-time health insights, automated diagnostic support, and precision wellness recommendations.",
    image: PROFILE_IMAGES.projects.healthguide,
    tags: ["Healthcare", "AI Integration", "Next.js", "Vercel"],
    accent: "from-emerald-500/20 to-cyan-600/20",
    link: "https://health-guide-ai-kappa.vercel.app/"
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-48 px-6 bg-transparent relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 bg-gradient-to-b from-cyan-500/30 via-cyan-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-500 mb-6">03 / Portfolio</h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500">Creations.</span>
              </h3>
            </motion.div>
            <p className="text-gray-500 max-w-xl text-lg font-light leading-relaxed">
              Architecture documentation and code reviews for my most significant engineering achievements. Engineered with <span className="text-cyan-400">precision</span> and <span className="text-white">intent</span>.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => project.link && window.open(project.link, '_blank')}
            >
              <div className="relative aspect-[4/5.5] rounded-[3rem] overflow-hidden mb-10 border border-white/5 bg-[#0D1117] shadow-2xl transition-all duration-700 group-hover:border-cyan-500/40 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                
                {/* Iridescent Metallic Shine Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 z-10 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform ease-out"></div>
                
                {/* Inner Glow/Shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-[5]"></div>
                
                <div className="ui-scan-line"></div>
                <div className="ui-scan-overlay opacity-10"></div>

                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-90 group-hover:scale-110 transition-all duration-[1.5s] ease-[0.16, 1, 0.3, 1]"
                />
                
                {/* Custom Gradient Overlay based on project accent */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-700`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 md:p-12 w-full z-10">
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md group-hover:text-white group-hover:border-cyan-500/40 group-hover:bg-cyan-500/20 transition-all duration-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4 tracking-tighter">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 text-base leading-relaxed opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 font-light line-clamp-3">
                    {project.desc}
                  </p>

                  {/* Conditionally render View Project for projects with a link */}
                  {project.link && (
                    <div className="mt-8 flex items-center gap-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                      <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em]">View Project</span>
                    </div>
                  )}
                </div>

                {/* Corner Metallic Accent for projects with a link */}
                {project.link && (
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center text-white text-xl shadow-2xl">
                      ↗
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em] font-black mb-10">End of Selected Archive</p>
          <div className="flex items-center justify-center gap-6">
            <div className="w-24 h-px bg-white/5"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
            <div className="w-24 h-px bg-white/5"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
