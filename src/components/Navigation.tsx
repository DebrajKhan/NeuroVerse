import { Activity } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-void/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-focus-start)] to-[var(--color-adhd-start)] flex items-center justify-center shadow-[0_0_15px_rgba(255,42,133,0.5)]">
          <Activity size={16} className="text-white" />
        </div>
        <span className="font-[family-name:var(--font-dm-serif)] font-bold text-lg tracking-widest">NEUROVERSE</span>
      </div>
    </nav>
  );
}
