import React from 'react';
import { Compass, Anchor, Shield } from 'lucide-react';

export default function Navbar({ activeIsland, cartCount }) {
  return (
    <header className="sticky top-0 z-40 bg-[#070A11]/80 backdrop-blur-xl border-b border-amber-500/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <Compass className="w-6 h-6 text-slate-950 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-black tracking-wider text-amber-400 flex items-center gap-2">
              GADA TREASURE
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Anchor className="w-3 h-3 text-amber-500" /> Realm: <span className="text-amber-200">{activeIsland || "All Oceans"}</span>
            </p>
          </div>
        </div>

        {/* Rule Indicator Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs text-amber-300 font-mono">
          <Shield className="w-3.5 h-3.5 text-amber-400" /> No Buttons Allowed • Drag items to Chest
        </div>

      </div>
    </header>
  );
}