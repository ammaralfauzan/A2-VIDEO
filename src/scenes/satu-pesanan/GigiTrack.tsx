import React from 'react';
import {interpolate} from 'remotion';
import {Gigi, Mood} from '../../components/Gigi';
import {clamp, ease} from '../../components/motion';
import {S, sf, TOTAL_FRAMES, wf} from '../../data/timeline-satu-pesanan';
import {PILL_TOP} from './Ajakan';
import {P, TREE} from './layout';

// Gigi sepanjang video: satu lapisan agar gerak dan ekspresinya tidak terputus.
// Prinsip animasi: ganti ekspresi lewat kedipan, regang-pipih saat bergerak dan mendarat,
// condong ke arah gerak, dan bahasa tubuh khas tiap emosi.

type Key = {f: number; x: number; y: number; size: number};

const keys = (): Key[] => {
  const big = {x: 540, y: 690, size: 280};
  const corner = {x: 215, y: 1032, size: 140};
  return [
    {f: 0, ...big},
    {f: P.stepIn(0) - 8, ...big},
    {f: P.stepIn(0) + 10, ...corner},
    {f: sf(S.rajin), ...corner},
    {f: sf(S.rajin) + 16, ...big},
    // Gigi minggir dulu sebelum hub muncul di tengah.
    {f: P.ring() - 12, ...big},
    {f: P.ring() + 4, ...corner},
    {f: P.compact(), ...corner},
    {f: P.compact() + 18, x: 230, y: 420, size: 130},
    // Tunggu kartu memudar dulu agar Gigi tidak lewat di atasnya.
    {f: sf(S.manusia) + 12, x: 230, y: 420, size: 130},
    {f: sf(S.manusia) + 28, x: 540, y: 905, size: 170},
    {f: sf(S.tanya), x: 540, y: 905, size: 170},
    {f: sf(S.tanya) + 16, x: 540, y: 660, size: 300},
    {f: sf(S.logo), x: 540, y: 660, size: 300},
    {f: sf(S.logo) + 18, x: 540, y: PILL_TOP + 230, size: 140},
  ];
};

const posAt = (f: number, ks: Key[]) => {
  if (f <= ks[0].f) return ks[0];
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i];
    const b = ks[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = interpolate(f, [a.f, b.f], [0, 1], {...clamp, easing: ease});
      return {f, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, size: a.size + (b.size - a.size) * t};
    }
  }
  return ks[ks.length - 1];
};

// Akhir perpindahan terakhir (untuk efek mendarat).
const lastLanding = (f: number, ks: Key[]) => {
  let end = -999;
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i];
    const b = ks[i + 1];
    const moved = a.x !== b.x || a.y !== b.y || a.size !== b.size;
    if (moved && b.f <= f) end = b.f;
  }
  return end;
};

const moodRaw = (f: number): Mood => {
  if (f >= wf(S.ajakan, 0)) return 'kedip';
  if (f >= sf(S.logo)) return 'senang';
  if (f >= sf(S.tanya)) return 'mikir';
  if (f >= sf(S.manusia)) return 'senang';
  if (f >= P.ring() + 30) return 'puas'; // gear berputar, alur jalan sendiri
  if (f >= P.ring()) return 'senang';
  if (f >= sf(S.rajin)) return 'lelah';
  if (f >= wf(S.hitung, 7)) return 'kaget'; // "tiga ratus lima puluh"
  if (f >= P.stepIn(3)) return 'cemas';
  if (f >= P.badge7() && f < P.badge7() + 24) return 'kaget';
  return 'biasa';
};

// Dihitung sekali: suasana hati per frame, titik pergantiannya, dan sudut putar gear.
type Track = {mood: Mood[]; changes: number[]; spin: number[]};
let cache: Track | null = null;
const track = (): Track => {
  if (cache) return cache;
  const mood: Mood[] = [];
  const changes: number[] = [];
  const spin: number[] = [];
  let angle = 0;
  const ring = P.ring();
  const stop = sf(S.manusia);
  for (let f = 0; f <= TOTAL_FRAMES; f++) {
    mood[f] = moodRaw(f);
    if (f > 0 && mood[f] !== mood[f - 1]) changes.push(f);
    // Gear berputar dengan percepatan dan perlambatan halus, bukan langsung penuh.
    const speed = 3.2 * interpolate(f, [ring, ring + 24], [0, 1], {...clamp, easing: ease}) * interpolate(f, [stop, stop + 24], [1, 0], {...clamp, easing: ease});
    angle += speed;
    spin[f] = angle;
  }
  cache = {mood, changes, spin};
  return cache;
};

const at = <T,>(arr: T[], f: number) => arr[Math.max(0, Math.min(arr.length - 1, Math.round(f)))];

// Kedip alami: jeda tidak seragam.
const BLINK_GAPS = [88, 112, 74, 130, 96, 104, 82];
const blinkOpen = (f: number) => {
  let t = 40;
  let i = 0;
  while (t + 8 < f) t += BLINK_GAPS[i++ % BLINK_GAPS.length];
  const d = f - t;
  if (d < 0 || d > 7) return 1;
  return interpolate(d, [0, 3, 4, 7], [1, 0.08, 0.08, 1], clamp);
};

const latestStep = (f: number) => {
  let k = -1;
  for (let i = 0; i < 7; i++) if (f >= P.stepIn(i)) k = i;
  return k;
};

const lookTarget = (f: number, pos: {x: number; y: number}, mood: Mood) => {
  if (f >= P.chipIn() && f < P.stepIn(0)) return {x: 0, y: -1};
  const step = latestStep(f);
  if (step >= 0 && f < P.grid()) {
    const n = TREE[step];
    const dx = n.x - pos.x;
    const dy = n.y - pos.y;
    const d = Math.hypot(dx, dy) || 1;
    return {x: dx / d, y: dy / d};
  }
  if (f >= P.grid() && f < sf(S.rajin)) return {x: 0.6, y: -0.8}; // menatap angka 350
  if (mood === 'mikir') return {x: 0.7, y: -0.7};
  if (mood === 'lelah') return {x: 0, y: 0.5};
  return {x: 0, y: 0};
};

const hump = (t: number, len: number) => (t >= 0 && t <= len ? Math.sin((Math.PI * t) / len) : 0);
const settle = (t: number, amt: number) => (t >= 0 ? amt * Math.exp(-t / 4) * Math.cos(t * 0.8) : 0);

export const GigiTrack: React.FC<{f: number}> = ({f}) => {
  const ks = keys();
  const tr = track();
  const pos = posAt(f, ks);
  const prev = posAt(f - 1, ks);
  const vx = pos.x - prev.x;
  const vy = pos.y - prev.y;
  const speed = Math.hypot(vx, vy);

  // --- Ekspresi: ganti lewat kedipan (tutup dengan ekspresi lama, buka dengan yang baru) ---
  const lastChange = [...tr.changes].reverse().find((c) => c <= f + 4) ?? -999;
  const near = Math.abs(f - lastChange) <= 4;
  const mood = near && f < lastChange ? at(tr.mood, lastChange - 1) : at(tr.mood, f);
  const moodStart = [...tr.changes].reverse().find((c) => c <= f) ?? 0;
  const t = f - moodStart;
  let eyeOpen = near ? interpolate(Math.abs(f - lastChange), [0, 4], [0.08, 1], clamp) : 1;
  const canBlink = mood === 'biasa' || mood === 'kaget' || mood === 'cemas' || mood === 'mikir';
  if (canBlink && !near) eyeOpen = Math.min(eyeOpen, blinkOpen(f));

  // --- Lirikan halus: rata-rata arah 8 frame terakhir ---
  let lx = 0;
  let ly = 0;
  for (let k = 0; k < 8; k++) {
    const g = lookTarget(f - k, posAt(f - k, ks), at(tr.mood, f - k));
    lx += g.x / 8;
    ly += g.y / 8;
  }

  // --- Bahasa tubuh per emosi ---
  let dy = 0;
  let dx = 0;
  let tilt = 0;
  let sx = 1;
  let sy = 1;
  const breathe = Math.sin(f / 14);
  switch (mood) {
    case 'biasa':
      dy = breathe * 5;
      sy = 1 + breathe * 0.015;
      break;
    case 'kaget': {
      // melompat kaget: regang saat naik, pipih saat mendarat
      dy = -38 * hump(t, 14);
      sy = t < 7 ? 1 + 0.12 * hump(t, 14) : 1 - settle(t - 14, 0.1);
      sx = 1 / sy;
      break;
    }
    case 'senang': {
      const hop = Math.abs(Math.sin((t * Math.PI) / 9)) * 16 * interpolate(t, [0, 36], [1, 0], clamp);
      dy = -hop + Math.sin(f / 10) * 4;
      sy = 1 + 0.05 * Math.sin((t * Math.PI) / 9) * interpolate(t, [0, 36], [1, 0], clamp);
      sx = 1 / sy;
      tilt = Math.sin(f / 10) * 3;
      break;
    }
    case 'puas':
      dy = Math.sin(f / 18) * 4;
      tilt = Math.sin(f / 18) * 5;
      break;
    case 'cemas':
      dx = Math.sin(f * 2.3) * 1.6 + Math.sin(f * 3.7) * 0.8;
      dy = Math.sin(f / 6) * 2;
      tilt = Math.sin(f * 1.9) * 1.5;
      break;
    case 'lelah': {
      // melorot pelan: turun, memipih, miring lesu, napas berat
      const slump = interpolate(t, [0, 16], [0, 1], {...clamp, easing: ease});
      dy = 12 * slump + Math.sin(f / 24) * 3;
      sy = 1 - 0.07 * slump + Math.sin(f / 24) * 0.012;
      sx = 1 + 0.05 * slump;
      tilt = -6 * slump;
      break;
    }
    case 'mikir': {
      const lean = interpolate(t, [0, 14], [0, 1], {...clamp, easing: ease});
      tilt = 11 * lean + Math.sin(f / 22) * 2;
      dy = Math.sin(f / 20) * 3;
      break;
    }
    case 'kedip': {
      // menyapa: lompat kecil lalu goyang
      dy = -14 * hump(t, 10) + Math.sin(f / 10) * 3;
      tilt = Math.sin((t / 30) * Math.PI * 2) * 8 * interpolate(t, [0, 8, 50, 60], [0, 1, 1, 0], clamp);
      break;
    }
  }

  // --- Gerak pindah: condong ke arah gerak, regang searah kecepatan, pipih saat mendarat ---
  tilt += Math.max(-14, Math.min(14, vx * 0.9));
  const stretch = Math.min(speed, 24) * 0.0026;
  sy *= 1 + stretch;
  sx *= 1 - stretch * 0.8;
  const land = f - lastLanding(f, ks);
  if (land >= 0 && land < 16) {
    const s = settle(land, 0.08);
    sy *= 1 - s;
    sx *= 1 + s;
  }

  // --- Keringat: satu tetes, muncul saat cemas/lelah, menetes berulang ---
  const sweaty = mood === 'cemas' || mood === 'lelah';
  const sweat = sweaty ? interpolate(t, [0, 10], [0, 1], clamp) : 0;
  const sweatPhase = ((f % 50) + 50) % 50 / 50;

  const w = pos.size;
  return (
    <div style={{position: 'absolute', left: pos.x - w / 2 + dx, top: pos.y - w / 2 + dy, width: w, zIndex: 20}}>
      <Gigi
        size={w}
        mood={mood}
        look={{x: lx, y: ly}}
        eyeOpen={eyeOpen}
        sweat={sweat}
        sweatPhase={sweatPhase}
        spin={at(tr.spin, f)}
        tilt={tilt}
        squash={{x: sx, y: sy}}
      />
    </div>
  );
};
