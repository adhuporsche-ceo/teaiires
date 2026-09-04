/**
 * Web Audio API synthesizer for sound effects and music box melody.
 * Completely self-contained, no external mp3 assets required.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;
let musicBoxInterval: number | null = null;
let isMusicBoxPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
  if (muted && isMusicBoxPlaying) {
    stopMusicBox();
  }
}

export function getSoundMuted(): boolean {
  return isMuted;
}

/**
 * Play a bell-like chime note
 */
export function playChimeNote(freq: number, startTime = 0, duration = 1.2, gainValue = 0.15) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

/**
 * Unwrapping gift celebration sparkle sound
 */
export function playGiftUnwrapSound() {
  if (isMuted) return;
  const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51, 1567.98]; // C5 to G6
  notes.forEach((freq, idx) => {
    playChimeNote(freq, idx * 0.08, 1.4, 0.12);
  });
}

/**
 * Apple crack / reveal sound
 */
export function playAppleCrackSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Snap / crack burst
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.22);

  // Gentle chime right after
  setTimeout(() => {
    playChimeNote(880, 0, 1.5, 0.12);
    playChimeNote(1108.73, 0.1, 1.5, 0.12);
  }, 100);
}

/**
 * Wax seal stamp sound: deep, rich stamp thud
 */
export function playStampSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
}

/**
 * Pleasant vintage music box melody
 */
const MUSIC_BOX_NOTES = [
  659.25, // E5
  783.99, // G5
  987.77, // B5
  1046.50,// C6
  987.77, // B5
  783.99, // G5
  659.25, // E5
  587.33, // D5
  523.25, // C5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  783.99, // G5
  659.25, // E5
  587.33, // D5
  523.25  // C5
];

export function startMusicBox() {
  if (isMuted || isMusicBoxPlaying) return;
  isMusicBoxPlaying = true;
  let noteIndex = 0;

  // Play first note immediately for instant sound response
  playChimeNote(MUSIC_BOX_NOTES[0], 0, 1.1, 0.05);
  playChimeNote(MUSIC_BOX_NOTES[0] / 2, 0, 1.4, 0.04);
  noteIndex = 1;

  musicBoxInterval = window.setInterval(() => {
    if (isMuted || !isMusicBoxPlaying) return;
    const freq = MUSIC_BOX_NOTES[noteIndex % MUSIC_BOX_NOTES.length];
    playChimeNote(freq, 0, 1.1, 0.05);
    // Add soft harmonic bass note on every 4th beat
    if (noteIndex % 4 === 0) {
      playChimeNote(freq / 2, 0, 1.4, 0.04);
    }
    noteIndex++;
  }, 480);
}

export function stopMusicBox() {
  if (musicBoxInterval) {
    clearInterval(musicBoxInterval);
    musicBoxInterval = null;
  }
  isMusicBoxPlaying = false;
}

export function toggleMusicBox(): boolean {
  if (isMusicBoxPlaying) {
    stopMusicBox();
    return false;
  } else {
    startMusicBox();
    return true;
  }
}

export function getIsMusicBoxPlaying(): boolean {
  return isMusicBoxPlaying;
}

/**
 * Play an iconic Windows/OS style digital harmonic startup chime
 */
export function playBootStartupSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Harmonious rising major chord sequence like modern OS boot:
  // Eb3 (155.56), Bb3 (233.08), Eb4 (311.13), G4 (392.00), Bb4 (466.16)
  const bootChords = [
    { freq: 155.56, time: 0.0, dur: 2.2, gain: 0.12 },
    { freq: 233.08, time: 0.15, dur: 2.0, gain: 0.14 },
    { freq: 311.13, time: 0.32, dur: 2.4, gain: 0.16 },
    { freq: 392.00, time: 0.50, dur: 2.6, gain: 0.18 },
    { freq: 466.16, time: 0.70, dur: 3.0, gain: 0.20 }
  ];

  bootChords.forEach(({ freq, time, dur, gain }) => {
    playChimeNote(freq, time, dur, gain);
  });
}
