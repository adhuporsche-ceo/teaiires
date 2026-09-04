import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gem,
  Heart,
  ChevronRight,
  Volume2,
  Code2,
  Star,
  Sun,
  Smile,
  BookOpen
} from 'lucide-react';
import { TeacherProfile } from '../types';
import { playChimeNote, getSoundMuted } from '../utils/audio';
import { fireConfettiBurst } from '../utils/confetti';

interface AnimatedThanksProps {
  profile: TeacherProfile;
  onNextKeepsake: () => void;
  onEditProfile: () => void;
}

interface FloatingThanksBubble {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export const AnimatedThanks: React.FC<AnimatedThanksProps> = ({
  profile,
  onNextKeepsake
}) => {
  const [thanksCount, setThanksCount] = useState(0);
  const [activeReasonIndex, setActiveReasonIndex] = useState<number | null>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [floatingBubbles, setFloatingBubbles] = useState<FloatingThanksBubble[]>([]);

  const reasons = [
    {
      icon: <Star className="w-5 h-5 text-[#8A4A1C]" />,
      title: 'For Boundless Patience',
      message: 'When questions were hard and days were long, your gentle smile never wavered.',
      bg: 'bg-[#FFE0DD]/60',
      border: 'border-[#FFE0DD]'
    },
    {
      icon: <Sun className="w-5 h-5 text-[#8A4A1C]" />,
      title: 'For Sparking Curiosity',
      message: 'You showed us that learning is not a chore, but an unforgettable adventure into the world.',
      bg: 'bg-[#FADE9F]/50',
      border: 'border-[#F5E199]'
    },
    {
      icon: <Heart className="w-5 h-5 text-[#8A4A1C]" />,
      title: 'For Believing In Us',
      message: 'Whenever we doubted our abilities, you reminded us of the wings we were yet to unfold.',
      bg: 'bg-[#DFE9E8]/60',
      border: 'border-[#DFE9E8]'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#8A4A1C]" />,
      title: 'For Guiding Our Future',
      message: 'The values, courage, and wisdom you instilled will guide our footsteps forever.',
      bg: 'bg-[#F5E199]/40',
      border: 'border-[#F5E199]'
    }
  ];

  const handleSendThanks = (e: React.MouseEvent) => {
    setThanksCount(prev => prev + 1);

    // Audio chime arpeggio
    playChimeNote(523.25, 0, 1.2, 0.15); // C5
    playChimeNote(659.25, 0.08, 1.2, 0.15); // E5
    playChimeNote(783.99, 0.16, 1.3, 0.18); // G5
    playChimeNote(1046.50, 0.24, 1.5, 0.25); // C6

    // Confetti burst
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    fireConfettiBurst(originX, originY, 45);

    // Spawn floating praise bubble
    const phrases = [
      `Thank You, ${profile.name}! 💖`,
      'Best Teacher Ever! 💎',
      'Endless Gratitude! 🌟',
      'You Inspire Us! 🌸',
      'A True Hero! ✨'
    ];
    const chosenPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const colors = ['#FFE0DD', '#FADE9F', '#DFE9E8', '#FCEAE7'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const newBubble: FloatingThanksBubble = {
      id: Date.now() + Math.random(),
      text: chosenPhrase,
      x: originX + (Math.random() * 120 - 60),
      y: originY,
      color: chosenColor
    };

    setFloatingBubbles(prev => [...prev.slice(-8), newBubble]);

    setTimeout(() => {
      setFloatingBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 2200);
  };

  const handlePlaySpokenThanks = () => {
    if (isSpeaking) return;

    // Musical intro
    playChimeNote(587.33, 0, 1.2, 0.15); // D5
    playChimeNote(880.00, 0.1, 1.4, 0.2); // A5

    if ('speechSynthesis' in window && !getSoundMuted()) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(
        `Thank you so very much, ${profile.name}! Thank you for your wisdom, your warmth, and for shaping our lives with love and inspiration. Happy Teacher's Day!`
      );
      speech.rate = 0.95;
      speech.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const warmVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (warmVoice) speech.voice = warmVoice;

      setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      speech.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2500);
    }
  };

  const letters = ['T', 'H', 'A', 'N', 'K', 'S'];

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden">
      {/* Floating Gratitude Bubbles Portal */}
      <AnimatePresence>
        {floatingBubbles.map(b => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, y: -160, scale: 1.08 }}
            exit={{ opacity: 0, y: -220, scale: 0.8 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: `${b.x}px`,
              top: `${b.y}px`,
              pointerEvents: 'none',
              zIndex: 99
            }}
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-[#2D3142] border border-white/80 shadow-lg backdrop-blur-xs whitespace-nowrap"
          >
            <div
              className="absolute inset-0 rounded-full -z-10 opacity-95"
              style={{ backgroundColor: b.color }}
            />
            {b.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header Badge & Title */}
      <div className="text-center mb-6 z-10">
        <div className="inline-flex items-center gap-2 text-[#8A4A1C] text-xs tracking-[0.25em] uppercase font-bold mb-1">
          <Gem className="w-3.5 h-3.5 text-[#A66E19]" />
          <span>Keepsake 3 of 4 • Animated Heartfelt Thanks</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#2D3142] font-bold drop-shadow-xs">
          A Thousand Thanks to You, {profile.name}!
        </h2>
        <p className="text-xs sm:text-sm text-[#596073] mt-1 max-w-md mx-auto">
          Every lesson you taught, every encouraging word you gave, helped us grow into who we are today.
        </p>
      </div>

      {/* Animated Centerpiece: Floating Waving "THANKS" Letters */}
      <div className="relative flex flex-col items-center my-3 z-10">
        {/* Soft Background Radial Glow */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-[#FFE0DD]/40 via-[#FADE9F]/40 to-[#DFE9E8]/40 blur-3xl -z-10 animate-pulse" />

        {/* Animated Letter Tiles */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-5">
          {letters.map((char, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{
                y: [0, -14, 0],
                rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: index * 0.18,
                ease: 'easeInOut'
              }}
              whileHover={{ scale: 1.25, rotate: 12 }}
              className="w-11 h-14 sm:w-16 sm:h-20 rounded-2xl bg-gradient-to-b from-white via-[#FFF8F0] to-[#FADE9F] border-2 border-[#DFE9E8] shadow-[0_8px_20px_rgba(45,49,66,0.08)] flex items-center justify-center cursor-pointer transition-shadow"
            >
              <span className="font-serif-display text-2xl sm:text-4xl font-extrabold text-[#8A4A1C] drop-shadow-xs">
                {char}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Pulsing Animated Heart & Thank You Trophy Emblem */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            y: [0, -4, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative px-6 py-4 rounded-3xl bg-white/90 border border-[#DFE9E8] shadow-[0_12px_35px_rgba(45,49,66,0.07)] backdrop-blur-md flex flex-col sm:flex-row items-center gap-4 max-w-lg text-center sm:text-left"
        >
          {/* Animated Heart Orb */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFE0DD] via-[#FADE9F] to-[#DFE9E8] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-7 h-7 text-[#E26D5C] fill-[#FFE0DD]" />
            </motion.div>
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-[#A66E19] font-bold">
              Presented With Gratitude
            </p>
            <p className="font-serif-display text-base sm:text-lg font-bold text-[#2D3142]">
              "Thank You for lighting the path of knowledge."
            </p>
            <p className="text-xs text-[#596073] mt-0.5">
              From: <span className="font-semibold text-[#8A4A1C]">{profile.studentName}</span>
            </p>
          </div>

          {/* Voice Narration Button */}
          <button
            onClick={handlePlaySpokenThanks}
            className={`p-3 rounded-full transition-all border shrink-0 ${
              isSpeaking
                ? 'bg-[#FADE9F] text-[#2D3142] border-[#F5E199] shadow-md animate-pulse'
                : 'bg-white border-[#DFE9E8] text-[#8A4A1C] hover:bg-[#FFE0DD]/50'
            }`}
            title="Hear Spoken Thank You Message"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Interactive Reasons of Gratitude Carousel / Grid */}
      <div className="w-full max-w-2xl my-6 z-10">
        <p className="text-center text-xs uppercase tracking-widest text-[#596073] font-bold mb-3">
          Click A Note of Gratitude:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reasons.map((item, idx) => {
            const isSelected = activeReasonIndex === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveReasonIndex(idx);
                  playChimeNote(600 + idx * 80, 0, 1.1, 0.15);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? `${item.bg} ${item.border} shadow-[0_6px_20px_rgba(45,49,66,0.06)] ring-2 ring-[#8A4A1C]/20`
                    : 'bg-white border-[#DFE9E8] hover:border-[#FADE9F]'
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-white flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <h4 className="font-serif-display font-bold text-sm text-[#2D3142]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-[#596073] leading-relaxed">
                  {item.message}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Celebration Action Button */}
      <div className="flex flex-col items-center gap-2 my-2 z-10">
        <motion.button
          id="send-thanks-celebration-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSendThanks}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_25px_rgba(208,138,116,0.5)] border border-[#E3B1A6] cursor-pointer transition-all"
        >
          <Code2 className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>Send Gratitude & Confetti {thanksCount > 0 ? `(${thanksCount})` : ''}</span>
          <Smile className="w-4 h-4 text-white" />
        </motion.button>
        <span className="text-[11px] text-[#596073] italic">
          Click repeatedly to shower your teacher with joyful confetti!
        </span>
      </div>

      {/* Next Keepsake Button */}
      <div className="mt-8 flex items-center justify-center z-10">
        <button
          id="goto-garden-btn"
          onClick={onNextKeepsake}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#DFE9E8] hover:border-[#FADE9F] text-[#2D3142] font-serif-display text-sm sm:text-base shadow-[0_4px_20px_rgba(45,49,66,0.06)] hover:shadow-[0_6px_25px_rgba(250,222,159,0.35)] transition-all cursor-pointer"
        >
          <span>Open Final Keepsake: <strong className="text-[#8A4A1C]">The Gratitude Garden</strong></span>
          <ChevronRight className="w-4 h-4 text-[#8A4A1C] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
