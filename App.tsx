
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Navbar } from './components/UI/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Scene } from './components/Canvas/Scene';
import { Loader } from './components/UI/Loader';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative bg-[#0D0F12] text-white overflow-x-hidden min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Suspense fallback={null}>
              <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <Scene />
                </Canvas>
              </div>

              <div className="relative z-10">
                <Navbar />
                
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <Experience />
                  <Projects />
                  <Contact />
                </main>
                
                <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-[0.4em] font-bold">
                  <p>© {new Date().getFullYear()} Shaswat • Engineering Excellence • Identity Verified</p>
                </footer>
              </div>

            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
