import React from 'react';
import { motion } from 'framer-motion';
import { Star, GripVertical, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onSelectForCompare }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      draggable
      onDragStart={handleDragStart}
      className="glass-card rounded-2xl p-4 cursor-grab active:cursor-grabbing relative flex flex-col justify-between transition-all duration-300 group"
    >
      {/* Drag Indicator */}
      <div className="absolute top-3 right-3 bg-slate-950/80 border border-amber-500/30 text-amber-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono z-10">
        <GripVertical className="w-3 h-3 text-amber-400" /> Drag to Chest
      </div>

      <div>
        {/* Product Image */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3 bg-slate-950/50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
          <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/90 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded font-mono">
            {product.island}
          </span>
        </div>

        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors font-serif leading-snug">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 text-xs px-1.5 py-0.5 rounded-md font-mono flex-shrink-0 border border-amber-500/20">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* AI Insight */}
        {product.aiMatchReason && (
          <div className="mb-3 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-[11px] text-amber-200 font-mono flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>{product.aiMatchReason}</span>
          </div>
        )}

        {/* Specs Badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.specs.map((spec, index) => (
            <span
              key={index}
              className="text-[10px] bg-slate-800/60 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-700/50"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & Zero-Button Inspection */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Price</span>
          <span className="text-base font-black text-amber-400 font-mono">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div
          tabIndex={0}
          onClick={() => onSelectForCompare(product)}
          className="text-xs text-amber-400 hover:text-amber-300 cursor-pointer underline font-mono"
        >
          Inspect Specs
        </div>
      </div>
    </motion.div>
  );
}