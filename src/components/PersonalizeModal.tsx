import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, User, Heart, GraduationCap, Gem } from 'lucide-react';
import { TeacherProfile } from '../types';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TeacherProfile;
  onSave: (newProfile: TeacherProfile) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [gender, setGender] = useState<'female' | 'male'>(profile.gender);
  const [studentName, setStudentName] = useState(profile.studentName);
  const [subject, setSubject] = useState(profile.subject);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'Respected Faculty & Staff',
      title: title.trim() || 'Respected Faculty & Staff',
      gender,
      studentName: studentName.trim() || 'From the DA as a Student Ambassador',
      subject: subject.trim() || 'All Subjects',
      school: profile.school
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D3142]/40 backdrop-blur-sm select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white/95 border border-[#DFE9E8] rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(45,49,66,0.18)] text-[#2D3142] overflow-hidden"
      >
        {/* Top accent hairline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5E199] via-[#FFE0DD] to-[#DFE9E8] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#596073] hover:text-[#2D3142] hover:bg-[#FFE0DD]/30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#8A4A1C] text-xs font-bold uppercase tracking-[0.2em] mb-1">
          <Gem className="w-4 h-4 text-[#A66E19]" />
          <span>Personalize Your Gift</span>
        </div>
        <h3 className="font-serif-display text-2xl font-bold mb-4 text-[#2D3142]">
          Customize Recipient & Sender
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              type="button"
              onClick={() => {
                setName('Respected Faculty & Staff');
                setTitle('Respected Faculty & Staff');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                name === 'Respected Faculty & Staff'
                  ? 'bg-[#FADE9F] text-[#2D3142] border-[#F5E199] font-bold shadow-xs'
                  : 'bg-white border-[#DFE9E8] text-[#596073] hover:border-[#FADE9F] hover:bg-[#FFE0DD]/20'
              }`}
            >
              🏛️ Respected Faculty & Staff (Common)
            </button>
            <button
              type="button"
              onClick={() => {
                setName('Respected Educator & Mentor');
                setTitle('Respected Educator & Mentor');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                name === 'Respected Educator & Mentor'
                  ? 'bg-[#FADE9F] text-[#2D3142] border-[#F5E199] font-bold shadow-xs'
                  : 'bg-white border-[#DFE9E8] text-[#596073] hover:border-[#FADE9F] hover:bg-[#FFE0DD]/20'
              }`}
            >
              🌟 Respected Educator
            </button>
            <button
              type="button"
              onClick={() => {
                setName('Dear Teachers & Staff');
                setTitle('Dear Teachers & Staff');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                name === 'Dear Teachers & Staff'
                  ? 'bg-[#FADE9F] text-[#2D3142] border-[#F5E199] font-bold shadow-xs'
                  : 'bg-white border-[#DFE9E8] text-[#596073] hover:border-[#FADE9F] hover:bg-[#FFE0DD]/20'
              }`}
            >
              🎓 Teachers & Staff
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#2D3142]/80 mb-1">
              Recipient Name / Honorific (e.g. Respected Faculty & Staff, Respected Educator, Dr. Sharma):
            </label>
            <input
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setTitle(e.target.value);
              }}
              required
              className="w-full bg-[#f8faf9] border border-[#DFE9E8] rounded-xl px-4 py-2.5 text-sm text-[#2D3142] placeholder-[#596073]/50 focus:outline-none focus:border-[#FADE9F] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#2D3142]/80 mb-1">
                Avatar Appearance:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-[#FADE9F] text-[#2D3142] border-[#F5E199] font-bold shadow-xs'
                      : 'bg-white border-[#DFE9E8] text-[#596073] hover:border-[#FADE9F]'
                  }`}
                >
                  <span>Female</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-[#FADE9F] text-[#2D3142] border-[#F5E199] font-bold shadow-xs'
                      : 'bg-white border-[#DFE9E8] text-[#596073] hover:border-[#FADE9F]'
                  }`}
                >
                  <span>Male</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2D3142]/80 mb-1">
                Subject (Optional):
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
                className="w-full bg-[#f8faf9] border border-[#DFE9E8] rounded-xl px-4 py-2.5 text-sm text-[#2D3142] placeholder-[#596073]/50 focus:outline-none focus:border-[#FADE9F] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#2D3142]/80 mb-1">
              Presented By / Student Name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="e.g. Your Grateful Student / Class of 2026"
              className="w-full bg-[#f8faf9] border border-[#DFE9E8] rounded-xl px-4 py-2.5 text-sm text-[#2D3142] placeholder-[#596073]/50 focus:outline-none focus:border-[#FADE9F] transition-all"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#FFE0DD]/30 border border-[#DFE9E8] text-[#596073] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#FADE9F] hover:bg-[#F5E199] text-[#2D3142] text-xs font-bold uppercase tracking-widest shadow-[0_4px_15px_rgba(250,222,159,0.7)] border border-[#F5E199] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Apply to Gift</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
