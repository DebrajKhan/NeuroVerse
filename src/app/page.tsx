"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import BrainCanvas from "@/components/BrainCanvas";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Section (0% - 5%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

  // Frontal Lobe Reveal (10% - 30%)
  const frontalOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.3, 0.35], [0, 1, 1, 0]);
  const frontalY = useTransform(scrollYProgress, [0.05, 0.1, 0.3, 0.35], [30, 0, 0, -30]);
  const frontalX = useTransform(scrollYProgress, [0.05, 0.1, 0.3, 0.35], [-50, 0, 0, -50]);
  
  // Temporal Lobe Reveal (30% - 50%)
  const temporalOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
  const temporalY = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [30, 0, 0, -30]);
  const temporalX = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [50, 0, 0, 50]);
  
  // Occipital Lobe Reveal (50% - 70%)
  const occipitalOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const occipitalY = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [30, 0, 0, -30]);
  const occipitalX = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [-50, 0, 0, -50]);
  
  // Parietal Lobe Reveal (70% - 90%)
  const parietalOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 0.95], [0, 1, 1, 0]);
  const parietalY = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 0.95], [30, 0, 0, -30]);
  const parietalX = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 0.95], [50, 0, 0, 50]);

  return (
    <main className="min-h-screen flex flex-col relative w-full selection:bg-[var(--color-focus-start)] selection:text-white bg-[#030305]">
      <Navigation />
      
      {/* The Scroll Narrative Hybrid Engine */}
      <section ref={containerRef} className="relative w-full h-[400vh]">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
          {/* Subtle background radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none" />
          
          <div className="w-full h-full max-w-7xl mx-auto absolute inset-0 z-0">
            <BrainCanvas scrollProgress={scrollYProgress} />
          </div>

          {/* Hero Heading (Phase 1) */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }} 
            className="absolute top-24 md:top-32 w-full text-center z-10 pointer-events-none px-4"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-lg">
              <span className="font-[family-name:var(--font-cormorant)] italic font-normal">Welcome</span> <span className="font-[family-name:var(--font-bodoni)]">To</span> <span className="font-[family-name:var(--font-dm-serif)] font-bold tracking-tight">NeuroVerse</span>
            </h1>
          </motion.div>

          {/* Narrative Text Overlays synchronized with Canvas rotation (Phase 2) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            
            {/* Frontal Lobe */}
            <motion.h2 
              style={{ opacity: frontalOpacity, y: frontalY }} 
              className="absolute top-24 w-full text-center text-4xl md:text-6xl text-white tracking-wide"
            >
              <span className="font-[family-name:var(--font-cormorant)] italic font-normal">Frontal</span> <span className="font-[family-name:var(--font-dm-serif)] font-bold tracking-tight">Lobe</span>
            </motion.h2>
            <motion.div 
              style={{ opacity: frontalOpacity, x: frontalX }} 
              className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm glass-panel p-6 md:p-8 rounded-2xl border border-white/10"
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Controls executive function, logic, and motor precision.
              </p>
            </motion.div>

            {/* Temporal Lobe */}
            <motion.h2 
              style={{ opacity: temporalOpacity, y: temporalY }} 
              className="absolute top-24 w-full text-center text-4xl md:text-6xl text-white tracking-wide"
            >
              <span className="font-[family-name:var(--font-cormorant)] italic font-normal">Temporal</span> <span className="font-[family-name:var(--font-dm-serif)] font-bold tracking-tight">Lobe</span>
            </motion.h2>
            <motion.div 
              style={{ opacity: temporalOpacity, x: temporalX }} 
              className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm glass-panel p-6 md:p-8 rounded-2xl border border-white/10"
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Manages memory, auditory processing, and language comprehension.
              </p>
            </motion.div>

            {/* Occipital Lobe */}
            <motion.h2 
              style={{ opacity: occipitalOpacity, y: occipitalY }} 
              className="absolute top-24 w-full text-center text-4xl md:text-6xl text-white tracking-wide"
            >
              <span className="font-[family-name:var(--font-cormorant)] italic font-normal">Occipital</span> <span className="font-[family-name:var(--font-dm-serif)] font-bold tracking-tight">Lobe</span>
            </motion.h2>
            <motion.div 
              style={{ opacity: occipitalOpacity, x: occipitalX }} 
              className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm glass-panel p-6 md:p-8 rounded-2xl border border-white/10"
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Responsible for visual perception and color recognition.
              </p>
            </motion.div>

            {/* Parietal Lobe */}
            <motion.h2 
              style={{ opacity: parietalOpacity, y: parietalY }} 
              className="absolute top-24 w-full text-center text-4xl md:text-6xl text-white tracking-wide"
            >
              <span className="font-[family-name:var(--font-cormorant)] italic font-normal">Parietal</span> <span className="font-[family-name:var(--font-dm-serif)] font-bold tracking-tight">Lobe</span>
            </motion.h2>
            <motion.div 
              style={{ opacity: parietalOpacity, x: parietalX }} 
              className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm glass-panel p-6 md:p-8 rounded-2xl border border-white/10"
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Processes sensory information, spatial awareness, and navigation.
              </p>
            </motion.div>
            
          </div>
          
          {/* Gradient overlay to seamlessly blend the canvas bottom edge into the dashboard */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030305] to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* Lower Section: The Telemetry Grid (Phase 3) */}
      <section className="relative z-20 w-full flex-1 bg-[#030305] pb-24 pt-12">
        <Dashboard />
      </section>
    </main>
  );
}
