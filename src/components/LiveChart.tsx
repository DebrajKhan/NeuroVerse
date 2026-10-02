"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type DataPoint = {
  time: string;
  focus: number;
};

const INITIAL_DATA: DataPoint[] = Array.from({ length: 20 }).map((_, i) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - (20 - i) * 2);
  return {
    time: d.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
    focus: 80 + Math.random() * 15 - 5,
  };
});

export default function LiveChart() {
  const [data, setData] = useState<DataPoint[]>(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastVal = newData[newData.length - 1].focus;
        const newVal = Math.min(100, Math.max(0, lastVal + (Math.random() * 8 - 4)));
        const d = new Date();
        newData.push({
          time: d.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
          focus: Number(newVal.toFixed(1)),
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF2A85" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FF2A85" stopOpacity={0} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "var(--font-inter)", fontWeight: "bold" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[60, 100]} 
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "var(--font-inter)", fontWeight: "bold" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(10, 12, 18, 0.8)", 
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontFamily: "var(--font-inter)",
              fontWeight: "bold"
            }} 
            itemStyle={{ color: "#FF2A85" }}
          />
          <Area 
            type="monotone" 
            dataKey="focus" 
            stroke="#FF2A85" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorFocus)" 
            isAnimationActive={false}
            filter="url(#glow)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
