import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tv, 
  Refrigerator, 
  Smartphone, 
  Wind, 
  WashingMachine, 
  Laptop, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Bot,
  Send,
  Flag,
  Ship,
  Gem,
  Map,
  Anchor,
  Palmtree,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- REALISTIC BACKGROUND TREASURE IMAGES SCATTERED DOWN THE PAGE ---
const REALISTIC_BACKGROUND_ELEMENTS = [
  // 1. Big Galleon Ships
  {
    type: 'ship',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    position: 'top-[12%] -left-12',
    animation: 'animate-ship-sway opacity-30 hover:opacity-90 transition duration-700 w-72 md:w-96 rounded-2xl border-2 border-amber-400/30 shadow-2xl backdrop-blur-sm'
  },
  {
    type: 'ship',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    position: 'top-[48%] -right-12',
    animation: 'animate-ship-sway opacity-25 hover:opacity-90 transition duration-700 w-80 md:w-[28rem] rounded-2xl border-2 border-amber-400/30 shadow-2xl backdrop-blur-sm'
  },
  {
    type: 'ship',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    position: 'top-[82%] -left-16',
    animation: 'animate-ship-sway opacity-30 hover:opacity-90 transition duration-700 w-72 md:w-[26rem] rounded-2xl border-2 border-amber-400/30 shadow-2xl backdrop-blur-sm'
  },

  // 2. Sparkling Diamonds & Gems
  {
    type: 'diamond',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80',
    position: 'top-[22%] left-[6%]',
    animation: 'animate-bounce [animation-duration:6s] opacity-80 w-24 md:w-32 rounded-2xl border border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.8)]'
  },
  {
    type: 'diamond',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
    position: 'top-[62%] left-[4%]',
    animation: 'animate-pulse [animation-duration:4s] opacity-85 w-28 md:w-36 rounded-2xl border border-amber-400/50 shadow-[0_0_35px_rgba(245,158,11,0.9)]'
  },

  // 3. Money, Gold Coins & Treasure Chests
  {
    type: 'treasure',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    position: 'top-[35%] right-[5%]',
    animation: 'animate-pulse [animation-duration:5s] opacity-85 w-32 md:w-44 rounded-2xl border border-yellow-400/50 shadow-[0_0_40px_rgba(251,191,36,0.8)]'
  },
  {
    type: 'money',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
    position: 'top-[72%] right-[6%]',
    animation: 'animate-bounce [animation-duration:7s] opacity-80 w-28 md:w-40 rounded-2xl border border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.7)]'
  },

  // 4. Tropical Palm Trees & Island Landscapes
  {
    type: 'tree',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    position: 'top-[40%] left-[2%]',
    animation: 'opacity-35 hover:opacity-90 transition duration-500 w-60 md:w-72 rounded-3xl border border-amber-500/30 shadow-2xl'
  },
  {
    type: 'tree',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80',
    position: 'bottom-[8%] right-[3%]',
    animation: 'opacity-40 hover:opacity-90 transition duration-500 w-64 md:w-80 rounded-3xl border border-amber-500/30 shadow-2xl'
  }
];

const TREASURE_CARDS = [
  {
    id: 'hidden-treasure',
    title: '💎 Hidden Treasure',
    icon: Gem,
    gradient: 'from-amber-400 via-amber-500 to-yellow-600',
    desc: 'Uncover secret discounts on flagship OLED TVs & Side-by-Side Fridges reserved for Gokuldham VIPs.'
  },
  {
    id: 'secret-maps',
    title: '🗺️ Secret Maps',
    icon: Map,
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    desc: 'Chart your journey across special combo offers and festival exchange schemes crafted by Bagha & Nattu Kaka.'
  },
  {
    id: 'pirate-adventures',
    title: '⚓ Pirate Adventures',
    icon: Anchor,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    desc: 'Embark on daily flash sales where electronics prices drop faster than a ship anchor at high noon!'
  },
  {
    id: 'mystery-islands',
    title: '🏝️ Mystery Islands',
    icon: Palmtree,
    gradient: 'from-purple-400 via-pink-500 to-amber-600',
    desc: 'Discover mysterious island deals on high-speed laptops, 5G smartphones, and smart washing machines.'
  }
];

const ISLAND_LOCATIONS = [
  { id: 'hero', name: 'Captain\'s Quarters', icon: Compass, color: 'from-amber-400 to-amber-600', desc: 'Jethalal\'s Welcome' },
  { id: 'tv-kingdom', name: 'TV & Display Kingdom', icon: Tv, color: 'from-sky-400 to-blue-600', desc: 'OLED & 4K Smart Screens' },
  { id: 'fridge-island', name: 'Chill & Refrigerator Isle', icon: Refrigerator, color: 'from-teal-400 to-emerald-600', desc: 'Double Door & Inverters' },
  { id: 'mobile-cove', name: 'Smartphone Cove', icon: Smartphone, color: 'from-purple-400 to-indigo-600', desc: 'Flagship & 5G Devices' },
  { id: 'ac-oasis', name: 'Cooling AC Oasis', icon: Wind, color: 'from-cyan-400 to-sky-600', desc: 'Dual Inverter Split ACs' },
  { id: 'washing-wharf', name: 'Washing Wharf', icon: WashingMachine, color: 'from-blue-400 to-indigo-600', desc: 'Front & Top Load Washers' },
  { id: 'laptop-bay', name: 'Laptop & Tech Bay', icon: Laptop, color: 'from-amber-300 to-orange-500', desc: 'Gaming & Workstation PCs' }
];

const PRODUCTS = [
  {
    id: 1,
    category: 'tv-kingdom',
    name: 'Bapu-G Ultra HD 4K Smart OLED TV (65")',
    brand: 'Gada Vision',
    originalPrice: '₹1,24,999',
    discountPrice: '₹79,990',
    discountPct: '36% OFF',
    tagline: 'Crystal clear picture, like seeing Gokuldham in 8K!',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    specs: ['65 Inch 4K OLED', '120Hz Refresh Rate', 'Dolby Atmos Audio', 'Built-in Voice AI']
  },
  {
    id: 2,
    category: 'tv-kingdom',
    name: 'Sundar-Vision QLED Curved Cinema TV (55")',
    brand: 'Gada Electronics',
    originalPrice: '₹84,999',
    discountPrice: '₹49,990',
    discountPct: '41% OFF',
    tagline: 'Straight from Ahmedabad! Maximum display clarity!',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    specs: ['55 Inch Quantum Dot', 'HDR10+ Gold', '40W Front Soundbar', 'Zero Bezel Design']
  },
  {
    id: 3,
    category: 'fridge-island',
    name: 'Jethalal Super-Cool Double Door Refrigerator',
    brand: 'Gada Frost',
    originalPrice: '₹68,990',
    discountPrice: '₹42,990',
    discountPct: '37% OFF',
    tagline: 'Keeps Jalebi-Fafda fresh for days without losing taste!',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    specs: ['450 Litres Capacity', 'Convertible 5-in-1', 'Digital Inverter Compressor', '10 Year Warranty']
  },
  {
    id: 4,
    category: 'fridge-island',
    name: 'Taarak Master Frost Side-by-Side Smart Refrigerator',
    brand: 'Gada Frost',
    originalPrice: '₹1,12,000',
    discountPrice: '₹74,990',
    discountPct: '33% OFF',
    tagline: 'Diet food stays crisp and fresh all week long!',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    specs: ['670 Litres Capacity', 'Water & Ice Dispenser', 'Smart ThinQ WiFi', 'Door-in-Door Access']
  },
  {
    id: 5,
    category: 'mobile-cove',
    name: 'Babita-G Special Edition 5G Smartphone',
    brand: 'Gada Mobile',
    originalPrice: '₹79,999',
    discountPrice: '₹54,999',
    discountPct: '31% OFF',
    tagline: 'Stunning photos that impress everyone instantly!',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    specs: ['200MP Camera Sensor', '16GB RAM + 512GB Storage', '120Hz AMOLED Screen', '68W Turbo Charging']
  },
  {
    id: 6,
    category: 'mobile-cove',
    name: 'Bagha-Tech Unlimited Power 5G Phone',
    brand: 'Gada Mobile',
    originalPrice: '₹29,999',
    discountPrice: '₹18,490',
    discountPct: '38% OFF',
    tagline: 'Ji Jethalal Ji! Battery lasts for 3 full days!',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    specs: ['6000 mAh Monster Battery', 'Snapdragon Processor', '6.7" HD+ Screen', 'Dual AI Camera']
  },
  {
    id: 7,
    category: 'ac-oasis',
    name: 'Daya Tapu Chill 1.5 Ton 5-Star Dual Inverter AC',
    brand: 'Gada Air',
    originalPrice: '₹58,990',
    discountPrice: '₹36,990',
    discountPct: '37% OFF',
    tagline: 'Turns hot summer afternoon into cool Shimla weather!',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    specs: ['1.5 Ton 5-Star Rating', '100% Copper Condenser', '4-Way Auto Swing', 'PM 2.5 Air Filter']
  },
  {
    id: 8,
    category: 'washing-wharf',
    name: 'Nattu Kaka Express Front Load Washer (8 kg)',
    brand: 'Gada Clean',
    originalPrice: '₹44,990',
    discountPrice: '₹28,990',
    discountPct: '35% OFF',
    tagline: 'Salary hike performance in cleaning every stain!',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    specs: ['8 kg Steam Wash', '1400 RPM High Speed', 'Inverter Direct Drive', 'In-built Heater']
  },
  {
    id: 9,
    category: 'laptop-bay',
    name: 'Tapu Sena Gaming & Workstation Laptop',
    brand: 'Gada Byte',
    originalPrice: '₹98,990',
    discountPrice: '₹67,990',
    discountPct: '31% OFF',
    tagline: 'High speed performance for coding, gaming, and projects!',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    specs: ['Intel Core i7 13th Gen', '16GB DDR5 RAM', '1TB NVMe SSD', 'RTX 4060 GPU']
  }
];

function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Ocean/Pirate intro sound
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        // Autoplay policy fallback
      }
    };
    playAudio();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onComplete]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-10 px-4 select-none overflow-hidden bg-slate-950"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105"
        style={{ backgroundImage: `url('/pirate-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70 z-10 pointer-events-none" />

      {/* Intro Header & Audio Toggle */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-between px-4">
        <span className="text-amber-200/90 font-mono text-xs uppercase tracking-[0.3em] font-bold bg-slate-950/80 border border-amber-500/40 px-5 py-2 rounded-full backdrop-blur-md shadow-2xl">
          1. Loading / Intro
        </span>

        <button
          onClick={toggleSound}
          className="bg-slate-950/80 border border-amber-500/50 text-amber-300 p-2.5 rounded-full hover:bg-amber-500 hover:text-slate-950 transition duration-300 backdrop-blur-md shadow-2xl flex items-center space-x-2 px-4"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          <span className="text-xs font-mono">{isMuted ? 'Muted' : 'Playing Sound'}</span>
        </button>
      </div>

      <div className="relative z-20 text-center max-w-3xl mx-auto my-auto flex flex-col items-center px-4">
        <div className="relative mb-6">
          <svg 
            className="w-20 h-20 md:w-24 md:h-24 text-amber-400 animate-spin [animation-duration:25s] filter drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.3 4.3M14.1 14.1l4.3 4.3M5.6 18.4l4.3-4.3M14.1 9.9l4.3-4.3" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 uppercase leading-tight drop-shadow-[0_8px_16px_rgba(0,0,0,1)]">
          Gada Treasure
        </h1>
        <p className="text-amber-200/90 font-serif text-sm md:text-lg tracking-[0.3em] mt-3 uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,1)] font-semibold">
          by Gada Electronics
        </p>
      </div>

      <div className="relative z-20 w-full max-w-md mx-auto text-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-full bg-slate-950/90 border border-amber-500/40 h-4 rounded-full overflow-hidden p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.3)] backdrop-blur-md">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-75"
            style={{ left: `calc(${Math.min(Math.max(progress, 5), 95)}% - 16px)` }}
          >
            <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/60">
              <svg className="w-4 h-4 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1 pt-1">
          <p className="text-amber-300 font-serif text-xs md:text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-bold">
            Preparing the ship & audio...
          </p>
          <p className="text-amber-200/80 text-[11px] font-mono font-medium">
            The treasure hunt is about to begin! ({progress}%)
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [queryText, setQueryText] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleAskAi = (e) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    
    setAiResponse("Bagha: Ji Jethalal Ji! Searching the Gada Treasure catalog for '" + queryText + "'... All products come with original brand seal and Gokuldham doorstep delivery!");
    setQueryText('');
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden bg-slate-950">
      
      {/* REALISTIC SCROLLING BACKGROUND ELEMENTS (MULTIPLE SHIPS, DIAMONDS, MONEY, TREES) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Dynamic Deep Ocean Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_50%_-20%,_#38bdf8_0%,_#0284c7_20%,_#0369a1_45%,_#0f172a_70%,_#020617_100%)] opacity-40" />

        {/* Realistic Background Image Cards Scattered Down Page */}
        {REALISTIC_BACKGROUND_ELEMENTS.map((elem, i) => (
          <div key={i} className={`absolute ${elem.position} ${elem.animation}`}>
            <img 
              src={elem.image} 
              alt={elem.type} 
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        ))}

        {/* Ambient Waves Effect */}
        <div className="absolute bottom-10 left-0 right-0 h-24 opacity-30 flex items-center justify-around animate-wave-move">
          <div className="w-full h-full bg-gradient-to-r from-sky-500/20 via-blue-600/40 to-sky-500/20 rounded-full blur-2xl" />
        </div>
      </div>

      {/* FLOATING SHIP BADGE */}
      <div className="fixed bottom-24 right-4 md:right-10 z-30 pointer-events-none animate-ship-sway opacity-90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
        <div className="bg-amber-950/90 border-2 border-amber-400/60 p-3 rounded-2xl backdrop-blur-md flex items-center space-x-2 shadow-2xl">
          <Ship className="w-8 h-8 text-amber-400 animate-bounce" />
          <div className="text-[10px] font-mono text-amber-200">
            <span className="block font-bold text-amber-300">Gada Fleet 🏴‍☠️</span>
            <span>Sailing the Ocean...</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <main className="relative z-10 space-y-20 pb-36">
          
          {/* HEADER */}
          <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/30 px-6 py-4 shadow-2xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Ship className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="font-serif font-black text-amber-300 text-lg md:text-xl tracking-wider">
                      PIRATE ADVENTURE
                    </h2>
                    <Flag className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-[10px] text-sky-200 uppercase tracking-widest font-mono">
                    Gada Treasure by Gada Electronics
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-8 text-xs font-mono font-bold tracking-wider text-amber-200/90">
                <span className="hover:text-amber-400 cursor-default transition">Home</span>
                <span className="hover:text-amber-400 cursor-default transition">Treasure</span>
                <span className="hover:text-amber-400 cursor-default transition">Crew</span>
                <span className="hover:text-amber-400 cursor-default transition">Adventure</span>
                <span className="hover:text-amber-400 cursor-default transition">Contact</span>
              </div>

            </div>
          </header>

          {/* HERO SECTION */}
          <section id="hero" className="max-w-6xl mx-auto px-4 pt-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-950/85 backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_60px_rgba(2,6,23,0.9)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 rounded-full blur-md opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse" />
                    
                    <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-900">
                      <img 
                        src="/jethalal.jpg" 
                        alt="Captain Jethalal Gada" 
                        className="w-full h-full object-cover object-center scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>

                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                      <span className="bg-amber-400 text-slate-950 font-serif font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-lg tracking-widest border border-amber-200 flex items-center space-x-1">
                        <span>CAPTAIN JETHALAL</span>
                        <Flag className="w-3.5 h-3.5 text-slate-950" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-5 text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 bg-amber-950/80 border border-amber-400/50 px-4 py-1.5 rounded-full text-amber-300 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Proprietor: Gada Electronics, Powder Gali</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 leading-tight">
                    "Aa Dekho! Sabse Sasta, Sabse Accha — Gada Electronics Dhamaka Offers!"
                  </h1>

                  <p className="text-sky-100/90 text-sm md:text-base leading-relaxed font-normal">
                    Ahoy mateys! Scroll through the ocean waves to explore TVs, Fridges, Mobiles, and ACs handpicked directly by Captain Jethalal with guaranteed low prices and original warranties.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start text-xs font-medium text-amber-200">
                    <span className="bg-slate-900/90 border border-amber-400/40 px-3.5 py-1.5 rounded-xl">
                      💎 Zero Commission Prices
                    </span>
                    <span className="bg-slate-900/90 border border-sky-400/40 px-3.5 py-1.5 rounded-xl">
                      🚚 Free Home Setup
                    </span>
                    <span className="bg-slate-900/90 border border-emerald-400/40 px-3.5 py-1.5 rounded-xl">
                      🛡️ 1 Year Brand Warranty
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* TREASURE CARDS */}
          <section className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-2 mb-8">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
                🏴‍☠️ Pirate Booty & Vaults
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-amber-200">
                Explore The Four Treasure Vaults
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TREASURE_CARDS.map((card) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={card.id}
                    className="relative group rounded-3xl bg-slate-950/80 border border-amber-500/30 p-6 backdrop-blur-xl hover:border-amber-400 transition duration-300 flex flex-col justify-between shadow-xl"
                  >
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-slate-950 shadow-lg`}>
                        <IconComp className="w-6 h-6" />
                      </div>

                      <h3 className="font-serif font-bold text-lg text-amber-200">
                        {card.title}
                      </h3>

                      <p className="text-sky-200/80 text-xs leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 text-xs font-mono text-amber-400 flex items-center space-x-1">
                      <span>Swipe below to view</span>
                      <span>➔</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* TREASURE MAP SECTION */}
          <section className="max-w-6xl mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/80 via-slate-950/90 to-slate-950 p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
              
              <div className="text-center space-y-3 mb-10">
                <div className="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
                  <Compass className="w-4 h-4 animate-spin [animation-duration:12s]" />
                  <span>Dotted Ocean Route</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                  Old Parchment Treasure Map
                </h2>
                <p className="text-sky-200/80 text-xs md:text-sm max-w-xl mx-auto">
                  Follow the dotted route across the islands to discover where the greatest deals are marked with an "X".
                </p>
              </div>

              <div className="relative my-6 border-t-2 border-dashed border-amber-500/40 w-full flex justify-between items-center px-4">
                <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-amber-500 text-slate-950 font-black font-mono text-[10px] px-3 py-0.5 rounded-full shadow-lg">
                  X MARKS THE TREASURE
                </div>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-4 pt-4 no-scrollbar px-2 snap-x">
                {ISLAND_LOCATIONS.map((loc, idx) => {
                  const IconComp = loc.icon;
                  return (
                    <div
                      key={loc.id}
                      className="snap-center shrink-0 w-64 rounded-2xl bg-amber-950/40 border border-amber-500/30 p-5 backdrop-blur-xl hover:border-amber-400 transition duration-300 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${loc.color} flex items-center justify-center shadow-lg text-slate-950 font-bold`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 bg-slate-950/80 border border-amber-500/30 px-2 py-0.5 rounded-md">
                          STOP #{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-slate-100 text-sm">{loc.name}</h3>
                        <p className="text-sky-200/70 text-xs mt-1">{loc.desc}</p>
                      </div>

                      <div className="pt-1 flex items-center text-[11px] text-amber-400 font-mono">
                        <span>Scroll down to land</span>
                        <span className="ml-1">⚓</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ELECTRONICS PRODUCTS CATALOG */}
          <div className="max-w-6xl mx-auto px-4 space-y-20">
            {ISLAND_LOCATIONS.filter(loc => loc.id !== 'hero').map((island) => {
              const islandProducts = PRODUCTS.filter(p => p.category === island.id);
              const IslandIcon = island.icon;

              return (
                <section key={island.id} id={island.id} className="space-y-8 scroll-mt-24">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${island.color} flex items-center justify-center text-slate-950 shadow-xl`}>
                        <IslandIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-200">
                          {island.name}
                        </h2>
                        <p className="text-sky-200/80 text-xs md:text-sm">
                          {island.desc}
                        </p>
                      </div>
                    </div>

                    <span className="self-start md:self-auto font-mono text-xs text-amber-300 bg-slate-950/80 border border-amber-500/30 px-3 py-1.5 rounded-full">
                      Swipe across cards to compare ➔
                    </span>
                  </div>

                  <div className="flex space-x-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x">
                    {islandProducts.map((product) => (
                      <div
                        key={product.id}
                        className="snap-center shrink-0 w-80 md:w-96 rounded-3xl bg-slate-950/85 border border-amber-500/30 overflow-hidden backdrop-blur-xl shadow-2xl hover:border-amber-400 transition duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-56 bg-slate-900 overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover object-center transition duration-500 hover:scale-105"
                            />
                            
                            <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-xs font-mono px-3 py-1 rounded-full shadow-lg border border-amber-200">
                              {product.discountPct}
                            </div>

                            <div className="absolute top-3 right-3 bg-slate-950/80 text-sky-200 text-[11px] font-mono px-2.5 py-1 rounded-full border border-sky-400/30">
                              {product.brand}
                            </div>
                          </div>

                          <div className="p-6 space-y-4">
                            <div>
                              <h3 className="font-serif font-bold text-lg text-slate-100 line-clamp-1">
                                {product.name}
                              </h3>
                              <p className="text-amber-200/90 text-xs italic mt-1 font-serif">
                                "{product.tagline}"
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                              {product.specs.map((spec, idx) => (
                                <div key={idx} className="bg-sky-950/50 border border-sky-400/20 px-2.5 py-1 rounded-lg text-[11px] text-sky-200 font-mono flex items-center space-x-1">
                                  <span className="text-amber-400">•</span>
                                  <span className="truncate">{spec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 pt-0 border-t border-sky-400/10 mt-4 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-sky-200/60 line-through block font-mono">
                              {product.originalPrice}
                            </span>
                            <span className="text-xl font-serif font-black text-amber-300">
                              {product.discountPrice}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="inline-block bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono text-[11px] px-3 py-1 rounded-full">
                              In Stock at Store
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </section>
              );
            })}
          </div>

          {/* TRUST PROMISE */}
          <section className="max-w-6xl mx-auto px-4 pt-6">
            <div className="rounded-3xl bg-slate-950/85 border border-amber-500/30 p-8 md:p-12 text-center space-y-8 backdrop-blur-2xl">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-200">
                Gada Electronics Official Promise
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-sky-950/40 border border-sky-400/20 p-6 rounded-2xl space-y-2">
                  <ShieldCheck className="w-8 h-8 text-amber-400" />
                  <h3 className="font-serif font-bold text-slate-100">Original Brand Sealed</h3>
                  <p className="text-sky-200/70 text-xs leading-relaxed">
                    Every appliance comes directly from official manufacturers with full warranty cards and tax invoices.
                  </p>
                </div>

                <div className="bg-sky-950/40 border border-sky-400/20 p-6 rounded-2xl space-y-2">
                  <Truck className="w-8 h-8 text-sky-400" />
                  <h3 className="font-serif font-bold text-slate-100">Safe Home Transport</h3>
                  <p className="text-sky-200/70 text-xs leading-relaxed">
                    Delivered safely to your doorstep with trained technicians for hassle-free installation.
                  </p>
                </div>

                <div className="bg-sky-950/40 border border-sky-400/20 p-6 rounded-2xl space-y-2">
                  <RotateCcw className="w-8 h-8 text-emerald-400" />
                  <h3 className="font-serif font-bold text-slate-100">Easy Replacement</h3>
                  <p className="text-sky-200/70 text-xs leading-relaxed">
                    Complete support by Bagha and Nattu Kaka for instant service requests and query support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center text-xs text-sky-200/60 font-mono space-y-2 border-t border-sky-400/20 pt-8 max-w-6xl mx-auto px-4">
            <p>GADA TREASURE • POWERED BY GADA ELECTRONICS • POWDER GALI, MUMBAI</p>
            <p className="text-amber-300/80">Pirate Adventure Theme • Simple Scroll & Swipe Navigation Interface</p>
          </footer>

          {/* ASK AI ABOUT GADA ELECTRONICS BAR */}
          <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-950/95 border-t border-amber-500/40 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
            <div className="max-w-4xl mx-auto space-y-2">
              
              {aiResponse && (
                <div className="bg-amber-950/90 border border-amber-400/50 p-3 rounded-2xl text-xs font-mono text-amber-200 flex items-start space-x-2 animate-fade-in">
                  <Bot className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="flex-1">{aiResponse}</p>
                </div>
              )}

              <form onSubmit={handleAskAi} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                  <input
                    type="text"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Ask AI about Gada Electronics treasure deals, prices, warranty..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-amber-500/40 rounded-2xl text-xs text-slate-100 placeholder-sky-200/50 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 p-2.5 rounded-2xl transition duration-200 shadow-lg shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </main>
      )}
    </div>
  );
}