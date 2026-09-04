import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  RotateCcw,
  Copy,
  Check,
  Printer,
  Edit3,
  Gem,
  ChevronRight,
  Heart
} from 'lucide-react';
import { TeacherProfile } from '../types';
import { playStampSound } from '../utils/audio';
import { fireConfettiBurst } from '../utils/confetti';

interface HandwrittenLetterProps {
  profile: TeacherProfile;
  onNextKeepsake: () => void;
  onEditProfile: () => void;
}

export const HandwrittenLetter: React.FC<HandwrittenLetterProps> = ({
  profile,
  onNextKeepsake,
  onEditProfile
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStamped, setIsStamped] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullLetterText = `Dear ${profile.name},

Thank you for every lesson you taught with infinite patience, and every doubt you cleared without ever making us feel small.

You noticed when we were quietly struggling, and gave us the courage to keep going. You turned our mistakes into milestones instead of embarrassments.

You believed in us long before we believed in ourselves, and that belief has shaped who we are today.

Wishing you a Teacher's Day as extraordinary and meaningful as the difference you make every single day.

With deepest gratitude,
${profile.studentName}`;

  const typeTimeoutRef = useRef<number | null>(null);

  const startWriting = () => {
    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    setDisplayText('');
    setIsTyping(true);
    setIsStamped(false);

    let charIndex = 0;
    const typeNextChar = () => {
      if (charIndex >= fullLetterText.length) {
        setIsTyping(false);
        // Stamp wax seal shortly after writing completes
        setTimeout(() => {
          setIsStamped(true);
          playStampSound();
          fireConfettiBurst(window.innerWidth * 0.55, window.innerHeight * 0.65, 45);
        }, 350);
        return;
      }

      const currentChar = fullLetterText.charAt(charIndex);
      setDisplayText(fullLetterText.slice(0, charIndex + 1));
      charIndex++;

      // Natural pause at punctuation and paragraphs
      let delay = 22;
      if (currentChar === '\n') delay = 180;
      else if (currentChar === '.' || currentChar === ',') delay = 85;

      typeTimeoutRef.current = window.setTimeout(typeNextChar, delay);
    };

    typeNextChar();
  };

  useEffect(() => {
    startWriting();
    return () => {
      if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    };
  }, [profile.name, profile.studentName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-3 sm:p-6 select-none">
      {/* Keepsake Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 text-[#8A4A1C] text-xs tracking-[0.25em] uppercase font-bold mb-1">
          <Gem className="w-3.5 h-3.5 text-[#A66E19]" />
          <span>Keepsake 2 of 4 • Handcrafted Parchment Letter</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#2D3142] font-bold drop-shadow-xs">
          Words from the Heart
        </h2>
      </div>

      {/* Parchment Letter Container */}
      <div className="relative w-full max-w-xl perspective-1000">
        {/* Ambient Glow & Shadow underneath */}
        <div className="absolute -bottom-5 left-6 right-6 h-8 bg-[#2D3142]/10 rounded-full blur-xl" />
        <div className="absolute inset-0 bg-[#FADE9F]/20 rounded-2xl blur-2xl -z-10" />

        <motion.div
          initial={{ opacity: 0, rotate: -2, y: 30 }}
          animate={{ opacity: 1, rotate: -0.8, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative parchment-paper rounded-2xl p-6 sm:p-10 border border-[#DFE9E8] text-[#242b21] shadow-[0_15px_45px_rgba(45,49,66,0.08),0_0_25px_rgba(250,222,159,0.15)]"
        >
          {/* Top Ribbon */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-[#F5E199] via-[#FADE9F] to-[#edd187] text-[#8A4A1C] text-xs font-serif-display font-bold tracking-widest uppercase rounded-full shadow-md border border-[#F5E199] flex items-center gap-1.5 z-20">
            <Heart className="w-3 h-3 fill-current text-[#E26D5C]" />
            <span>Teacher's Day Tribute</span>
          </div>

          {/* Letter Title Header */}
          <div className="text-center border-b border-[#e8dfc8] pb-4 mb-4 mt-2">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2D3142]">
              A Letter of Gratitude
            </h3>
            <p className="text-xs text-[#596073] italic font-serif-display">
              Preserved in ink, remembered in heart
            </p>
          </div>

          {/* Typewriting Letter Body */}
          <div className="min-h-[290px] sm:min-h-[310px]">
            <p className="font-handwriting text-xl sm:text-2xl leading-[34px] text-[#2D3142] whitespace-pre-line">
              {displayText}
              {isTyping && (
                <span className="inline-block w-2.5 h-6 bg-[#2D3142] ml-1 animate-pulse align-middle" />
              )}
            </p>
          </div>

          {/* 3D Wax Seal Stamp */}
          <div className="relative flex justify-end mt-4">
            <motion.div
              initial={false}
              animate={
                isStamped
                  ? { scale: [2.5, 0.9, 1], rotate: [-20, 5, 0], opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FFE0DD] via-[#f5aba2] to-[#de6b5d] shadow-xl border-2 border-white flex items-center justify-center text-white"
            >
              {/* Wax Seal Edge Irregularities */}
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-[#de6b5d]/40 pointer-events-none" />
              {/* Inner Rim */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/60 flex flex-col items-center justify-center bg-white/20 shadow-inner">
                <span className="text-2xl sm:text-3xl">🍎</span>
                <span className="text-[8px] font-bold tracking-widest uppercase text-[#8A4A1C]">
                  VERIFIED
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Letter Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-10">
        <button
          id="replay-letter-btn"
          onClick={startWriting}
          disabled={isTyping}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] disabled:opacity-40 text-[#2D3142] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8A4A1C]" />
          <span>Write it again</span>
        </button>

        <button
          id="copy-letter-btn"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] text-[#2D3142] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8A4A1C]" />
              <span>Copy Letter</span>
            </>
          )}
        </button>

        <button
          id="print-letter-btn"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] text-[#2D3142] text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-[#8A4A1C]" />
          <span>Print Keepsake</span>
        </button>

        <button
          id="edit-letter-profile-btn"
          onClick={onEditProfile}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FADE9F] hover:bg-[#F5E199] text-[#2D3142] border border-[#F5E199] text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#8A4A1C]" />
          <span>Personalize Names</span>
        </button>
      </div>

      {/* Next Keepsake Button */}
      <div className="mt-8 flex items-center justify-center">
        <button
          id="goto-thanks-btn"
          onClick={onNextKeepsake}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#DFE9E8] hover:border-[#FADE9F] text-[#2D3142] font-serif-display text-sm sm:text-base shadow-[0_4px_20px_rgba(45,49,66,0.06)] hover:shadow-[0_6px_25px_rgba(250,222,159,0.35)] transition-all cursor-pointer"
        >
          <span>Open Next Keepsake: <strong className="text-[#8A4A1C]">Animated Heartfelt Thanks</strong></span>
          <ChevronRight className="w-4 h-4 text-[#8A4A1C] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
