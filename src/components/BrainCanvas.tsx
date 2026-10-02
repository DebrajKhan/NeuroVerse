"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 300;

interface LobeData {
  id: string;
  label: string;
  description: string;
  offsetPhase: number;
  lineOffsetX: number;
  lineOffsetY: number;
}

const LOBES: LobeData[] = [
  { 
    id: 'frontal', 
    label: 'FRONTAL LOBE', 
    description: 'Controls executive function, logic, and motor precision.',
    offsetPhase: 0, 
    lineOffsetX: -140, lineOffsetY: -60 
  },
  { 
    id: 'parietal', 
    label: 'PARIETAL LOBE', 
    description: 'Processes sensory information, spatial awareness, and navigation.',
    offsetPhase: Math.PI / 2, 
    lineOffsetX: 140, lineOffsetY: -90 
  },
  { 
    id: 'occipital', 
    label: 'OCCIPITAL LOBE', 
    description: 'Responsible for visual perception and color recognition.',
    offsetPhase: Math.PI, 
    lineOffsetX: 150, lineOffsetY: 40 
  },
  { 
    id: 'temporal', 
    label: 'TEMPORAL LOBE', 
    description: 'Manages memory, auditory processing, and language comprehension.',
    offsetPhase: (3 * Math.PI) / 2, 
    lineOffsetX: -130, lineOffsetY: 70 
  }
];

export default function BrainCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lobeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hoveredLobe, setHoveredLobe] = useState<string | null>(null);
  
  // Generate random percentages that sum to 100
  const randomPercentages = useMemo(() => {
    const r = Array.from({ length: 4 }, () => Math.random());
    const sum = r.reduce((a, b) => a + b, 0);
    return r.map(v => ((v / sum) * 100).toFixed(1));
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let currentFrameFloat = 0;
    const playbackSpeed = 0.25; 
    const loadedImages: HTMLImageElement[] = [];
    let imagesLoaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/neuroverse_img/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === TOTAL_FRAMES) {
          setLoaded(true);
          draw();
        }
      };
      loadedImages.push(img);
    }

    const draw = () => {
      const p = scrollProgress.get();
      const BUFFER_THRESHOLD = 0.03;
      
      if (p <= BUFFER_THRESHOLD || p >= 1) {
        // Autonomous rotation at buffer zone (0-3%) and 100%
        currentFrameFloat = (currentFrameFloat + playbackSpeed) % TOTAL_FRAMES;
      } else {
        // Scrub based on remaining scroll progress (3% to 100%)
        const scrubProgress = (p - BUFFER_THRESHOLD) / (1 - BUFFER_THRESHOLD);
        const targetFrame = scrubProgress * (TOTAL_FRAMES - 1);
        // Lerp for buttery smoothness without flicker
        currentFrameFloat += (targetFrame - currentFrameFloat) * 0.1;
        if (currentFrameFloat < 0) currentFrameFloat = 0;
        if (currentFrameFloat >= TOTAL_FRAMES) currentFrameFloat = TOTAL_FRAMES - 1;
      }

      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      const frameIndex = Math.floor(currentFrameFloat) % TOTAL_FRAMES;
      const currentImg = loadedImages[frameIndex];
      
      if (currentImg && currentImg.complete) {
        const imgAspect = currentImg.width / currentImg.height;
        const canvasAspect = width / height;
        let drawWidth, drawHeight, drawX, drawY;

        if (imgAspect > canvasAspect) {
          drawWidth = width;
          drawHeight = width / imgAspect;
          drawX = 0;
          drawY = (height - drawHeight) / 2;
        } else {
          drawHeight = height;
          drawWidth = height * imgAspect;
          drawY = 0;
          drawX = (width - drawWidth) / 2;
        }

        ctx.drawImage(currentImg, drawX, drawY, drawWidth, drawHeight);
      }

      // Update lobe positions directly via DOM for 60fps
      if (lobeRefs.current.length === LOBES.length) {
        const currentAngle = (currentFrameFloat / TOTAL_FRAMES) * Math.PI * 2;
        const radiusX = width * 0.22;
        const radiusY = height * 0.05; 

        LOBES.forEach((lobe, i) => {
          const el = lobeRefs.current[i];
          if (!el) return;

          const lobeAngle = currentAngle + lobe.offsetPhase;
          const x = Math.sin(lobeAngle) * radiusX;
          const z = Math.cos(lobeAngle); 
          const yBaseOffsets = [-10, -30, 20, 50];
          const y = yBaseOffsets[i] + Math.cos(lobeAngle) * radiusY;

          const isFront = z > 0;
          const scale = isFront ? 1 : 0.85;
          
          // Labels appear permanently only at 100% scroll
          const labelOpacity = p >= 1 ? (isFront ? 1 : 0.2) : 0;
          const zIndex = isFront ? 10 : 0;

          el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
          el.style.opacity = labelOpacity.toString();
          el.style.zIndex = zIndex.toString();
        });
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [scrollProgress]);

  const [isDoneScrolling, setIsDoneScrolling] = useState(false);

  useEffect(() => {
    const unsub = scrollProgress.on("change", (v) => {
      setIsDoneScrolling(v >= 1);
    });
    return () => unsub();
  }, [scrollProgress]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-transparent overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-focus-start)] animate-pulse font-mono text-sm tracking-widest z-50">
          INITIALIZING_NEURO_LINK...
        </div>
      )}
      
      <motion.canvas
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: loaded ? 1 : 0, filter: loaded ? "blur(0px)" : "blur(20px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {loaded && LOBES.map((lobe, i) => {
        const isLeft = lobe.lineOffsetX < 0;
        const isHovered = hoveredLobe === lobe.id;
        
        return (
          <div 
            key={lobe.id}
            ref={(el) => { lobeRefs.current[i] = el; }}
            className={`absolute left-1/2 top-1/2 transition-all duration-300 ease-out ${isDoneScrolling ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ transformOrigin: 'center center', opacity: 0 }}
          >
            <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0, width: 2, height: 2 }}>
              <line 
                x1="0" y1="0" 
                x2={lobe.lineOffsetX} y2={lobe.lineOffsetY} 
                stroke="rgba(255, 255, 255, 0.4)" 
                strokeWidth="1" 
              />
              <circle cx="0" cy="0" r="3" fill="var(--color-focus-start)" className="drop-shadow-[0_0_6px_rgba(255,42,133,0.8)]" />
            </svg>
            
            <div 
              className="absolute pointer-events-auto"
              style={{ 
                left: lobe.lineOffsetX, 
                top: lobe.lineOffsetY,
                transform: `translate(${isLeft ? '-100%' : '0'}, -50%)`,
                marginLeft: isLeft ? '-12px' : '12px'
              }}
            >
              <motion.div
                layout
                onMouseEnter={() => setHoveredLobe(lobe.id)}
                onMouseLeave={() => setHoveredLobe(null)}
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-2 rounded-xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
                style={{ 
                  minWidth: isHovered ? 180 : 'auto', 
                  maxWidth: 220 
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <motion.span layout="position" className="font-classic text-sm font-semibold whitespace-nowrap text-white/90">
                    {lobe.label}
                  </motion.span>
                  <motion.span layout="position" className="font-[family-name:var(--font-inter)] font-bold text-[var(--color-focus-start)] text-xs">
                    {randomPercentages[i]}%
                  </motion.span>
                </div>
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="font-classic text-[11px] text-white/70 whitespace-normal leading-tight overflow-hidden"
                    >
                      {lobe.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
