
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{ msg: string; type: 'info' | 'warn' | 'crit' }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const systemMessages: { msg: string; type: 'info' | 'warn' | 'crit' }[] = useMemo(() => [
    { msg: "CORE_SYSTEM.BOOT(PRIMARY_LINK)", type: 'info' },
    { msg: "ALLOCATING_NEURAL_NODES: [99.98% Parity]", type: 'info' },
    { msg: "HANDSHAKE: SHASWAT_BIOMETRIC_ID", type: 'warn' },
    { msg: "THROTTLING_LATENCY: <1ms", type: 'info' },
    { msg: "INJECTING_CYBER_ONYX_PIPELINE", type: 'info' },
    { msg: "WARNING: HIGH_ENTROPY_DETECTED", type: 'warn' },
    { msg: "NEURAL_SYNAPSE_CALIBRATION_COMPLETE", type: 'info' },
    { msg: "INITIATING_WELCOME_PROTOCOL...", type: 'info' },
    { msg: "CRITICAL: ARCHITECTURAL_OVERRIDE_ACTIVE", type: 'crit' },
    { msg: "BYPASSING_RESTRICTED_PROTOCOL_7G", type: 'crit' },
    { msg: "ESTABLISHING_VIRTUAL_PRESENCE...", type: 'info' },
    { msg: "UPLINK_SUCCESS: ACCESS_GRANTED", type: 'info' }
  ], []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 35,
        y: (e.clientY / window.innerHeight - 0.5) * 35,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setIsAuthorized(true);
          setTimeout(() => onComplete?.(), 1800);
          return 100;
        }
        
        if ([30, 60, 85, 95].includes(p)) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 120);
        }

        const jump = Math.random() > 0.92 ? 4 : 1;
        return p + jump > 100 ? 100 : p + jump;
      });
    }, 40);

    const logTimer = setInterval(() => {
      setLogs(prev => {
        const index = Math.floor(progress / (100 / systemMessages.length)) % systemMessages.length;
        const nextLog = systemMessages[index];
        if (prev.length > 0 && prev[prev.length - 1].msg === nextLog.msg) return prev;
        return [...prev, nextLog].slice(-7);
      });
    }, 380);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete, progress, systemMessages]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.15, filter: "brightness(4) blur(40px)" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-[100] bg-[#050607] flex flex-col items-center justify-center overflow-hidden transition-all duration-75 ${isGlitching ? 'invert-[0.05] grayscale-[0.2]' : ''}`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-1000 ${isAuthorized ? 'bg-cyan-500/5' : 'bg-transparent'}`} />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -150],
            }}
            transition={{ 
              duration: 2 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute bg-cyan-400/30 rounded-full blur-[1px]"
            style={{
              width: '1px',
              height: '1px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ 
          rotateX: -mousePos.y * 0.4, 
          rotateY: mousePos.x * 0.4,
          perspective: "1200px",
          transformStyle: "preserve-3d"
        }}
        className="relative flex flex-col items-center"
      >
        {/* Central Monolith & Welcome Text */}
        <div className="relative flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: progress > 15 ? 1 : 0, y: progress > 15 ? 0 : 20 }}
            className="mb-8 text-center"
          >
            <h1 className="text-white text-[10px] font-black uppercase tracking-[1em] mb-4 opacity-40">
              Welcome to
            </h1>
            <motion.div 
              animate={isGlitching ? { x: [-2, 2, -2], skewX: [0, 5, -5, 0] } : {}}
              className="relative"
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                SHASWAT<span className="text-cyan-500">'S</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-light text-gray-500 tracking-[0.4em] uppercase mt-2">
                Portfolio
              </h3>
            </motion.div>
          </motion.div>

          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Holographic Assembly */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-cyan-500/10 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full"
            />
            
            <motion.div 
              animate={{ 
                scale: isAuthorized ? [1, 1.2, 1] : [1, 1.05, 1],
                rotateY: [0, 360],
                boxShadow: isAuthorized 
                  ? "0 0 100px rgba(6,182,212,0.8)" 
                  : "0 0 40px rgba(6,182,212,0.2)"
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotateY: { duration: 15, repeat: Infinity, ease: "linear" }
              }}
              className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-[#0D1117] via-cyan-900 to-[#161B22] flex items-center justify-center border border-white/20 z-10 shadow-2xl"
            >
              <span className="text-5xl font-black text-white italic">S</span>
              <motion.div 
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/2 h-full bg-white/5 skew-x-12 blur-md"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Progress Module */}
        <div className="w-[400px] flex flex-col gap-6 relative z-20">
          <div className="flex justify-between items-end px-4">
            <div className="flex flex-col gap-1">
              <span className={`text-[9px] font-black tracking-[0.8em] uppercase transition-colors duration-500 ${isAuthorized ? 'text-cyan-400' : 'text-cyan-500/40'}`}>
                {isAuthorized ? 'Handshake Established' : 'System Calibration'}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white tracking-tighter tabular-nums italic">
                {progress}<span className="text-cyan-500 text-base ml-1">%</span>
              </span>
            </div>
          </div>

          <div className="w-full h-[3px] bg-white/[0.03] rounded-full overflow-hidden relative border border-white/5">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full bg-gradient-to-r from-blue-700 via-cyan-400 to-white relative ${isAuthorized ? 'shadow-[0_0_30px_rgba(6,182,212,1)]' : ''}`}
            />
          </div>
        </div>

        {/* Technical Logs Area */}
        <div className="mt-12 h-32 flex flex-col items-start justify-start overflow-hidden w-[500px] px-8 py-4 bg-black/40 border border-white/5 backdrop-blur-md rounded-[2rem]">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={log.msg + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1 - (logs.length - 1 - i) * 0.18, 
                  x: 0,
                }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em] mb-1.5"
              >
                <span className={
                  log.type === 'crit' ? 'text-red-500/80' : 
                  log.type === 'warn' ? 'text-yellow-500/80' : 
                  'text-cyan-500/50'
                }>[{log.type.charAt(0)}]</span>
                <span className="text-white/40">{log.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Global Interface Details */}
      <div className="absolute top-10 left-10 opacity-20 font-mono text-[8px] tracking-[0.4em] space-y-2">
        <p>TERMINAL: READY</p>
        <p>IDENT: SHASWAT_PRO</p>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 font-mono text-[8px] tracking-[0.4em]">
        <p>ESTABLISHING SECURE_SESSION</p>
      </div>

      <div className="ui-scan-line !opacity-20 !h-[2px]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]"></div>
    </motion.div>
  );
};
