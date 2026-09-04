import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Gem,
  Heart,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { TeacherProfile } from '../types';
import { playAppleCrackSound } from '../utils/audio';
import { fireConfettiBurst } from '../utils/confetti';

interface AppleKeepsakeProps {
  profile: TeacherProfile;
  onNextKeepsake: () => void;
}

export const AppleKeepsake: React.FC<AppleKeepsakeProps> = ({ profile, onNextKeepsake }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [showVoiceFallbackBtn, setShowVoiceFallbackBtn] = useState(false);

  const mouthIntervalRef = useRef<number | null>(null);
  const currentSentenceRef = useRef(0);

  // Customized sentences incorporating teacher's name/title
  const speechSentences = [
    `Hello ${profile.name}! Happy Teacher's Day to you.`,
    "On this special day, I want to pause for a moment and truly thank you for everything you do.",
    "Teaching is not just a job, it is a quiet kind of magic.",
    "You walk into a classroom every single day and turn ordinary lessons into moments that shape how we see the world.",
    "You give us more than just answers to exam questions, you give us the courage to ask better questions in the first place.",
    "When we did not understand something, you found another way to explain it, again and again, without ever making us feel small.",
    "When we made mistakes, you turned them into lessons instead of embarrassments.",
    "You noticed when someone was having a hard day, even when they said nothing at all.",
    "That kind of attention is rare, and it is a gift we do not always know how to thank you for.",
    "Years from now, we may forget the exact formulas, the dates, or the definitions we memorized.",
    "But we will remember how you made us feel capable, how you believed in us before we believed in ourselves.",
    "We will remember how patient you were with every question, every doubt, and every quiet struggle.",
    "Teachers like you build the foundation for everything that comes after: careers, confidence, curiosity, and character.",
    "So today, on Teacher's Day, we simply want to say thank you.",
    "Thank you for your patience. Thank you for your kindness.",
    "Thank you for showing up, fully, again and again, for students who may not always say it out loud.",
    `Happy Teacher's Day, ${profile.title}! We are forever lucky to have learned from you.`
  ];

  // Voice selection
  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    // Choose voice appropriate for teacher gender
    let match: SpeechSynthesisVoice | undefined;
    if (profile.gender === 'female') {
      match = voices.find(v => /female|zira|samantha|susan|karen|victoria|google us english/i.test(v.name));
    } else {
      match = voices.find(v => /male|david|george|daniel|alex|google uk english male/i.test(v.name));
    }
    if (!match) {
      match = voices.find(v => v.lang && v.lang.startsWith('en')) || voices[0];
    }
    setSelectedVoice(match || null);
    setVoicesLoaded(true);
  }, [profile.gender]);

  useEffect(() => {
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopMouthAnimation();
    };
  }, [loadVoices]);

  const startMouthAnimation = () => {
    if (mouthIntervalRef.current) clearInterval(mouthIntervalRef.current);
    mouthIntervalRef.current = window.setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 160);
  };

  const stopMouthAnimation = () => {
    if (mouthIntervalRef.current) {
      clearInterval(mouthIntervalRef.current);
      mouthIntervalRef.current = null;
    }
    setMouthOpen(false);
  };

  const speakSentenceAtIndex = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    if (index >= speechSentences.length) {
      stopMouthAnimation();
      setIsSpeaking(false);
      return;
    }

    currentSentenceRef.current = index;
    setCurrentSentenceIndex(index);

    const sentence = speechSentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.92;
    utterance.pitch = profile.gender === 'female' ? 1.15 : 0.95;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setShowVoiceFallbackBtn(false);
      startMouthAnimation();
    };

    utterance.onend = () => {
      if (currentSentenceRef.current < speechSentences.length - 1) {
        const nextIndex = currentSentenceRef.current + 1;
        speakSentenceAtIndex(nextIndex);
      } else {
        stopMouthAnimation();
        setIsSpeaking(false);
      }
    };

    utterance.onerror = () => {
      stopMouthAnimation();
      setIsSpeaking(false);
      setShowVoiceFallbackBtn(true);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Play animation sequence
  const startReveal = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopMouthAnimation();
    setIsOpen(false);
    setIsSpeaking(false);
    setCurrentSentenceIndex(0);

    setTimeout(() => {
      setIsOpen(true);
      playAppleCrackSound();
      fireConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 60);

      // Start speech after character pop
      setTimeout(() => {
        speakSentenceAtIndex(0);
      }, 700);
    }, 850);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startReveal();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      stopMouthAnimation();
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      startMouthAnimation();
    } else {
      speakSentenceAtIndex(currentSentenceIndex);
    }
  };

  const handleRestart = () => {
    startReveal();
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < speechSentences.length - 1) {
      speakSentenceAtIndex(currentSentenceIndex + 1);
    }
  };

  const handlePrevSentence = () => {
    if (currentSentenceIndex > 0) {
      speakSentenceAtIndex(currentSentenceIndex - 1);
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-3 sm:p-6 select-none">
      {/* Keepsake Indicator */}
      <div className="mb-3 flex items-center gap-2 text-[#8A4A1C] text-xs tracking-[0.25em] uppercase font-bold">
        <Gem className="w-3.5 h-3.5 text-[#A66E19]" />
        <span>Keepsake 1 of 4 • The Golden Apple of Wisdom</span>
      </div>

      {/* Main Stage */}
      <div className="relative w-full max-w-[500px] h-[360px] sm:h-[400px] flex items-end justify-center">
        {/* Ground shadow */}
        <div className="absolute bottom-4 w-64 sm:w-72 h-8 bg-[#2D3142]/10 rounded-full blur-xl" />

        {/* Animated Dropping & Cracking Apple Wrap */}
        <motion.div
          id="apple-wrapper"
          initial={{ y: -300, scale: 0.85, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 15,
            delay: 0.1
          }}
          className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center"
        >
          {/* Apple Stem */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-9 bg-gradient-to-b from-[#b88c28] to-[#694c0e] rounded-sm rotate-6 z-20 shadow-sm origin-bottom" />
          
          {/* Apple Leaf with soft sage glow */}
          <div className="absolute top-0 left-[53%] w-11 h-6 bg-gradient-to-tr from-[#9bb3b1] via-[#b8cac7] to-[#DFE9E8] rounded-tr-full rounded-bl-full -rotate-18 z-20 shadow-xs border border-white/60" />

          {/* Apple Core (inside) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-4 bg-gradient-to-b from-white to-[#FADE9F]/30 rounded-[50px/65px] z-10 shadow-inner flex items-center justify-center border border-[#DFE9E8]"
              >
                {/* Tiny Apple Seeds */}
                <div className="absolute top-[52%] left-[44%] w-2 h-3.5 bg-[#4a2e18] rounded-full rotate-12" />
                <div className="absolute top-[52%] right-[44%] w-2 h-3.5 bg-[#4a2e18] rounded-full -rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Apple Half */}
          <motion.div
            animate={
              isOpen
                ? { x: -75, y: 12, rotate: -28, opacity: 0.95 }
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: [0.36, 1.4, 0.5, 1] }}
            className="absolute top-6 left-0 w-1/2 h-[200px] bg-gradient-to-br from-[#e0533c] via-[#b83120] to-[#7a180d] rounded-l-[100px] shadow-[0_12px_30px_rgba(45,49,66,0.18)] origin-left z-20 border-l border-white/30"
            style={{
              clipPath:
                'polygon(0% 0%, 100% 0%, 92% 12%, 100% 24%, 88% 36%, 100% 48%, 91% 60%, 100% 72%, 93% 86%, 100% 100%, 0% 100%)'
            }}
          >
            {/* Glossy specular highlight */}
            <div className="absolute top-4 left-4 w-12 h-20 bg-white/25 rounded-full blur-[2px] transform -rotate-12" />
          </motion.div>

          {/* Right Apple Half */}
          <motion.div
            animate={
              isOpen
                ? { x: 75, y: 12, rotate: 28, opacity: 0.95 }
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: [0.36, 1.4, 0.5, 1] }}
            className="absolute top-6 right-0 w-1/2 h-[200px] bg-gradient-to-bl from-[#e0533c] via-[#b83120] to-[#7a180d] rounded-r-[100px] shadow-[0_12px_30px_rgba(45,49,66,0.18)] origin-right z-20 border-r border-black/20"
            style={{
              clipPath:
                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 7% 86%, 0% 72%, 9% 60%, 0% 48%, 12% 36%, 0% 24%, 8% 12%)'
            }}
          />

          {/* Teacher Character Pop-Up */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 50, scale: 0.4, opacity: 0 }}
                animate={{ y: -15, scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 16,
                  delay: 0.35
                }}
                className="absolute z-30 flex flex-col items-center"
              >
                {/* Cheerful Halo Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-14 whitespace-nowrap px-4 py-1.5 rounded-full bg-white/95 border border-[#DFE9E8] shadow-[0_4px_20px_rgba(45,49,66,0.08)] text-[#2D3142] font-serif-display font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <Gem className="w-3.5 h-3.5 text-[#A66E19]" />
                  <span>Hello {profile.name}! Happy Teacher's Day!</span>
                </motion.div>

                {/* Character Head */}
                <div className="relative w-20 h-20 bg-[#f0c49a] rounded-full shadow-md z-10 flex flex-col items-center">
                  {/* Hair based on gender */}
                  {profile.gender === 'female' ? (
                    <>
                      {/* Female Hair Top & Bun */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4a3324] rounded-full shadow-sm" />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[88px] h-14 bg-[#4a3324] rounded-t-full" />
                    </>
                  ) : (
                    <>
                      {/* Male Hair */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[86px] h-10 bg-[#3a281e] rounded-t-2xl" />
                    </>
                  )}

                  {/* Eyeglasses */}
                  <div className="absolute top-7 flex items-center gap-1 z-10">
                    <div className="w-6 h-5 border-2 border-[#2b2b2b] rounded-full bg-white/40 relative shadow-sm">
                      <div className="absolute top-0.5 left-1 w-2 h-1 bg-white/70 rounded-full" />
                    </div>
                    <div className="w-2.5 h-0.5 bg-[#2b2b2b] -mt-0.5" />
                    <div className="w-6 h-5 border-2 border-[#2b2b2b] rounded-full bg-white/40 relative shadow-sm">
                      <div className="absolute top-0.5 left-1 w-2 h-1 bg-white/70 rounded-full" />
                    </div>
                  </div>

                  {/* Rosy Cheeks */}
                  <div className="absolute top-11 left-2.5 w-3 h-2 bg-[#d94f3d]/35 rounded-full blur-[0.5px]" />
                  <div className="absolute top-11 right-2.5 w-3 h-2 bg-[#d94f3d]/35 rounded-full blur-[0.5px]" />

                  {/* Animated Speaking Mouth */}
                  <motion.div
                    animate={{
                      scaleY: mouthOpen ? 2.2 : 1,
                      scaleX: mouthOpen ? 1.15 : 1
                    }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-12.5 w-6 h-3 bg-[#7a3b2e] rounded-b-full shadow-inner"
                  />
                </div>

                {/* Character Body & Clothing */}
                <div className="relative w-28 h-24 bg-[#3E5C76] rounded-t-3xl -mt-2 shadow-md flex items-center justify-center border-t border-white/30">
                  {/* Collar / Tie */}
                  {profile.gender === 'female' ? (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#FFFFFF] rounded-b-xl shadow-xs" />
                  ) : (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-8 h-3.5 bg-[#FFFFFF] rounded-b-md" />
                      <div className="w-3 h-10 bg-[#e0533c] rounded-b-sm shadow-sm" />
                    </div>
                  )}

                  {/* Left Arm (Relaxed) */}
                  <div className="absolute top-2 -left-2 w-4 h-14 bg-[#3E5C76] rounded-full rotate-12" />
                  <div className="absolute top-14 -left-3 w-4.5 h-4.5 bg-[#f0c49a] rounded-full" />

                  {/* Right Arm (Enthusiastically Waving) */}
                  <motion.div
                    animate={{ rotate: [-20, -65, -20] }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                    className="absolute top-2 -right-2.5 w-4 h-14 bg-[#3E5C76] rounded-full origin-top"
                  >
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#f0c49a] rounded-full flex items-center justify-center">
                      <span className="text-[10px] select-none">👋</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Subtitles & Captions Card */}
      <div className="w-full max-w-xl mt-4 bg-white/95 border border-[#DFE9E8] backdrop-blur-md rounded-2xl p-5 text-center shadow-[0_6px_25px_rgba(45,49,66,0.06)] relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5E199] via-[#FFE0DD] to-[#DFE9E8] pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8A4A1C] tracking-[0.2em] uppercase">
              <span className={`w-2 h-2 rounded-full ${isSpeaking && !isPaused ? 'bg-[#FADE9F] animate-ping' : 'bg-[#FADE9F]'}`} />
              Speaking Words of Gratitude
            </span>
          </div>

          {/* Sound waves indicator */}
          <div className="flex items-center gap-1 h-4">
            {[1, 2, 3, 4, 5].map(bar => (
              <motion.div
                key={bar}
                animate={
                  isSpeaking && !isPaused
                    ? { height: [4, 16, 6, 14, 4] }
                    : { height: 4 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: bar * 0.1
                }}
                className="w-1 bg-[#FADE9F] rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Dynamic Sentence Text */}
        <p className="font-serif-display text-base sm:text-lg text-[#2D3142] leading-relaxed min-h-[56px] flex items-center justify-center italic">
          "{speechSentences[currentSentenceIndex]}"
        </p>

        {/* Speech Progress Bar */}
        <div className="w-full bg-[#DFE9E8]/60 h-2 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#F5E199] via-[#FADE9F] to-[#FFE0DD] h-full transition-all duration-300 rounded-full"
            style={{
              width: `${((currentSentenceIndex + 1) / speechSentences.length) * 100}%`
            }}
          />
        </div>

        {/* Sentence Counter */}
        <div className="flex items-center justify-between text-[11px] text-[#596073] mt-2">
          <span>Sentence {currentSentenceIndex + 1} of {speechSentences.length}</span>
          <span>From: <strong className="text-[#8A4A1C] font-bold">{profile.studentName}</strong></span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 z-20">
        <button
          onClick={handlePrevSentence}
          disabled={currentSentenceIndex === 0}
          className="p-2.5 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] disabled:opacity-30 disabled:pointer-events-none text-[#2D3142] transition-all shadow-xs"
          title="Previous sentence"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          id="speech-toggle-btn"
          onClick={handleTogglePlay}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FADE9F] hover:bg-[#F5E199] text-[#2D3142] font-sans font-bold text-xs uppercase tracking-widest shadow-[0_4px_15px_rgba(250,222,159,0.7)] transition-all active:scale-95 border border-[#F5E199] cursor-pointer"
        >
          {isSpeaking && !isPaused ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause Voice</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-[#8A4A1C]" />
              <span>{isPaused ? 'Resume Voice' : 'Play Voice Narration'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleNextSentence}
          disabled={currentSentenceIndex === speechSentences.length - 1}
          className="p-2.5 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] disabled:opacity-30 disabled:pointer-events-none text-[#2D3142] transition-all shadow-xs"
          title="Next sentence"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          id="apple-replay-btn"
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] text-[#2D3142] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          title="Replay apple drop animation"
        >
          <RotateCcw className="w-4 h-4 text-[#8A4A1C]" />
          <span>Replay 🍎</span>
        </button>
      </div>

      {/* Tap fallback notice if autoplay requires user tap */}
      {showVoiceFallbackBtn && (
        <button
          onClick={() => speakSentenceAtIndex(currentSentenceIndex)}
          className="mt-3 px-5 py-2 rounded-full bg-[#FADE9F] text-[#2D3142] text-xs font-bold uppercase tracking-widest animate-bounce shadow-md border border-[#F5E199]"
        >
          🔊 Tap here to allow speech audio
        </button>
      )}

      {/* Next Keepsake Button Banner */}
      <div className="mt-8 flex items-center justify-center">
        <button
          id="next-keepsake-btn"
          onClick={onNextKeepsake}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#DFE9E8] hover:border-[#FADE9F] text-[#2D3142] font-serif-display text-sm sm:text-base shadow-[0_4px_20px_rgba(45,49,66,0.06)] hover:shadow-[0_6px_25px_rgba(250,222,159,0.35)] transition-all cursor-pointer"
        >
          <span>Open Next Keepsake: <strong className="text-[#8A4A1C]">The Handwritten Letter</strong></span>
          <ChevronRight className="w-4 h-4 text-[#8A4A1C] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
