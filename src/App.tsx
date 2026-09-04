import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Music,
  Volume2,
  VolumeX,
  Settings,
  Gem,
  Smile,
  BookOpen,
  Heart,
  RotateCcw,
  GraduationCap,
  Code2
} from 'lucide-react';
import { KeepsakeTab, TeacherProfile } from './types';
import { DistroBytezBootScreen } from './components/DistroBytezBootScreen';
import { GiftBoxIntro } from './components/GiftBoxIntro';
import { AppleKeepsake } from './components/AppleKeepsake';
import { HandwrittenLetter } from './components/HandwrittenLetter';
import { AnimatedThanks } from './components/AnimatedThanks';
import { GratitudeGarden } from './components/GratitudeGarden';
import { PersonalizeModal } from './components/PersonalizeModal';
import { PastelBackgroundShapes } from './components/PastelBackgroundShapes';
import {
  toggleMusicBox,
  getIsMusicBoxPlaying,
  setSoundMuted,
  getSoundMuted
} from './utils/audio';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [activeTab, setActiveTab] = useState<KeepsakeTab>('apple');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPersonalizeModal, setShowPersonalizeModal] = useState(false);

  const [profile, setProfile] = useState<TeacherProfile>({
    title: 'Respected Faculty & Staff',
    name: 'Respected Faculty & Staff',
    gender: 'female',
    studentName: 'From the DA as a Student Ambassador',
    subject: 'All Subjects',
    school: 'Our Beloved School'
  });

  const handleMusicToggle = () => {
    const playing = toggleMusicBox();
    setIsMusicPlaying(playing);
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (nextMuted) {
      setIsMusicPlaying(false);
    }
  };

  const handleNextKeepsake = () => {
    if (activeTab === 'apple') setActiveTab('letter');
    else if (activeTab === 'letter') setActiveTab('thanks');
    else if (activeTab === 'thanks' || activeTab === 'trophy') setActiveTab('garden');
    else if (activeTab === 'garden') setActiveTab('apple');
  };

  const handleRewrap = () => {
    setIsUnwrapped(false);
    setActiveTab('apple');
    if (isMusicPlaying) {
      toggleMusicBox();
      setIsMusicPlaying(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F2EEE3] text-[#3D261D] flex flex-col justify-between selection:bg-[#E3B1A6] selection:text-[#3D261D] relative overflow-x-hidden">
      {/* DISTROBYTEZ System Boot Screen */}
      <AnimatePresence mode="wait">
        {!hasBooted && (
          <DistroBytezBootScreen onBootComplete={() => setHasBooted(true)} />
        )}
      </AnimatePresence>

      {/* Exact Organic Shapes & Terracotta Contours from image.png */}
      <PastelBackgroundShapes />

      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-40 w-full px-4 py-3 bg-[#F2EEE3]/90 backdrop-blur-md border-b border-[#E3B1A6]/40 flex items-center justify-between shadow-[0_2px_15px_rgba(208,138,116,0.06)] relative">
        {/* Subtle accent hairline from palette */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] pointer-events-none" />

        {/* Left: Gift Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRewrap}
            className="flex items-center gap-2 text-left group"
            title="Rewrap Gift"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E3B1A6] to-[#D08A74] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(208,138,116,0.4)] group-hover:scale-105 transition-transform border border-[#D08A74]/60">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-serif-display text-sm sm:text-base font-bold text-[#3D261D] leading-tight">
                Teacher's Day Keepsake
              </p>
              <p className="text-[10px] text-[#C97B68] tracking-[0.2em] uppercase font-bold">
                For {profile.name}
              </p>
            </div>
          </button>
        </div>

        {/* Right Corner: Horizontal Role Badge & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Expanded Horizontal Mention of Role in Right Corner */}
          <div
            id="header-role-mention"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] border-2 border-[#D08A74] text-white text-xs sm:text-sm md:text-base font-bold whitespace-nowrap shadow-[0_4px_14px_rgba(208,138,116,0.35)] transition-all hover:scale-[1.02]"
            title="Role Mention"
          >
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2EEE3] shrink-0" />
            <span className="tracking-tight sm:tracking-normal font-bold">From the DA as a Student Ambassador</span>
          </div>

          {/* Quick Controls Grouped Within 1 Unified Section */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#F2EEE3]/95 border border-[#E3B1A6]/60 shadow-xs backdrop-blur-md">
          {/* Music Box Melody Toggle */}
          <button
            id="toggle-music-box-btn"
            onClick={handleMusicToggle}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full transition-all text-xs flex items-center gap-1.5 ${
              isMusicPlaying
                ? 'bg-[#D08A74] text-white shadow-[0_2px_8px_rgba(208,138,116,0.5)] font-bold'
                : 'text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/20'
            }`}
            title={isMusicPlaying ? 'Stop Music Box' : 'Play Music Box Lullaby'}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'text-white animate-bounce' : 'text-[#C97B68]'}`} />
            <span className="font-medium text-xs">
              {isMusicPlaying ? 'Music On' : 'Music Box'}
            </span>
          </button>

          <div className="w-[1px] h-3.5 bg-[#E3B1A6]/50 mx-0.5" />

          {/* Mute Audio */}
          <button
            id="toggle-sound-mute-btn"
            onClick={handleMuteToggle}
            className={`p-1.5 rounded-full transition-all ${
              isMuted
                ? 'bg-[#E3B1A6] text-[#702418]'
                : 'text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/20'
            }`}
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <div className="w-[1px] h-3.5 bg-[#E3B1A6]/50 mx-0.5" />

          {/* Personalize Button */}
          <button
            id="open-personalize-modal-btn"
            onClick={() => setShowPersonalizeModal(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/20 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Personalize Name & Sender"
          >
            <Settings className="w-3.5 h-3.5 text-[#C97B68]" />
            <span className="text-xs font-semibold">Personalize</span>
          </button>

          <div className="w-[1px] h-3.5 bg-[#E3B1A6]/50 mx-0.5" />

          {/* DistroBytez Boot Screen Replay */}
          <button
            id="replay-distrobytez-boot-btn"
            onClick={() => setHasBooted(false)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[#C97B68] hover:text-[#A85846] hover:bg-[#E3B1A6]/20 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Show DistroBytez OS Boot Screen"
          >
            <Code2 className="w-3.5 h-3.5 text-[#C97B68]" />
            <span className="hidden md:inline text-xs font-bold tracking-tight">DISTROBYTEZ Boot</span>
          </button>

          {isUnwrapped && (
            <>
              <div className="w-[1px] h-3.5 bg-[#E3B1A6]/50 mx-0.5" />
              <button
                onClick={handleRewrap}
                className="p-1.5 rounded-full text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/20 transition-all"
                title="Rewrap Gift Box"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col justify-center">
        {!isUnwrapped ? (
          <GiftBoxIntro
            profile={profile}
            onUnwrapComplete={() => setIsUnwrapped(true)}
          />
        ) : (
          <div className="w-full flex-1 flex flex-col">
            {/* Keepsakes Navigation Tabs Bar */}
            <div className="w-full px-4 pt-4 flex items-center justify-center">
              <nav
                className="inline-flex p-1.5 rounded-2xl bg-[#F2EEE3]/95 border border-[#E3B1A6]/50 shadow-[0_4px_25px_rgba(208,138,116,0.12)] backdrop-blur-md max-w-full overflow-x-auto"
                aria-label="Keepsake selection"
              >
                <button
                  id="tab-apple"
                  onClick={() => setActiveTab('apple')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'apple'
                      ? 'bg-[#D08A74] text-white shadow-[0_3px_12px_rgba(208,138,116,0.5)] font-bold border border-[#C97B68]'
                      : 'text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/25'
                  }`}
                >
                  <span className="text-base">🍎</span>
                  <span>1. The Golden Apple</span>
                </button>

                <button
                  id="tab-letter"
                  onClick={() => setActiveTab('letter')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'letter'
                      ? 'bg-[#D08A74] text-white shadow-[0_3px_12px_rgba(208,138,116,0.5)] font-bold border border-[#C97B68]'
                      : 'text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/25'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${activeTab === 'letter' ? 'text-white' : 'text-[#C97B68]'}`} />
                  <span>2. Parchment Letter</span>
                </button>

                <button
                  id="tab-thanks"
                  onClick={() => setActiveTab('thanks')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'thanks' || activeTab === 'trophy'
                      ? 'bg-[#D08A74] text-white shadow-[0_3px_12px_rgba(208,138,116,0.5)] font-bold border border-[#C97B68]'
                      : 'text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/25'
                  }`}
                >
                  <Smile className={`w-4 h-4 ${activeTab === 'thanks' || activeTab === 'trophy' ? 'text-white' : 'text-[#C97B68]'}`} />
                  <span>3. Animated Thanks</span>
                </button>

                <button
                  id="tab-garden"
                  onClick={() => setActiveTab('garden')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'garden'
                      ? 'bg-[#D08A74] text-white shadow-[0_3px_12px_rgba(208,138,116,0.5)] font-bold border border-[#C97B68]'
                      : 'text-[#7A5B53] hover:text-[#3D261D] hover:bg-[#E3B1A6]/25'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${activeTab === 'garden' ? 'text-white fill-white' : 'text-[#C97B68] fill-current'}`} />
                  <span>4. Gratitude Garden</span>
                </button>
              </nav>
            </div>

            {/* Keepsake Content with Motion Transition */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'apple' && (
                  <motion.div
                    key="apple"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <AppleKeepsake
                      profile={profile}
                      onNextKeepsake={handleNextKeepsake}
                    />
                  </motion.div>
                )}

                {activeTab === 'letter' && (
                  <motion.div
                    key="letter"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <HandwrittenLetter
                      profile={profile}
                      onNextKeepsake={handleNextKeepsake}
                      onEditProfile={() => setShowPersonalizeModal(true)}
                    />
                  </motion.div>
                )}

                {(activeTab === 'thanks' || activeTab === 'trophy') && (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <AnimatedThanks
                      profile={profile}
                      onNextKeepsake={handleNextKeepsake}
                      onEditProfile={() => setShowPersonalizeModal(true)}
                    />
                  </motion.div>
                )}

                {activeTab === 'garden' && (
                  <motion.div
                    key="garden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <GratitudeGarden
                      profile={profile}
                      onRestartExperience={handleRewrap}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Footer Tribute with Persistent Right Corner Role Mention */}
      <footer className="sticky bottom-0 z-30 w-full py-2.5 px-4 border-t border-[#E3B1A6]/40 text-xs text-[#7A5B53] flex flex-wrap items-center justify-between gap-3 bg-[#F2EEE3]/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(208,138,116,0.06)]">
        <div className="flex items-center gap-2">
          <Gem className="w-3.5 h-3.5 text-[#C97B68]" />
          <span className="tracking-wide font-medium text-[#3D261D]">Happy Teacher's Day • Forever Grateful</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div
            id="footer-role-mention"
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#E3B1A6] via-[#D08A74] to-[#C97B68] border-2 border-[#D08A74] text-white text-xs sm:text-sm md:text-base font-bold whitespace-nowrap shadow-[0_4px_16px_rgba(208,138,116,0.35)] transition-all hover:scale-[1.02]"
            title="Role Mention"
          >
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2EEE3] shrink-0" />
            <span className="font-bold">From the DA as a Student Ambassador</span>
          </div>
        </div>
      </footer>

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={showPersonalizeModal}
        onClose={() => setShowPersonalizeModal(false)}
        profile={profile}
        onSave={newProfile => setProfile(newProfile)}
      />
    </main>
  );
}
