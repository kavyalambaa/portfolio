/* ========================================================
   WEB AUDIO API SOUNDSCAPE SYNTHESIZER
   Zero external audio files required! Synthesizes clean sound FX.
   ======================================================== */

class SoundscapeSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted for smooth browser autoplay policy compliance
    this.ambientRainNode = null;
    this.ambientGainNode = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this browser.', e);
    }
  }

  ensureContextReady() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.ensureContextReady();
      this.startAmbience();
      this.playThwip();
    } else {
      this.stopAmbience();
    }
    return this.isMuted;
  }

  // Synthesize Web Shoot "THWIP!" sound
  playThwip() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContextReady();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // High frequency downward pitch sweep
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Synthesize Comic Click/Pop sound
  playClick() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContextReady();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Synthesize Cyberpunk Glitch effect sound
  playGlitch() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContextReady();

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.08);
  }

  // Synthesize Success chime sequence
  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContextReady();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    });
  }

  // Synthesize procedural Ambient Rain sound generator
  startAmbience() {
    if (!this.ctx || this.ambientRainNode) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.ambientRainNode = this.ctx.createBufferSource();
    this.ambientRainNode.buffer = noiseBuffer;
    this.ambientRainNode.loop = true;

    // Filter white noise down to sound like soft ambient rain
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.ambientGainNode = this.ctx.createGain();
    this.ambientGainNode.gain.setValueAtTime(0.04, this.ctx.currentTime);

    this.ambientRainNode.connect(filter);
    filter.connect(this.ambientGainNode);
    this.ambientGainNode.connect(this.ctx.destination);

    this.ambientRainNode.start();
  }

  stopAmbience() {
    if (this.ambientRainNode) {
      try {
        this.ambientRainNode.stop();
        this.ambientRainNode.disconnect();
      } catch (e) {}
      this.ambientRainNode = null;
    }
  }
}

export const soundscape = new SoundscapeSynthesizer();
