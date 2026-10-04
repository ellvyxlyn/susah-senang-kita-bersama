/**
 * Web Audio API synthesizer & Cartoon sound effects
 * Zero external audio file dependencies - runs 100% offline & inside iframe
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private bgmPlaying: boolean = false;
  private bgmInterval: number | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled) {
      this.stopBgm();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return this.soundEnabled;
  }

  public setSound(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopBgm();
    }
  }

  // Play a gentle pop click sound
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  // Play a cheerful, bright 4-tone triumphant celebration chord
  public playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const start = now + idx * 0.09;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      });
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  // Play a friendly, gentle "boing" (non-scary for primary school children)
  public playWrong() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.16);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  // Big celebratory victory sequence
  public playVictory() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const fanfare = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.25 },
        { f: 880.00, d: 0.15 },
        { f: 1046.5, d: 0.45 },
      ];

      let t = now;
      fanfare.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + n.d + 0.06);

        t += n.d;
      });
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  // Background cartoon chime melody (soft, cheerful, loopable)
  public toggleBgm(): boolean {
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public isBgmPlaying(): boolean {
    return this.bgmPlaying;
  }

  public startBgm() {
    if (!this.soundEnabled || this.bgmPlaying) return;
    this.initCtx();
    this.bgmPlaying = true;

    // Simple sweet pentatonic melody notes: C4, D4, E4, G4, A4, C5
    const melody = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 659.25];
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.bgmPlaying || !this.soundEnabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(melody[noteIndex % melody.length], now);

        gain.gain.setValueAtTime(0.03, now); // very soft gentle background
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.38);

        noteIndex++;
      } catch {
        // Fallback
      }
    };

    // Play every 450ms
    playNextNote();
    this.bgmInterval = window.setInterval(playNextNote, 450);
  }

  public stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // Cartoon dialogue speech synthesis
  public speak(text: string) {
    if (!this.soundEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ms-MY';
      utterance.pitch = 1.35; // Cheerful cartoon voice pitch
      utterance.rate = 1.05;
      utterance.volume = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const msVoice = voices.find(v => v.lang.startsWith('ms') || v.lang.startsWith('id'));
      if (msVoice) {
        utterance.voice = msVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis error suppression
    }
  }
}

export const soundEngine = new SoundEngine();
