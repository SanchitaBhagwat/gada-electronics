import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ArrowLeftRight, CheckCircle2, Smartphone, CreditCard, Wallet, ShoppingBag, ShieldCheck } from 'lucide-react';

const products = [
  {
    id: 'tv-1',
    name: 'Bapu-G Ultra HD 4K Smart OLED',
    tagline: '"Crystal clear picture, like seeing Gokuldham in 8K!"',
    specs: ['65 Inch 4K OLED', '120Hz Refresh Rate', 'Dolby Atmos Audio', 'Built-in Voice AI'],
    discount: '36% OFF',
    seller: 'Gada Vision',
    price: '₹1,24,999',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tv-2',
    name: 'Sundar-Vision QLED Curved',
    tagline: '"Straight from Ahmedabad! Maximum display clarity!"',
    specs: ['55 Inch Quantum Dot', 'HDR10+ Gold', '40W Front Soundbar', 'Zero Bezel Design'],
    discount: '41% OFF',
    seller: 'Gada Electronics',
    price: '₹84,999',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
  },
];

const paymentOptions = [
  { id: 'upi', name: 'GPay / PhonePe / UPI', icon: Smartphone, instruction: 'Scan QR with any UPI App (GPay, PhonePe, Paytm)' },
  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, instruction: 'Tap or scan card chip on NFC supported reader' },
  { id: 'wallet', name: 'Treasure Wallet', icon: Wallet, instruction: 'Auto-deduct from Gada Electronics Wallet' },
];

export default function ProductSection() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activePaymentIndex, setActivePaymentIndex] = useState(0);

  const openPaymentModal = (product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  // Trigger Payment Modal when user swipes card left or right
  const handleDragEnd = (event, info, product) => {
    if (Math.abs(info.offset.x) > 60 || Math.abs(info.offset.y) > 60) {
      openPaymentModal(product);
    }
  };

  // Close Payment Modal on swipe
  const handleDismissPayment = (event, info) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      setShowPayment(false);
    }
  };

  const handleOptionScroll = (e) => {
    if (e.deltaX > 20 || e.deltaY > 20) {
      setActivePaymentIndex((prev) => (prev + 1) % paymentOptions.length);
    } else if (e.deltaX < -20 || e.deltaY < -20) {
      setActivePaymentIndex((prev) => (prev - 1 + paymentOptions.length) % paymentOptions.length);
    }
  };

  const currentOption = paymentOptions[activePaymentIndex];

  return (
    <div className="relative z-20 max-w-6xl mx-auto py-8 px-4 select-none">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
            className="bg-slate-900/90 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing group flex flex-col justify-between"
          >
            {/* Top Image Box */}
            <div className="relative h-64 bg-slate-950 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                {item.discount}
              </span>
              <span className="absolute top-4 right-4 bg-slate-950/80 border border-amber-500/40 text-amber-200 text-xs font-mono px-3 py-1 rounded-full">
                {item.seller}
              </span>
            </div>

            {/* Middle Content Box */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-amber-100">{item.name}</h3>
                <p className="text-xs text-amber-300/80 italic mt-1">{item.tagline}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                {item.specs.map((spec, i) => (
                  <div key={i} className="bg-slate-950/70 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-200/90">
                    • {spec}
                  </div>
                ))}
              </div>

              {/* Visible Price & Quick Purchase Banner */}
              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-200/60 uppercase font-mono block">Special Price</span>
                  <span className="text-2xl font-black text-amber-400">{item.price}</span>
                </div>

                {/* VISIBLE PURCHASE BUTTON BELOW PRODUCT */}
                <button
                  onClick={() => openPaymentModal(item)}
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-amber-500/30 hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer border border-amber-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now / Pay</span>
                </button>
              </div>
            </div>

            {/* Bottom Interactive Touch / Swipe Hint */}
            <div 
              onClick={() => openPaymentModal(item)}
              className="bg-slate-950/90 py-2.5 px-4 border-t border-amber-500/20 flex items-center justify-between cursor-pointer hover:bg-amber-500/10 transition"
            >
              <span className="text-[11px] font-mono text-amber-300/80 flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse text-amber-400" /> Swipe card left/right or click to pay
              </span>
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                Scanner Ready
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SWIPEABLE PAYMENT SCANNER & USER DETAILS MODAL */}
      <AnimatePresence>
        {showPayment && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl"
          >
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDismissPayment}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Swipe to exit header notification */}
              <div className="text-center pb-3 border-b border-amber-500/20 mb-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300">
                  <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse" />
                  <span>Swipe window left/right to exit scanner</span>
                </div>
              </div>

              {/* Payment Mode Selector Carousel */}
              <div className="mb-6">
                <p className="text-[11px] font-mono text-amber-300 uppercase tracking-widest text-center mb-2 flex items-center justify-center gap-1">
                  <ArrowLeftRight className="w-3 h-3" /> Hover or Scroll to Switch Payment Options
                </p>

                <div onWheel={handleOptionScroll} className="flex items-center space-x-3 overflow-x-auto pb-2 justify-center">
                  {paymentOptions.map((opt, idx) => {
                    const Icon = opt.icon;
                    const isActive = idx === activePaymentIndex;
                    return (
                      <motion.div
                        key={opt.id}
                        onMouseEnter={() => setActivePaymentIndex(idx)}
                        animate={{ scale: isActive ? 1.05 : 0.95, opacity: isActive ? 1 : 0.5 }}
                        className={`shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                            : 'bg-slate-950 text-amber-200 border-amber-500/30'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-mono">{opt.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Scanner Section */}
                <div className="flex flex-col items-center text-center space-y-4 bg-slate-950 p-5 rounded-2xl border border-amber-500/30">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                    Pay {selectedProduct.price}
                  </span>

                  <div className="relative p-4 bg-white rounded-2xl border-4 border-amber-500/40">
                    <QrCode className="w-40 h-40 text-slate-950" />
                    <motion.div
                      animate={{ y: [0, 140, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 left-4 right-4 h-1 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,1)]"
                    />
                  </div>

                  <p className="text-[11px] font-mono text-amber-200/70">{currentOption.instruction}</p>
                </div>

                {/* User Details Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-amber-300">Payment & User Details</h3>
                    <p className="text-xs text-amber-100/60">{selectedProduct.name}</p>
                  </div>

                  <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-amber-500/20 text-xs font-mono">
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

                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-serif font-bold text-amber-300">Instructions:</p>
                    <ul className="space-y-1 text-[11px] font-mono text-amber-100/80">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Hover over options to switch payment mode.</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Scan code to transfer {selectedProduct.price}.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Swipe Hint */}
              <div className="mt-6 pt-3 border-t border-amber-500/20 text-center">
                <span className="text-[11px] font-mono text-amber-400/80 tracking-widest uppercase">
                  ← Swipe this window left or right to exit →
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}