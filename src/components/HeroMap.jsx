import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Sparkles, Anchor } from 'lucide-react';

const ISLANDS = [
  { id: 'all', name: 'All Oceans', category: 'all', description: 'Explore all Gada Electronics treasures', coordinates: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
  { id: 'laptop', name: 'Laptop Lagoon', category: 'laptop', description: 'High-speed coding galleons & laptops', coordinates: 'top-1/4 left-1/4' },
  { id: 'tv', name: 'Sartaj TV Realm', category: 'tv', description: 'Giant displays & ultra HD screens', coordinates: 'top-1/3 right-1/4' },
  { id: 'audio', name: 'SoundWave Bay', category: 'audio', description: 'Noise-cancelling headsets & speakers', coordinates: 'bottom-1/4 left-1/3' },
  { id: 'gadget', name: 'Gadget Anchorage', category: 'wearables', description: 'Smartwatches, power banks & gear', coordinates: 'bottom-1/3 right-1/3' },
];

export default function HeroMap({ activeCategory, onSelectCategory }) {
  const [hoveredIsland, setHoveredIsland] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-4 my-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="ocean-glass-panel rounded-3xl p-6 md:p-8 text-center relative overflow-hidden"
      >
        <div className="relative z-10 mb-6">
          <span className="text-amber-300 font-mono text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive Animated Archipelago
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-black gold-text-gradient mt-2">
            The High Seas of Gada Electronics
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto mt-1">
            Hover over any island or press keys <kbd className="text-amber-300 font-bold">1</kbd> to <kbd className="text-amber-300 font-bold">5</kbd> to sail!
          </p>
        </div>

        {/* Map Canvas with Treasure Ship Silhouette Background */}
        <div className="relative min-h-[340px] md:min-h-[400px] bg-slate-950/90 rounded-2xl border border-sky-500/20 p-6 flex items-center justify-center overflow-hidden shadow-inner">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80')` }}
          />

          {/* Island Hotspots */}
          {ISLANDS.map((island, index) => {
            const isActive = activeCategory === island.category;
            return (
              <motion.div
                key={island.id}
                onClick={() => onSelectCategory(island.category, island.name)}
                onMouseEnter={() => setHoveredIsland(island)}
                onMouseLeave={() => setHoveredIsland(null)}
                tabIndex={0}
                className={`absolute ${island.coordinates} cursor-pointer group focus:outline-none z-20`}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 + index * 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`flex flex-col items-center p-3 rounded-2xl backdrop-blur-md transition-all ${
                  isActive 
                    ? 'bg-amber-500/20 border-2 border-amber-400 shadow-xl shadow-amber-500/30 scale-105' 
                    : 'bg-slate-900/80 border border-sky-500/30 hover:border-amber-400 hover:bg-slate-800/90'
                }`}>
                  <div className="relative">
                    <MapPin className={`w-6 h-6 ${isActive ? 'text-amber-400 animate-bounce' : 'text-sky-400 group-hover:text-amber-300'}`} />
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border border-amber-400 animate-ping opacity-75" />
                    )}
                  </div>
                  <span className="text-xs font-serif font-bold text-amber-200 mt-1 whitespace-nowrap flex items-center gap-1">
                    <span className="text-[10px] opacity-60 font-mono">[{index + 1}]</span> {island.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Hover Status */}
        <div className="mt-4 min-h-[36px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hoveredIsland ? (
              <motion.p 
                key={hoveredIsland.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs md:text-sm text-amber-300 font-mono bg-slate-950/80 border border-amber-500/30 px-4 py-1.5 rounded-xl inline-flex items-center gap-2"
              >
                <Anchor className="w-4 h-4 text-amber-400" />
                <strong>{hoveredIsland.name}:</strong> {hoveredIsland.description}
              </motion.p>
            ) : (
              <p className="text-xs text-slate-400 italic font-mono">
                Select an island or press hotkeys [1-5] to navigate...
              </p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}