"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LiveChart from "./LiveChart";

export default function Dashboard() {
  const [focus, setFocus] = useState(87.4);
  const [adhd, setAdhd] = useState(12.6);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocus((prev) => {
        const newVal = Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1)));
        setAdhd(100 - newVal);
        return Number(newVal.toFixed(1));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Widget 1: Concentration Index */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-focus-start)] shadow-[0_0_8px_#FF2A85]" />
          <h3 className="text-[11px] font-data tracking-widest text-white/50 uppercase">Concentration Index</h3>
        </div>
        <div className="mt-8 flex items-baseline gap-2">
          <span className="text-5xl font-[family-name:var(--font-inter)] font-bold font-light text-white tracking-tight">{focus.toFixed(1)}<span className="text-2xl text-white/40 font-[family-name:var(--font-inter)] font-bold">%</span></span>
          <span className="text-sm font-[family-name:var(--font-inter)] font-bold text-[var(--color-adhd-start)]">↑ +1.2%</span>
        </div>
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[var(--color-focus-start)] to-[var(--color-focus-end)]" 
            initial={{ width: 0 }}
            animate={{ width: `${focus}%` }}
            transition={{ type: "spring", bounce: 0, duration: 1 }}
          />
        </div>
      </motion.div>

      {/* Widget 2: Distraction Variance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-adhd-start)] shadow-[0_0_8px_#00D6FF]" />
          <h3 className="text-[11px] font-data tracking-widest text-white/50 uppercase">Distraction Variance</h3>
        </div>
        <div className="mt-8 flex items-baseline gap-2">
          <span className="text-5xl font-[family-name:var(--font-inter)] font-bold font-light text-white tracking-tight">{adhd.toFixed(1)}<span className="text-2xl text-white/40 font-[family-name:var(--font-inter)] font-bold">%</span></span>
          <span className="text-sm font-[family-name:var(--font-inter)] font-bold text-[var(--color-focus-start)]">↓ -0.8%</span>
        </div>
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[var(--color-adhd-start)] to-[var(--color-adhd-end)]" 
            initial={{ width: 0 }}
            animate={{ width: `${adhd}%` }}
            transition={{ type: "spring", bounce: 0, duration: 1 }}
          />
        </div>
      </motion.div>

      {/* Widget 3: Live Chart (Spanning Card) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="glass-panel p-6 rounded-2xl md:col-span-2 lg:col-span-3 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-data tracking-widest text-white/50 uppercase">Focus Volatility vs. Time</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span className="text-[10px] font-data tracking-widest text-white/40">LIVE DATA STREAM</span>
          </div>
        </div>
        
        <LiveChart />
      </motion.div>
    </div>
  );
}
