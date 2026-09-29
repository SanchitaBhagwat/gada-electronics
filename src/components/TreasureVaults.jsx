import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Gem, Coins, Map, Info, QrCode, ArrowLeftRight, CheckCircle2, CreditCard, Smartphone, Wallet } from 'lucide-react';

const vaultsData = [
  {
    id: 'vault-1',
    title: 'The Captain’s Stash',
    shortDesc: 'Ancient golden doubloons and priceless relics.',
    fullDesc: 'Contains over 10,000 royal gold coins forged in 1689, alongside Captain Jack’s personal ruby-encrusted pocket watch.',
    image: '/pirate-bg.jpg',
    icon: Coins,
    color: 'from-amber-500 to-yellow-600',
    price: '₹499',
  },
  {
    id: 'vault-2',
    title: 'Cursed Emerald Armory',
    shortDesc: 'Legendary weapons forged in mysterious fires.',
    fullDesc: 'Protected by ancient oceanic hexes. Features dual cutlasses embedded with green emerald crystals.',
    image: '/pirate-bg.jpg',
    icon: Shield,
    color: 'from-emerald-500 to-teal-700',
    price: '₹799',
  },
  {
    id: 'vault-3',
    title: 'Jeweled Crown Jewels',
    shortDesc: 'Diamonds, sapphires, and royal regalia.',
    fullDesc: 'Rescued from a sunken Spanish Galleon. Includes the Royal Star Sapphire ring and three diamond-encrusted tiaras.',
    image: '/pirate-bg.jpg',
    icon: Gem,
    color: 'from-blue-500 to-indigo-700',
    price: '₹1,299',
  },
  {
    id: 'vault-4',
    title: 'Lost Navigator Charts',
    shortDesc: 'Maps to hidden islands and unknown seas.',
    fullDesc: 'Hand-drawn maps detailing secret trade routes, hidden reef channels, and coordinates leading to the Sunken City.',
    image: '/pirate-bg.jpg',
    icon: Map,
    color: 'from-orange-500 to-red-700',
    price: '₹299',
  },
];

// Available Payment Options
const paymentOptions = [
  { id: 'upi', name: 'GPay / PhonePe / UPI', icon: Smartphone, instruction: 'Scan QR with any UPI App (GPay, PhonePe, Paytm)' },
  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, instruction: 'Tap or scan card chip on NFC supported reader' },
  { id: 'wallet', name: 'Treasure Wallet', icon: Wallet, instruction: 'Auto-deduct from Gada Electronics Stash Wallet' },
];

export default function TreasureVaults() {
  const [hoveredVault, setHoveredVault] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedVault, setSelectedVault] = useState(vaultsData[0]);
  const [activePaymentIndex, setActivePaymentIndex] = useState(0);

  // Swipe vault card left/right to trigger payment modal
  const handleDragEnd = (event, info, vault) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.offset.y) > 80) {
      if (vault) setSelectedVault(vault);
      setShowPayment(true);
    }
  };

  // Swipe payment modal left/right to close modal
  const handleDismissPayment = (event, info) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 120) {
      setShowPayment(false);
    }
  };

  // Scroll / Swipe payment options left or right
  const handleOptionScroll = (e) => {
    if (e.deltaX > 20 || e.deltaY > 20) {
      setActivePaymentIndex((prev) => (prev + 1) % paymentOptions.length);
    } else if (e.deltaX < -20 || e.deltaY < -20) {
      setActivePaymentIndex((prev) => (prev - 1 + paymentOptions.length) % paymentOptions.length);
    }
  };

  const currentPaymentOption = paymentOptions[activePaymentIndex];

  return (
    <section className="relative z-20 w-full max-w-6xl mx-auto py-12 px-4 select-none">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase tracking-wider">
          Explore The Four Treasure Vaults
        </h2>
        <p className="text-amber-200/70 font-serif text-sm md:text-base mt-2 flex items-center justify-center gap-2">
          <span>Hover to explore details</span> • 
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <ArrowLeftRight className="w-4 h-4 animate-pulse" /> Swipe card left or right to Pay & Unlock
          </span>
        </p>
      </div>

      {/* Grid of 4 Vaults (Swipe-enabled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vaultsData.map((vault) => {
          const IconComponent = vault.icon;
          const isHovered = hoveredVault?.id === vault.id;

          return (
            <motion.div
              key={vault.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, info) => handleDragEnd(e, info, vault)}
              onMouseEnter={() => setHoveredVault(vault)}
              onMouseLeave={() => setHoveredVault(null)}
              whileHover={{ scale: 1.02 }}
              className="relative group h-96 rounded-2xl border border-amber-500/30 bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-xl shadow-slate-950/80 cursor-grab active:cursor-grabbing flex flex-col justify-between p-6 touch-pan-y"
            >
              {/* Background Picture on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${vault.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${vault.color} text-slate-950 shadow-md`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-mono font-bold text-amber-300">
                    {vault.price}
                  </span>
                  <span className="text-[10px] font-mono text-amber-200/60 uppercase">
                    Swipe to Pay
                  </span>
                </div>
              </div>

              {/* Card Body (Swaps on hover) */}
              <div className="relative z-10 space-y-3 mt-auto">
                <h3 className="text-xl font-serif font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
                  {vault.title}
                </h3>

                <AnimatePresence mode="wait">
                  {isHovered ? (
                    <motion.div
                      key="detailed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-2"
                    >
                      <p className="text-xs text-amber-100/90 leading-relaxed font-sans border-l-2 border-amber-400 pl-2">
                        {vault.fullDesc}
                      </p>
                      <div className="flex items-center space-x-1 text-[11px] font-mono text-amber-300 font-semibold pt-1">
                        <Info className="w-3.5 h-3.5" />
                        <span>Swipe card horizontally to open Scanner</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-xs text-amber-200/60 font-serif">
                        {vault.shortDesc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swipe Indicator Tag */}
              <div className="relative z-10 pt-3 border-t border-amber-500/20 text-center">
                <p className="text-[10px] font-mono text-amber-400/80 tracking-widest uppercase flex items-center justify-center gap-1">
                  <ArrowLeftRight className="w-3 h-3" /> Swipe Card Left / Right
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SWIPEABLE PAYMENT SCANNER & OPTIONS MODAL */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg"
          >
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDismissPayment}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 shadow-2xl shadow-amber-950/60 text-slate-100 overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="text-center pb-3 border-b border-amber-500/20 mb-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300">
                  <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse" />
                  <span>Swipe window left/right to exit scanner</span>
                </div>
              </div>

              {/* HORIZONTAL SWIPEABLE PAYMENT OPTIONS CAROUSEL */}
              <div className="mb-6">
                <p className="text-[11px] font-mono text-amber-300 uppercase tracking-widest text-center mb-2 flex items-center justify-center gap-1">
                  <ArrowLeftRight className="w-3 h-3" /> Scroll horizontally to cycle Payment Options
                </p>

                <div 
                  onWheel={handleOptionScroll}
                  className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none px-2 justify-center"
                >
                  {paymentOptions.map((option, idx) => {
                    const OptionIcon = option.icon;
                    const isActive = idx === activePaymentIndex;

                    return (
                      <motion.div
                        key={option.id}
                        onMouseEnter={() => setActivePaymentIndex(idx)}
                        animate={{ scale: isActive ? 1.05 : 0.95, opacity: isActive ? 1 : 0.5 }}
                        className={`shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold shadow-lg shadow-amber-500/40'
                            : 'bg-slate-950/80 text-amber-200 border-amber-500/30'
                        }`}
                      >
                        <OptionIcon className="w-4 h-4" />
                        <span className="text-xs font-mono">{option.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left Side: Dynamic Scanner */}
                <div className="flex flex-col items-center text-center space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/30">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                    Pay {selectedVault?.price} via {currentPaymentOption.name}
                  </span>

                  {/* Scanner QR Display */}
                  <div className="relative p-4 bg-white rounded-2xl shadow-inner border-4 border-amber-500/40">
                    <QrCode className="w-40 h-40 text-slate-950" />
                    <motion.div
                      animate={{ y: [0, 140, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 left-4 right-4 h-1 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,1)]"
                    />
                  </div>

                  <p className="text-[11px] font-mono text-amber-200/70">
                    {currentPaymentOption.instruction}
                  </p>
                </div>

                {/* Right Side: User Details & Steps */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-amber-300">
                      Payment & Delivery Info
                    </h3>
                    <p className="text-xs text-amber-100/60 font-serif">
                      Access Pass for {selectedVault?.title}
                    </p>
                  </div>

                  {/* User Details */}
                  <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-amber-500/20 text-xs font-mono">
                    <div className="flex justify-between border-b border-amber-500/10 pb-1.5">
                      <span className="text-amber-200/60">User Name:</span>
                      <span className="text-amber-200 font-semibold">Jethalal Gada</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-500/10 pb-1.5">
                      <span className="text-amber-200/60">Phone:</span>
                      <span className="text-amber-200 font-semibold">+91 98765 43210</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-500/10 pb-1.5">
                      <span className="text-amber-200/60">UPI ID:</span>
                      <span className="text-amber-300 font-bold">gadaelectronics@upi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200/60">Address:</span>
                      <span className="text-amber-200 text-right font-semibold">Gokuldham Society, Mumbai</span>
                    </div>
                  </div>

                  {/* Dynamic Instructions */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-serif font-bold text-amber-300">
                      Instructions for {currentPaymentOption.name}:
                    </p>
                    <ul className="space-y-1 text-[11px] font-mono text-amber-100/80">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Hover over options to switch payment modes.</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{currentPaymentOption.instruction}.</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Confirm payment amount of {selectedVault?.price}.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-3 border-t border-amber-500/20 text-center">
                <span className="text-[11px] font-mono text-amber-400/80 tracking-widest uppercase">
                  ← Swipe this box left or right to exit scanner →
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}