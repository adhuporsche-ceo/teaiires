import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Play, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { playBootStartupSound } from '../utils/audio';
import distrobytezLogo from '../assets/images/distrobytez_logo_1788531014307.jpg';

interface DistroBytezBootScreenProps {
  onBootComplete: () => void;
}

const BOOT_LOGS = [
  'DISTROBYTEZ Core Engine 2026.09 (ARM/x86_64)',
  'Compiling runtime modules... All core subsystems initialized',
  'Initializing DistroBytez Code Engine & Graphics Pipeline',
  'Verifying secure cryptographic certificates... [VERIFIED]',
  'Loading Teacher\'s Day Keepsake Suite & Interactive Assets...',
  'Connecting DistroBytez High-Performance Audio Engine',
  'Optimizing visual contours & organic display buffers',
  'System fully loaded. Starting user experience...'
];

export const DistroBytezBootScreen: React.FC<DistroBytezBootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasStartedSound, setHasStartedSound] = useState(false);

  useEffect(() => {
    // Attempt startup chime sound on mount or user interaction
    const timerAudio = setTimeout(() => {
      if (!hasStartedSound) {
        try {
          playBootStartupSound();
          setHasStartedSound(true);
        } catch {
          // Audio autoplay may be prevented by browser until click
        }
      }
    }, 600);

    return () => clearTimeout(timerAudio);
  }, [hasStartedSound]);

  useEffect(() => {
    // Progress increment loop for realistic boot feel (approx 4.5 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onBootComplete();
          }, 450);
          return 100;
        }
        // Increment step
        const step = prev < 30 ? 6 : prev < 75 ? 4 : 8;
        return Math.min(100, prev + step);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  useEffect(() => {
    // Update log ticker as progress advances
    const targetLog = Math.min(
      BOOT_LOGS.length - 1,
      Math.floor((progress / 100) * BOOT_LOGS.length)
    );
    setLogIndex(targetLog);
  }, [progress]);

  const handleManualSkip = () => {
    if (!hasStartedSound) {
      try {
        playBootStartupSound();
      } catch {
        // Safe fallback
      }
    }
    setProgress(100);
    setTimeout(() => {
      onBootComplete();
    }, 200);
  };

  return (
    <motion.div
      id="distrobytez-boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#F2EEE3] text-[#3D261D] select-none overflow-hidden font-sans"
    >
      {/* Organic Background Terracotta Waves & Dunes from image.png */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Left Rose Dune (#E3B1A6) */}
          <path
            d="M -40 -40 L 420 -40 C 420 120, 390 220, 310 310 C 230 400, 150 420, 70 500 C 20 550, -20 580, -40 600 Z"
            fill="#E3B1A6"
            fillOpacity="0.85"
          />

          {/* Left Mid Terracotta Wave (#D08A74) */}
          <path
            d="M -40 260 C 50 270, 160 310, 260 380 C 370 460, 380 570, 300 660 C 230 740, 120 760, 30 830 C -10 860, -30 870, -40 880 Z"
            fill="#D08A74"
            fillOpacity="0.75"
          />

          {/* Bottom-Left Rust Dune (#C97B68) */}
          <path
            d="M -40 720 C 30 730, 80 770, 130 830 C 190 910, 260 930, 240 1020 L -40 1040 Z"
            fill="#C97B68"
            fillOpacity="0.9"
          />

          {/* Top-Right Soft Dune (#E4B2A8) */}
          <path
            d="M 1040 -40 L 720 -40 C 760 80, 810 130, 900 170 C 970 200, 1020 220, 1040 240 Z"
            fill="#E4B2A8"
            fillOpacity="0.7"
          />

          {/* Bottom-Right Terracotta Dunes (#D08A74 & #C97B68) */}
          <path
            d="M 1040 1040 L 560 1040 C 600 930, 660 860, 760 780 C 860 700, 900 640, 980 570 C 1010 540, 1030 530, 1040 520 Z"
            fill="#D08A74"
            fillOpacity="0.75"
          />
          <path
            d="M 1040 1040 L 680 1040 C 710 960, 770 900, 850 830 C 920 770, 950 720, 1010 650 C 1030 630, 1035 620, 1040 610 Z"
            fill="#C97B68"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      {/* Subtle Warm Radial Ambient Center Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(242,238,227,0.4)_60%,_rgba(209,138,116,0.15)_100%)] pointer-events-none" />

      {/* Top Header: System Status Bar */}
      <header className="relative z-10 w-full max-w-5xl px-6 pt-6 flex items-center justify-between text-xs text-[#7A5B53] font-mono tracking-wider">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2EEE3]/80 border border-[#E3B1A6]/60 backdrop-blur-md shadow-xs">
          <Code2 className="w-4 h-4 text-[#C97B68]" />
          <span className="font-semibold text-[#3D261D]">DISTROBYTEZ CORE v3.8</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2EEE3]/80 border border-[#E3B1A6]/60 backdrop-blur-md text-[#7A5B53]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C97B68]" />
            <span className="text-[11px] font-semibold">SECURE SYSTEM: ACTIVE</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2EEE3]/90 hover:bg-white border border-[#E3B1A6]/80 text-[#7A5B53] hover:text-[#3D261D] transition-colors cursor-pointer shadow-xs"
            title="Toggle Boot Sound"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C97B68]" />
                <span className="text-[11px] font-bold">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#C97B68]" />
                <span className="text-[11px] font-bold">MUTED</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Center: DISTROBYTEZ Official Emblem Logo & Swirling Orbit */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto px-4">
        {/* The DistroBytez Bronze Medal Flag Logo */}
        <motion.div
          className="relative mb-6 cursor-pointer"
          onClick={handleManualSkip}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          title="Click to Launch Immediately"
        >
          {/* Ambient Warm Halo */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-[#E3B1A6]/50 via-[#D08A74]/40 to-[#C97B68]/35 rounded-full blur-2xl opacity-90 animate-pulse" />

          {/* Bronze Circular Medallion Frame */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-[#8A4A1C] via-[#E8CD82] to-[#5A2E14] shadow-[0_15px_45px_rgba(201,123,104,0.45)] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#E8CD82] relative bg-[#1B1B22] shadow-inner">
              <img
                src={distrobytezLogo}
                alt="DISTROBYTEZ Official Emblem"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              {/* Subtle metallic sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Company Title & Code Symbol: DISTROBYTEZ */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Code Symbol Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#E3B1A6]/30 border border-[#E3B1A6] mb-2">
            <Code2 className="w-4 h-4 text-[#C97B68]" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#702418] uppercase font-bold">
              OFFICIAL SYSTEM RELEASE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-[#3D261D] via-[#702418] to-[#C97B68] drop-shadow-[0_2px_15px_rgba(201,123,104,0.35)] uppercase">
            DISTROBYTEZ
          </h1>

          {/* DEVELOPER - ADHITHYA */}
          <div className="mt-2.5 inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#E3B1A6]/40 border-2 border-[#D08A74] shadow-xs">
            <Code2 className="w-4 h-4 text-[#C97B68]" />
            <span className="text-xs sm:text-sm font-mono font-extrabold tracking-[0.25em] text-[#702418] uppercase">
              DEVELOPER — ADHITHYA
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-[#7A5B53] font-semibold tracking-[0.2em] uppercase">
            Empowering Digital Innovation • High-End Interactive Systems
          </p>
        </motion.div>

        {/* Swirling Orbiting Dots Spinner Styled in Terracotta Palette */}
        <div className="relative w-16 h-16 my-7 flex items-center justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-start justify-center"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 2.0,
                delay: i * 0.14,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#C97B68] shadow-[0_0_10px_#D08A74]" />
            </motion.div>
          ))}
        </div>

        {/* Progress Bar & Status Text Styled in Warm Dune Palette */}
        <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
          {/* Progress Bar Container */}
          <div className="w-full h-2 rounded-full bg-[#E3B1A6]/35 overflow-hidden mb-3 border border-[#E3B1A6]/80 p-[1px]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] shadow-[0_0_12px_rgba(201,123,104,0.6)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Dynamic Console Step Status */}
          <div className="flex items-center justify-between w-full text-[11px] font-mono text-[#7A5B53] px-1">
            <span className="truncate max-w-[260px] sm:max-w-[320px] text-[#3D261D] font-medium">
              &gt; {BOOT_LOGS[logIndex]}
            </span>
            <span className="font-bold text-[#C97B68] ml-2">{progress}%</span>
          </div>
        </div>
      </main>

      {/* Bottom Footer & Manual Skip Action */}
      <footer className="relative z-10 w-full max-w-5xl px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A5B53]">
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2EEE3]/80 border border-[#E3B1A6]/60 backdrop-blur-md">
            <Code2 className="w-3.5 h-3.5 text-[#C97B68]" />
            <span className="font-semibold text-[#3D261D]">DISTROBYTEZ SYSTEM ENGINE 2026 • DEV: ADHITHYA</span>
          </span>
          <span className="hidden md:inline-block">•</span>
          <span className="hidden md:inline-block text-[#7A5B53] font-medium">
            Teacher's Day Interactive Keepsake Suite
          </span>
        </div>

        {/* Instant Launch Button with Code Symbol Style */}
        <button
          id="btn-skip-boot"
          onClick={handleManualSkip}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] hover:brightness-105 text-white font-bold text-xs tracking-wider border border-[#E3B1A6] shadow-[0_4px_18px_rgba(201,123,104,0.45)] transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>Launch Now</span>
          <Play className="w-3.5 h-3.5 text-white fill-current" />
        </button>
      </footer>
    </motion.div>
  );
};

