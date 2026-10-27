// Token visual dari DESIGN.md. Jangan menambah warna di luar daftar ini.
export const color = {
  navy: '#13254A',
  navyInk: '#0B1630',
  blue1: '#00A6F4',
  blue2: '#0A3FD6',
  canvas: '#F4F6FA',
  surface: '#FFFFFF',
  line: '#E3E7EF',
  muted: '#6B7385',
  success: '#1FAF6B',
  alert: '#E5484D',
  // Latar file logo asli (#FEFEFE), hanya untuk menutup baris tagline saat reveal.
  logoPaper: '#FEFEFE',
} as const;

export const gradient = `linear-gradient(135deg, ${color.blue1} 0%, ${color.blue2} 100%)`;

export const font = {
  family: 'Geist, sans-serif',
  // Skala untuk 1920x1080
  hook: 96,
  caption: 56,
  title: 40,
  ui: 28,
  label: 22,
} as const;

export const radius = {window: 20, card: 16, input: 12, pill: 999} as const;

export const shadow = '0 24px 60px rgba(11,22,48,0.12)';

export const space = {unit: 8, windowPad: 48, cardPad: 32} as const;

// Spring dengan overshoot sangat kecil (rasio redaman ~0.85), durasi ~400 ms.
export const springConfig = {damping: 22, stiffness: 170, mass: 1} as const;
export const springFrames = 12;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
