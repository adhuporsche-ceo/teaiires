import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gem,
  Plus,
  Heart,
  Pin,
  Send,
  RotateCcw,
  Check
} from 'lucide-react';
import { TeacherProfile, GratitudeNote } from '../types';
import { playChimeNote } from '../utils/audio';
import { fireConfettiBurst } from '../utils/confetti';

interface GratitudeGardenProps {
  profile: TeacherProfile;
  onRestartExperience: () => void;
}

const DEFAULT_NOTES: GratitudeNote[] = [
  {
    id: '1',
    author: 'From the DA as a Student Ambassador',
    message: 'On behalf of every student you have empowered and guided, thank you for your boundless dedication and kindness.',
    color: 'amber',
    rotation: -2,
    date: 'Sep 5'
  },
  {
    id: '2',
    author: 'Maya',
    message: 'You noticed when I was having a hard day, even when I stayed quiet. That meant the world.',
    color: 'rose',
    rotation: 2.5,
    date: 'Sep 5'
  },
  {
    id: '3',
    author: 'Leo (Back Row)',
    message: 'You taught us how to think, not just what to think for the exam.',
    color: 'emerald',
    rotation: -1.5,
    date: 'Sep 5'
  },
  {
    id: '4',
    author: 'Priya',
    message: 'When I failed the quiz, you wrote "Not yet" instead of an "F". That gave me hope.',
    color: 'sky',
    rotation: 3,
    date: 'Sep 5'
  },
  {
    id: '5',
    author: 'David',
    message: 'Your classroom was always the safest space in the entire school.',
    color: 'amber',
    rotation: -3,
    date: 'Sep 5'
  },
  {
    id: '6',
    author: 'Sarah',
    message: 'Years from now, we will still remember the confidence you sparked in us.',
    color: 'violet',
    rotation: 1.5,
    date: 'Sep 5'
  }
];

export const GratitudeGarden: React.FC<GratitudeGardenProps> = ({
  profile,
  onRestartExperience
}) => {
  const [notes, setNotes] = useState<GratitudeNote[]>(DEFAULT_NOTES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [selectedColor, setSelectedColor] = useState('amber');
  const [likedNotes, setLikedNotes] = useState<Record<string, number>>({});

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newNote: GratitudeNote = {
      id: Date.now().toString(),
      author: newAuthor.trim() || profile.studentName,
      message: newMessage.trim(),
      color: selectedColor,
      rotation: (Math.random() - 0.5) * 6,
      date: 'Today',
      pinned: true
    };

    setNotes(prev => [newNote, ...prev]);
    setNewMessage('');
    setShowAddForm(false);

    playChimeNote(880, 0, 1.2, 0.2);
    playChimeNote(1108.73, 0.1, 1.4, 0.25);
    fireConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.4, 45);
  };

  const handleLike = (id: string) => {
    setLikedNotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    playChimeNote(1046.5, 0, 0.8, 0.15);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'rose':
        return 'bg-[#FFE0DD] text-[#5C2E2B] border-[#f8c9c4] shadow-xs';
      case 'emerald':
        return 'bg-[#DFE9E8] text-[#264442] border-[#c8d9d7] shadow-xs';
      case 'sky':
        return 'bg-[#E5F0F8] text-[#1E3E59] border-[#cde0ee] shadow-xs';
      case 'violet':
        return 'bg-[#F1EAF8] text-[#4A2D66] border-[#ded1ea] shadow-xs';
      case 'amber':
      default:
        return 'bg-[#FFF5D6] text-[#5C4212] border-[#FADE9F] shadow-xs';
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-start p-3 sm:p-6 select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-[#8A4A1C] text-xs tracking-[0.25em] uppercase font-bold mb-1">
          <Gem className="w-3.5 h-3.5 text-[#A66E19]" />
          <span>Keepsake 4 of 4 • The Garden of Gratitude</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#2D3142] font-bold drop-shadow-xs">
          Student Voices for {profile.name}
        </h2>
        <p className="text-xs sm:text-sm text-[#596073] mt-1 max-w-md mx-auto">
          Every note pinned here represents a spark of confidence, patience, and warmth you gave.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3 mb-6 z-10">
        <button
          id="pin-note-trigger-btn"
          onClick={() => setShowAddForm(prev => !prev)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FADE9F] hover:bg-[#F5E199] text-[#2D3142] font-sans font-bold text-xs uppercase tracking-widest shadow-[0_4px_15px_rgba(250,222,159,0.7)] border border-[#F5E199] transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Pin Your Note of Thanks</span>
        </button>
      </div>

      {/* Add Note Popover Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-md bg-white/95 border border-[#DFE9E8] rounded-2xl p-6 shadow-[0_15px_40px_rgba(45,49,66,0.12)] mb-6 z-20 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5E199] via-[#FFE0DD] to-[#DFE9E8] pointer-events-none" />

            <form onSubmit={handleAddNote} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-display text-base font-bold text-[#2D3142] flex items-center gap-2">
                  <Pin className="w-4 h-4 text-[#8A4A1C]" />
                  <span>Pin a Personal Memory</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#596073] hover:text-[#2D3142] cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-xs text-[#2D3142]/80 mb-1 font-medium">
                  Your Message to {profile.name}:
                </label>
                <textarea
                  id="note-message-input"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="e.g. Thank you for always believing in me when I doubted myself..."
                  rows={3}
                  required
                  className="w-full bg-[#f8faf9] border border-[#DFE9E8] rounded-xl p-3 text-sm text-[#2D3142] placeholder-[#596073]/50 focus:outline-none focus:border-[#FADE9F] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#2D3142]/80 mb-1 font-medium">Your Name / Sign-off:</label>
                  <input
                    id="note-author-input"
                    type="text"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    placeholder={profile.studentName}
                    className="w-full bg-[#f8faf9] border border-[#DFE9E8] rounded-xl px-3 py-2 text-sm text-[#2D3142] placeholder-[#596073]/50 focus:outline-none focus:border-[#FADE9F] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#2D3142]/80 mb-1 font-medium">Note Color:</label>
                  <div className="flex gap-2 pt-1">
                    {[
                      { key: 'amber', bg: 'bg-[#FADE9F]' },
                      { key: 'rose', bg: 'bg-[#FFE0DD]' },
                      { key: 'emerald', bg: 'bg-[#DFE9E8]' },
                      { key: 'sky', bg: 'bg-[#E5F0F8]' },
                      { key: 'violet', bg: 'bg-[#F1EAF8]' }
                    ].map(({ key, bg }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedColor(key)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          selectedColor === key ? 'border-[#2D3142] scale-110 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                        } ${bg}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                id="submit-note-btn"
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#FADE9F] hover:bg-[#F5E199] text-[#2D3142] font-bold text-xs uppercase tracking-widest shadow-[0_4px_15px_rgba(250,222,159,0.7)] border border-[#F5E199] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>Pin to Board</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory Board Layout */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            transition={{ duration: 0.25 }}
            className={`relative p-5 rounded-2xl shadow-[0_6px_20px_rgba(45,49,66,0.06)] border ${getColorClasses(
              note.color
            )} flex flex-col justify-between min-h-[170px] select-text`}
          >
            {/* Push Pin on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#F5E199] to-[#d8b868] shadow-sm border border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>

            {/* Note Content */}
            <div>
              <p className="font-handwriting text-xl sm:text-2xl leading-snug">
                "{note.message}"
              </p>
            </div>

            {/* Note Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-current/15 mt-3 text-xs font-medium">
              <span className="font-semibold">{note.author}</span>
              <button
                onClick={() => handleLike(note.id)}
                className="flex items-center gap-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title="Send heart"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-[#E26D5C]" />
                <span>{likedNotes[note.id] ? 1 + likedNotes[note.id] : 1}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gift Experience Summary & Restart */}
      <div className="mt-12 text-center pb-8 border-t border-[#DFE9E8] pt-8 w-full max-w-2xl">
        <div className="w-12 h-12 rounded-full bg-[#FFE0DD] border border-[#f8c9c4] mx-auto flex items-center justify-center text-[#E26D5C] mb-3 shadow-xs">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2D3142]">
          To All Teachers Everywhere: Thank You
        </h3>
        <p className="text-xs sm:text-sm text-[#596073] mt-1 max-w-md mx-auto">
          May you feel cherished today and every single day for the futures you shape.
        </p>

        <button
          id="replay-entire-gift-btn"
          onClick={onRestartExperience}
          className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#FFE0DD]/40 border border-[#DFE9E8] text-[#2D3142] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#8A4A1C]" />
          <span>Rewrap & Experience Gift Again 🎁</span>
        </button>
      </div>
    </div>
  );
};
