import React from 'react';
import { Compass, Sparkles, CheckCircle, PackageCheck } from 'lucide-react';

export default function TreasureDiscoveredModal({ cart, onClose }) {
  if (!cart || cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in zoom-in-95"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-900 border-2 border-amber-400 rounded-3xl max-w-lg w-full p-8 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-1 mx-auto mb-4 shadow-lg shadow-amber-500/30 flex items-center justify-center">
          <PackageCheck className="w-10 h-10 text-slate-950" />
        </div>

        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
          Gada Electronics Voyage Complete
        </span>

        <h2 className="text-3xl font-serif font-black text-amber-300 mt-3">
          TREASURE DISCOVERED!
        </h2>

        <p className="text-slate-300 text-sm mt-2 font-mono">
          Captain Jethalal Gada confirms your voyage! {cart.length} electronic treasures locked in your chest.
        </p>

        <div className="my-6 bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 text-left max-h-40 overflow-y-auto space-y-2">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs font-mono">
              <span className="text-amber-200 truncate max-w-[200px]">{item.title}</span>
              <span className="text-amber-400 font-bold">₹{item.price.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm font-mono border-t border-amber-500/20 pt-4">
          <span className="text-slate-400">Total Chest Value:</span>
          <span className="text-xl font-bold text-amber-400">₹{total.toLocaleString('en-IN')}</span>
        </div>

        <div
          onClick={onClose}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
          className="mt-6 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-serif font-bold py-3 rounded-xl cursor-pointer transition-all shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Sail On Another Voyage
        </div>
      </div>
    </div>
  );
}