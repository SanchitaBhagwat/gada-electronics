import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const initAudio = async () => {
      try {
        // Create an AudioContext with standard 44100Hz sample rate
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx({ sampleRate: 44100 });
        audioCtxRef.current = ctx;

        // Fetch audio buffer directly
        const response = await fetch('/intro-sound.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        if (!isMounted) return;

        // Gain (Volume) control node
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.6;
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Source node
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(gainNode);
        sourceNodeRef.current = source;

        // Start playback
        source.start(0);
        isPlayingRef.current = true;

        // If browser started context in suspended state (autoplay block)
        if (ctx.state === 'suspended') {
          setIsMuted(true);
        }
      } catch (err) {
        console.warn("Audio Context init or Autoplay prevented:", err);
        setIsMuted(true);
      }
    };

    initAudio();

    // Global unlock on first user click/touch
    const unlockAudio = async () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
        setIsMuted(false);
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (audioCtxRef.current) {
              audioCtxRef.current.close();
            }
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [onComplete]);

  const toggleSound = () => {
    if (!gainNodeRef.current || !audioCtxRef.current) return;

    if (isMuted) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      gainNodeRef.current.gain.value = 0.6;
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.value = 0;
      setIsMuted(true);
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

      <div className="relative z-20 w-full max-w-4xl flex items-center justify-between px-4">
        <span className="text-amber-200/90 font-mono text-xs uppercase tracking-[0.3em] font-bold bg-slate-950/80 border border-amber-500/40 px-5 py-2 rounded-full backdrop-blur-md shadow-2xl">
          1. Loading / Intro
        </span>

        <button
          onClick={toggleSound}
          className="bg-slate-950/80 border border-amber-500/50 text-amber-300 p-2 rounded-full hover:bg-amber-500 hover:text-slate-950 transition duration-300 backdrop-blur-md shadow-2xl flex items-center space-x-2 px-3.5 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          <span className="text-[11px] font-mono">{isMuted ? 'Muted (Click anywhere)' : 'Playing'}</span>
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
            Preparing the ship...
          </p>
          <p className="text-amber-200/80 text-[11px] font-mono font-medium">
            The treasure hunt is about to begin! ({progress}%)
          </p>
        </div>
      </div>
    </motion.div>
  );
}