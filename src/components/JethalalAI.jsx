import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles, Command, Anchor } from 'lucide-react';

export default function JethalalAI({ onSearch, activeFilterText }) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiMessage, setAiMessage] = useState(
    "Kem Cho! I am Captain Jethalal Gada. Type what treasure you need (e.g. 'laptop under 60000') and press ENTER!"
  );
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      setAiMessage(`Nonsense! Captain Jethalal is fetching the best deal for "${query}" right now!`);
      onSearch(query);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setAiMessage("Bapuji! Voice API isn't supported on this browser. Type your command!");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
      setAiMessage("Captain Jethalal is listening... Speak your desired treasure!");
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      setAiMessage(`Command received: "${transcript}". Press ENTER!`);
      onSearch(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-6 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="ocean-glass-panel rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-right opacity-10 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80')` }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-300 to-sky-300 p-1 shadow-xl shadow-amber-500/20">
              <img 
                src="/jethalal.jpg" 
                alt="Captain Jethalal Gada" 
                className="w-full h-full object-cover object-top rounded-xl border border-slate-950"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 font-bold font-serif text-[10px] px-2 py-0.5 rounded-full border border-slate-900 shadow flex items-center gap-0.5">
              <Anchor className="w-2.5 h-2.5" /> CAPTAIN
            </div>
          </div>

          <div className="flex-grow text-center md:text-left space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3 className="text-lg font-serif font-bold text-amber-300 tracking-wide">
                Captain Jethalal's AI Voice Command
              </h3>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" /> Ready
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-200 font-sans italic bg-slate-950/70 p-3 rounded-xl border border-amber-500/20">
              "{aiMessage}"
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center">
          <Command className="absolute left-4 text-amber-400 w-4 h-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command e.g. 'laptop under 60000'..."
            className="w-full bg-slate-950/90 text-amber-100 placeholder-slate-500 text-xs sm:text-sm pl-11 pr-24 py-3.5 rounded-2xl border border-amber-500/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
          />
          <div className="absolute right-3 flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-amber-400/80 bg-amber-500/10 border border-amber-500/30 rounded">
              Ctrl+K
            </kbd>
            <div 
              onClick={toggleVoice}
              className={`p-2 rounded-xl cursor-pointer transition-all ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/40' 
                  : 'text-amber-400 hover:bg-amber-500/20'
              }`}
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}