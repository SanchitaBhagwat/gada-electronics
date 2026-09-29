import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Trash2, CheckCircle2, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export default function TreasureChest({ cart, onAddToCart, onRemoveFromCart, onCheckout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      try {
        const item = JSON.parse(data);
        onAddToCart(item);
      } catch (err) {
        console.error("Invalid drop item", err);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-80 md:w-96 bg-slate-900 border-2 border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 p-4 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-amber-300 text-sm">Treasure Chest Cart</h3>
              </div>
              <span className="text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                {cart.length} Treasures
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto p-3 space-y-2">
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6 italic font-mono">
                  Your chest is empty! Drag treasure cards here to add them.
                </p>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <p className="font-bold text-slate-200 line-clamp-1">{item.title}</p>
                        <p className="text-amber-400 font-mono text-[11px]">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div
                      onClick={() => onRemoveFromCart(idx)}
                      className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg cursor-pointer transition-colors"
                      title="Remove Treasure"
                    >
                      <Trash2 className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 bg-slate-950 border-t border-amber-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Total Loot Value:</span>
                  <span className="text-base font-bold text-amber-400">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                
                <div
                  tabIndex={0}
                  onClick={() => {
                    onCheckout();
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && onCheckout()}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-serif font-black text-center py-2.5 rounded-xl cursor-pointer transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" /> Claim & Discover Treasure
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Target Zone */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md relative ${
          isDragOver
            ? 'bg-amber-500/30 border-amber-400 scale-110 shadow-amber-500/50 animate-pulse'
            : 'bg-slate-900/90 border-amber-500/50 hover:border-amber-400'
        }`}
      >
        {isDragOver && (
          <span className="absolute -inset-1 rounded-2xl border-2 border-amber-400 animate-ping opacity-75" />
        )}

        <div className="relative">
          <Package className={`w-7 h-7 ${isDragOver ? 'text-amber-300 animate-bounce' : 'text-amber-400'}`} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-bold font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {cart.length}
            </span>
          )}
        </div>

        <div className="text-left font-mono">
          <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
            {isDragOver ? 'DROP HERE!' : 'TREASURE CHEST'}
            {isDragOver && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
          </p>
          <p className="text-[10px] text-slate-400">
            {isDragOver ? 'Release to add loot' : `Drag cards here • ₹${totalPrice.toLocaleString('en-IN')}`}
          </p>
        </div>

        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-amber-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-amber-400" />
        )}
      </motion.div>
    </div>
  );
}