import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Gem,
  Printer,
  ChevronRight,
  Heart,
  Star,
  CheckCircle2,
  Medal
} from 'lucide-react';
import { TeacherProfile } from '../types';
import { playChimeNote } from '../utils/audio';
import { fireConfettiBurst } from '../utils/confetti';

interface TrophyCertificateProps {
  profile: TeacherProfile;
  onNextKeepsake: () => void;
  onEditProfile: () => void;
}

export const TrophyCertificate: React.FC<TrophyCertificateProps> = ({
  profile,
  onNextKeepsake,
  onEditProfile
}) => {
  const [viewMode, setViewMode] = useState<'trophy' | 'certificate'>('trophy');
  const [applauseCount, setApplauseCount] = useState(0);

  const handleApplaud = () => {
    setApplauseCount(prev => prev + 1);
    playChimeNote(659.25, 0, 1.2, 0.2); // E5
    playChimeNote(830.61, 0.08, 1.2, 0.2); // G#5
    playChimeNote(987.77, 0.16, 1.4, 0.25); // B5
    playChimeNote(1318.51, 0.24, 1.6, 0.25); // E6
    fireConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 50);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-3 sm:p-6 select-none">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 text-[#8A4A1C] text-xs tracking-[0.25em] uppercase font-bold mb-1">
          <Gem className="w-3.5 h-3.5 text-[#A66E19]" />
          <span>Keepsake 3 of 4 • Lifetime Inspiration Award</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#2D3142] font-bold drop-shadow-xs">
          Recognizing Your True Magic
        </h2>
      </div>

      {/* Mode Switcher: 3D Trophy vs Official Certificate */}
      <div className="inline-flex p-1.5 rounded-full bg-white border border-[#DFE9E8] shadow-[0_4px_20px_rgba(45,49,66,0.06)] mb-6 z-10 backdrop-blur-md">
        <button
          onClick={() => setViewMode('trophy')}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            viewMode === 'trophy'
              ? 'bg-[#FADE9F] text-[#2D3142] shadow-xs font-bold border border-[#F5E199]'
              : 'text-[#596073] hover:text-[#2D3142] hover:bg-[#FFE0DD]/30'
          }`}
        >
          <Award className="w-4 h-4 text-[#8A4A1C]" />
          <span>Golden Trophy</span>
        </button>
        <button
          onClick={() => setViewMode('certificate')}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            viewMode === 'certificate'
              ? 'bg-[#FADE9F] text-[#2D3142] shadow-xs font-bold border border-[#F5E199]'
              : 'text-[#596073] hover:text-[#2D3142] hover:bg-[#FFE0DD]/30'
          }`}
        >
          <Medal className="w-4 h-4 text-[#8A4A1C]" />
          <span>Honorary Certificate</span>
        </button>
      </div>

      {/* Main Display: Trophy or Certificate */}
      {viewMode === 'trophy' ? (
        <div className="relative flex flex-col items-center">
          {/* Trophy Stage */}
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 flex flex-col items-center justify-center">
            {/* Ambient Golden Glow Behind */}
            <div className="absolute w-64 h-64 rounded-full bg-[#FADE9F]/30 blur-3xl -z-10 animate-pulse" />

            {/* Gleaming 3D Styled Trophy Cup */}
            <motion.div
              whileHover={{ rotateY: 10, scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* Cup Top Laurel Wreath */}
              <div className="relative flex items-center justify-center">
                {/* Left Cup Handle */}
                <div className="absolute -left-10 top-4 w-12 h-24 border-4 border-[#E8CD82] rounded-l-full bg-transparent shadow-sm" />
                {/* Right Cup Handle */}
                <div className="absolute -right-10 top-4 w-12 h-24 border-4 border-[#E8CD82] rounded-r-full bg-transparent shadow-sm" />

                {/* Cup Body */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-gradient-to-tr from-[#E8CD82] via-[#FADE9F] to-[#F5E199] rounded-b-[70px] shadow-xl border-2 border-white flex flex-col items-center justify-center overflow-hidden">
                  {/* Glossy specular shine */}
                  <div className="absolute top-0 left-3 w-8 h-32 bg-white/40 rounded-full blur-[3px] transform -rotate-15" />

                  {/* Star & Ribbon on cup */}
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#F5E199] flex items-center justify-center shadow-md">
                    <Star className="w-8 h-8 text-[#8A4A1C] fill-current" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#8A4A1C] uppercase mt-1">
                    EXCELLENCE
                  </span>
                </div>
              </div>

              {/* Cup Stem & Pedestal */}
              <div className="w-10 h-10 bg-gradient-to-r from-[#E8CD82] via-[#FADE9F] to-[#E8CD82] shadow-sm border-x border-[#F5E199]" />
              <div className="w-24 h-4 bg-gradient-to-r from-[#E8CD82] via-[#FADE9F] to-[#E8CD82] rounded-t-lg shadow-sm" />

              {/* Mahogany Wood Base */}
              <div className="relative w-56 sm:w-64 h-24 bg-gradient-to-br from-[#4A3B32] via-[#5C4D44] to-[#362A22] rounded-xl shadow-[0_12px_30px_rgba(45,49,66,0.18)] border border-[#6b584d] flex flex-col items-center justify-center p-3 text-center">
                {/* Engraved Brass Plaque */}
                <div className="w-full h-full bg-gradient-to-r from-[#F5E199] via-white to-[#FADE9F] rounded-lg p-2 border border-white shadow-inner flex flex-col items-center justify-center text-[#2D3142]">
                  <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#8A4A1C]">
                    TEACHER OF LIFELONG INFLUENCE
                  </p>
                  <p className="font-serif-display font-bold text-sm sm:text-base text-[#2D3142] truncate max-w-[200px]">
                    {profile.name}
                  </p>
                  <p className="text-[9px] font-medium text-[#596073]">
                    "A teacher affects eternity; they can never tell where their influence stops."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Praise & Applaud Button */}
          <div className="flex items-center gap-3 mt-4">
            <button
              id="applaud-teacher-btn"
              onClick={handleApplaud}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#FADE9F] hover:bg-[#F5E199] text-[#2D3142] font-sans font-bold text-xs uppercase tracking-widest shadow-[0_4px_15px_rgba(250,222,159,0.7)] border border-[#F5E199] active:scale-95 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#E26D5C] fill-current" />
              <span>Applaud {profile.name} {applauseCount > 0 ? `(${applauseCount})` : ''}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Official Certificate Display */
        <div className="relative w-full max-w-2xl perspective-1000">
          <div className="absolute -bottom-4 left-6 right-6 h-8 bg-[#2D3142]/10 rounded-full blur-xl" />
          <div className="absolute inset-0 bg-[#FADE9F]/20 rounded-2xl blur-2xl -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="parchment-paper rounded-2xl p-6 sm:p-10 border-4 border-double border-[#DFE9E8] text-[#2D3142] shadow-[0_15px_45px_rgba(45,49,66,0.08),0_0_30px_rgba(250,222,159,0.15)] relative"
          >
            {/* Ornate Corner Accents */}
            <div className="absolute top-2 left-2 text-[#E8CD82] text-xl select-none">❖</div>
            <div className="absolute top-2 right-2 text-[#E8CD82] text-xl select-none">❖</div>
            <div className="absolute bottom-2 left-2 text-[#E8CD82] text-xl select-none">❖</div>
            <div className="absolute bottom-2 right-2 text-[#E8CD82] text-xl select-none">❖</div>

            {/* Certificate Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#FADE9F]/30 border border-[#F5E199] flex items-center justify-center text-[#8A4A1C]">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#8A4A1C] font-bold">
                DISTINGUISHED EDUCATOR CITATION
              </p>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D3142] mt-1">
                Certificate of Inspiration
              </h3>
              <p className="text-xs italic text-[#596073] font-serif-display mt-0.5">
                "Docendo Discimus" — By Teaching, We Learn
              </p>
            </div>

            {/* Citation Statement */}
            <div className="text-center my-6 space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#596073]">
                This honorary gift of appreciation is proudly conferred upon:
              </p>
              <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#8A4A1C] border-b-2 border-[#DFE9E8] pb-2 max-w-md mx-auto">
                {profile.name}
              </p>
              <p className="text-xs sm:text-sm text-[#596073] leading-relaxed max-w-lg mx-auto font-serif-display italic">
                In recognition of your tireless dedication, infinite patience, and the gentle wisdom
                that turned difficult lessons into lifelong inspirations. You planted seeds of
                confidence and curiosity that will bloom forever.
              </p>
            </div>

            {/* Signature & Seal Block */}
            <div className="flex items-end justify-between pt-6 border-t border-[#DFE9E8] text-xs mt-6">
              <div className="text-center">
                <p className="font-handwriting text-xl text-[#2D3142] leading-none mb-1">
                  {profile.studentName}
                </p>
                <div className="w-32 border-b border-[#2D3142]/40" />
                <p className="text-[10px] text-[#596073] mt-1 uppercase tracking-wider">
                  Presented By Student
                </p>
              </div>

              {/* Gold Embossed Seal */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F5E199] via-[#FADE9F] to-[#E8CD82] shadow-md border-2 border-white flex flex-col items-center justify-center text-[#8A4A1C] p-1 text-center">
                <CheckCircle2 className="w-5 h-5 mb-0.5 text-[#8A4A1C]" />
                <span className="text-[7px] font-extrabold uppercase tracking-widest leading-tight">
                  HONOR & EXCELLENCE
                </span>
              </div>

              <div className="text-center">
                <p className="font-serif-display text-sm font-semibold text-[#2D3142]">
                  Teacher's Day
                </p>
                <div className="w-32 border-b border-[#2D3142]/40" />
                <p className="text-[10px] text-[#596073] mt-1 uppercase tracking-wider">
                  September Celebration
                </p>
              </div>
            </div>
          </motion.div>

          {/* Certificate Action Bar */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              id="print-cert-btn"
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] text-[#2D3142] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#8A4A1C]" />
              <span>Print / Save Certificate</span>
            </button>
            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FADE9F] hover:bg-[#F5E199] border border-[#F5E199] text-[#2D3142] text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <span>Change Recipient Name</span>
            </button>
          </div>
        </div>
      )}

      {/* Next Keepsake Button */}
      <div className="mt-8 flex items-center justify-center">
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
