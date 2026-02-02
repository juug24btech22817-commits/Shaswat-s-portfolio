
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useIdentity } from '../context/IdentityContext';

gsap.registerPlugin(ScrollToPlugin);

export const Hero: React.FC = () => {
  const { profileImage, updateIdentity } = useIdentity();
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startBiometricSync = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Wait for scan animation
        setTimeout(() => {
          if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context?.drawImage(videoRef.current, 0, 0);
            const imageData = canvasRef.current.toDataURL('image/png');
            updateIdentity(imageData);
            
            // Cleanup
            stream.getTracks().forEach(track => track.stop());
            setIsScanning(false);
          }
        }, 3000);
      }
    } catch (err) {
      console.error("Biometric sync failed:", err);
      setIsScanning(false);
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.5, scrollTo: { y: '#contact', offsetY: 80 }, ease: "expo.inOut" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-transparent">
      <div className="max-w-7xl w-full flex flex-col items-center text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative group"
        >
          <div className="absolute -inset-8 bg-cyan-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative flex items-center gap-6 bg-white/[0.02] border border-white/5 backdrop-blur-3xl pl-3 pr-8 py-3 rounded-full shadow-2xl z-20 group-hover:border-cyan-500/40 transition-all duration-500">
            
            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-black relative">
              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div 
                    key="scanner"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black z-30"
                  >
                    <video ref={videoRef} className="w-full h-full object-cover grayscale" muted />
                    <div className="absolute inset-0 border-2 border-cyan-500 animate-pulse"></div>
                  </motion.div>
                ) : (
                  <motion.img 
                    key="profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={profileImage} 
                    alt="Shaswat Professional Profile" 
                    className="w-full h-full object-cover brightness-110 group-hover:scale-110 transition-transform duration-1000"
                  />
                )}
              </AnimatePresence>
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="text-left">
              <p className="text-[9px] uppercase tracking-[0.5em] font-black text-cyan-500/60 mb-1">
                {isScanning ? "Scanning Neural Map..." : "Identity Verified"}
              </p>
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  SHASWAT <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                </h2>
                <a 
                  href="https://github.com/juug24btech22817-commits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:text-white transition-all"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-6 leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          SHASWAT<span className="text-cyan-500">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-12"
        >
          Engineering the next frontier of <span className="text-white font-semibold">Artificial Intelligence</span> & <span className="text-white font-semibold">Full Stack Architecture</span>. 
          <br/><span className="text-[10px] uppercase tracking-[0.4em] text-cyan-500/50 font-black mt-4 block">Jain University • CSE AI • 2nd Year</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); gsap.to(window, { duration: 1.5, scrollTo: { y: '#projects', offsetY: 80 }, ease: "expo.inOut" }); }}
            className="px-12 py-6 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_40px_rgba(6,182,212,0.4)] hover:bg-white hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all active:scale-95"
          >
            Explore Systems
          </a>
          <button 
            onClick={scrollToContact}
            className="px-12 py-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md font-black uppercase tracking-[0.2em] text-[10px] text-white hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all active:scale-95"
          >
            Establish Contact
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 cursor-pointer group"
        onClick={() => gsap.to(window, { duration: 1.2, scrollTo: window.innerHeight, ease: "expo.inOut" })}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent group-hover:h-20 transition-all duration-500"></div>
        <span className="text-[8px] uppercase tracking-[0.6em] font-black text-white group-hover:text-cyan-400">Scroll Down</span>
      </motion.div>
    </section>
  );
};
