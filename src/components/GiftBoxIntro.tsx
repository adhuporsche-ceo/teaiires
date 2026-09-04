import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gem, Gift, Heart, ArrowRight } from 'lucide-react';
import { TeacherProfile } from '../types';
import { playGiftUnwrapSound } from '../utils/audio';
import { fireConfettiBurst } from '../utils/confetti';

interface GiftBoxIntroProps {
  profile: TeacherProfile;
  onUnwrapComplete: () => void;
}

export const GiftBoxIntro: React.FC<GiftBoxIntroProps> = ({ profile, onUnwrapComplete }) => {
  const [isUnwrapping, setIsUnwrapping] = useState(false);

  const handleUnwrap = (e: React.MouseEvent) => {
    if (isUnwrapping) return;
    setIsUnwrapping(true);
    playGiftUnwrapSound();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    fireConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 85);

    // After animation finishes, transition to main stage within 1 second
    setTimeout(() => {
      onUnwrapComplete();
    }, 1000);
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-4 overflow-hidden text-[#3D261D]">
      {/* Floating Gentle Academic Doodles in background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden text-[#C97B68]">
        <span className="absolute top-[8%] left-[10%] text-4xl select-none">✎</span>
        <span className="absolute top-[12%] right-[14%] text-4xl select-none">📚</span>
        <span className="absolute bottom-[16%] left-[8%] text-3xl select-none">∑</span>
        <span className="absolute bottom-[20%] right-[10%] text-4xl select-none">🍎</span>
        <span className="absolute top-[45%] left-[5%] text-2xl select-none">★</span>
        <span className="absolute top-[52%] right-[6%] text-3xl select-none">∞</span>
      </div>

      {/* Header Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3B1A6]/35 border border-[#E3B1A6] text-[#702418] text-xs uppercase tracking-[0.25em] font-bold mb-3 shadow-xs">
          <Gem className="w-3.5 h-3.5 text-[#C97B68]" />
          <span>A Special Tribute For You</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#3D261D] drop-shadow-xs">
          Not Just a Wish, But a Gift
        </h1>
        <p className="mt-2 text-[#7A5B53] text-sm sm:text-base max-w-md mx-auto font-sans">
          To {profile.name} — for every lesson taught with patience and every heart touched with kindness.
        </p>
      </motion.div>

      {/* 3D Interactive Gift Box */}
      <div className="relative z-10 perspective-1000 flex flex-col items-center">
        {/* Soft Pedestal Shadow */}
        <div className="absolute -bottom-8 w-64 h-12 bg-black/10 rounded-full blur-xl pointer-events-none" />

        <motion.div
          id="gift-box-wrapper"
          onClick={handleUnwrap}
          whileHover={{ scale: isUnwrapping ? 1 : 1.04, rotateZ: isUnwrapping ? 0 : 0.8 }}
          whileTap={{ scale: 0.98 }}
          className="relative cursor-pointer group select-none"
        >
          {/* Beaming rays when unwrapping */}
          <AnimatePresence>
            {isUnwrapping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 2.2, rotate: 180 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95 }}
                className="absolute -inset-20 z-0 pointer-events-none flex items-center justify-center"
              >
                <div className="w-96 h-96 rounded-full bg-gradient-to-r from-[#FADE9F]/60 via-[#FFE0DD]/60 to-[#DFE9E8]/60 blur-2xl" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gift Box Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Box Body */}
            <div className="absolute bottom-4 w-52 h-44 sm:w-60 sm:h-48 bg-gradient-to-br from-[#E3B1A6] via-[#F2EEE3] to-[#D08A74]/40 rounded-2xl shadow-[0_20px_45px_rgba(61,38,29,0.12),0_0_25px_rgba(208,138,116,0.3)] border-2 border-[#E3B1A6] overflow-hidden flex items-center justify-center">
              {/* Subtle inner box depth texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.7),transparent_60%)]" />

              {/* Vertical Ribbon on Body */}
              <div className="absolute w-12 h-full bg-gradient-to-r from-[#D08A74] via-[#C97B68] to-[#D08A74] shadow-sm border-x border-[#C97B68]/80" />
              {/* Horizontal Ribbon on Body */}
              <div className="absolute h-12 w-full bg-gradient-to-b from-[#D08A74] via-[#C97B68] to-[#D08A74] shadow-sm border-y border-[#C97B68]/80" />

              {/* Gold seal emblem on front */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#F2EEE3] via-[#E3B1A6] to-[#D08A74] shadow-md flex items-center justify-center border-2 border-white">
                <span className="text-2xl">🍎</span>
              </div>
            </div>

            {/* Box Lid (animates upward and rotates when opened) */}
            <motion.div
              animate={
                isUnwrapping
                  ? { y: -160, rotateX: -45, rotateZ: 15, opacity: 0 }
                  : { y: [0, -3, 0] }
              }
              transition={
                isUnwrapping
                  ? { duration: 0.9, ease: [0.36, 1.5, 0.6, 1] }
                  : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
              }
              className="absolute top-6 sm:top-5 w-56 h-16 sm:w-64 sm:h-18 bg-gradient-to-r from-[#E3B1A6] via-[#F2EEE3] to-[#E3B1A6] rounded-xl shadow-lg border-2 border-[#E3B1A6] flex items-center justify-center z-20"
            >
              {/* Vertical ribbon on lid */}
              <div className="absolute w-12 h-full bg-gradient-to-r from-[#D08A74] via-[#C97B68] to-[#D08A74] border-x border-[#C97B68]/80" />

              {/* Ribbon Bow on Top of Lid */}
              <div className="absolute -top-7 flex items-center justify-center">
                {/* Left bow loop */}
                <div className="w-10 h-8 bg-gradient-to-br from-[#D08A74] to-[#C97B68] rounded-full transform -rotate-35 shadow-sm border border-white" />
                {/* Right bow loop */}
                <div className="w-10 h-8 bg-gradient-to-bl from-[#D08A74] to-[#C97B68] rounded-full transform rotate-35 shadow-sm border border-white -ml-2" />
                {/* Bow center knot */}
                <div className="absolute w-6 h-6 rounded-full bg-gradient-to-b from-[#F2EEE3] to-[#D08A74] shadow-sm border border-[#D08A74]" />
              </div>
            </motion.div>

            {/* Gift Tag Attached with String */}
            <motion.div
              animate={isUnwrapping ? { opacity: 0, scale: 0.8 } : { rotate: [-2, 3, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -right-4 sm:-right-8 top-28 z-30 bg-[#F2EEE3] text-[#3D261D] p-3 rounded-xl shadow-[0_6px_25px_rgba(61,38,29,0.12)] border border-[#E3B1A6] max-w-[140px] transform rotate-6 pointer-events-none"
            >
              <div className="w-2.5 h-2.5 bg-[#D08A74] rounded-full mx-auto mb-1.5 border border-[#C97B68]" />
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#C97B68] border-b border-[#E3B1A6]/60 pb-1">
                To: {profile.name}
              </p>
              <p className="text-[11px] font-handwriting leading-tight mt-1 text-[#3D261D]/85">
                With gratitude for lighting our paths.
              </p>
              <p className="text-[9px] font-semibold text-[#C97B68] mt-1 pt-1 border-t border-[#E3B1A6]/60 truncate">
                {profile.studentName}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          id="unwrap-gift-btn"
          onClick={handleUnwrap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] hover:brightness-105 text-white font-sans font-bold text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(208,138,116,0.45)] transition-all border border-[#E3B1A6] cursor-pointer"
        >
          <Gift className="w-4 h-4 text-white" />
          <span>{isUnwrapping ? 'Opening Your Gift…' : 'Tap to Unwrap Gift'}</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </motion.button>

        <p className="mt-4 text-xs text-[#7A5B53] flex items-center gap-1.5 font-medium">
          <Heart className="w-3.5 h-3.5 text-[#C97B68] fill-current" />
          Crafted with love by your students
        </p>
      </div>
    </div>
  );
};
