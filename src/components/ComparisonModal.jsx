import React, { useEffect } from 'react';
import { Sparkles, Check, Anchor, X } from 'lucide-react';

export default function ComparisonModal({ product, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-amber-300 text-lg">Treasure Specs Inspection</h3>
          </div>
          <div
            onClick={onClose}
            tabIndex={0}
            className="text-xs font-mono text-slate-400 hover:text-amber-300 cursor-pointer border border-slate-700 px-2 py-1 rounded-lg flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> ESC to exit
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img src={product.image} alt={product.title} className="w-36 h-36 object-cover rounded-2xl border border-amber-500/30" />
          <div className="space-y-2 text-left w-full">
            <h4 className="font-bold text-amber-200 text-base">{product.title}</h4>
            <p className="text-amber-400 font-mono font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
            <div className="space-y-1 pt-2">
              <p className="text-xs text-slate-400 font-mono">Captain Jethalal Specs Rating:</p>
              {product.specs.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-mono">
                  <Check className="w-3.5 h-3.5 text-amber-400" /> {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {product.aiMatchReason && (
          <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 font-mono flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span><strong>AI Recommendation Insight:</strong> {product.aiMatchReason}</span>
          </div>
        )}

        <p className="text-[11px] text-slate-500 text-center mt-4 font-mono">
          * Drag this treasure directly into your Treasure Chest on the main map!
        </p>
      </div>
    </div>
  );
}