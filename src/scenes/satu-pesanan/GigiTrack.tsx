import React from 'react';
import {interpolate} from 'remotion';
import {Gigi, Mood} from '../../components/Gigi';
import {clamp, ease} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-satu-pesanan';
import {PILL_TOP} from './Ajakan';
import {P, TREE} from './layout';

type Key = {f: number; x: number; y: number; size: number};

const keys = (): Key[] => {
  const big = {x: 540, y: 690, size: 280};
  const corner = {x: 215, y: 1032, size: 140};
  return [
    {f: 0, ...big},
    {f: P.stepIn(0) - 8, ...big},
    {f: P.stepIn(0) + 8, ...corner},
    {f: sf(S.rajin), ...corner},
    {f: sf(S.rajin) + 14, ...big},
    // Gigi minggir dulu sebelum hub muncul di tengah.
    {f: P.ring() - 10, ...big},
    {f: P.ring() + 4, ...corner},
    {f: P.compact(), ...corner},
    {f: P.compact() + 16, x: 230, y: 420, size: 130},
    // Tunggu kartu memudar dulu agar Gigi tidak lewat di atasnya.
    {f: sf(S.manusia) + 12, x: 230, y: 420, size: 130},
    {f: sf(S.manusia) + 26, x: 540, y: 905, size: 170},
    {f: sf(S.tanya), x: 540, y: 905, size: 170},
    {f: sf(S.tanya) + 14, x: 540, y: 660, size: 300},
    {f: sf(S.logo), x: 540, y: 660, size: 300},
    {f: sf(S.logo) + 16, x: 540, y: PILL_TOP + 230, size: 140},
  ];
};

const at = (f: number, ks: Key[]) => {
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

// Langkah terakhir yang sudah muncul (untuk arah lirikan).
const latestStep = (f: number) => {
  let k = -1;
  for (let i = 0; i < 7; i++) if (f >= P.stepIn(i)) k = i;
  return k;
};

const moodAt = (f: number): Mood => {
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

// Gigi sepanjang video: satu lapisan agar gerak dan ekspresinya tidak terputus.
export const GigiTrack: React.FC<{f: number}> = ({f}) => {
  const k = at(f, keys());
  const mood = moodAt(f);
  const bob = Math.sin(f / 9) * 4;
  const blink = f % 96 >= 93;
  const step = latestStep(f);
  let look = {x: 0, y: 0};
  if (f >= P.chipIn() && f < P.stepIn(0)) look = {x: 0, y: -1};
  else if (step >= 0 && f < P.grid()) {
    const n = TREE[step];
    const dx = n.x - k.x;
    const dy = n.y - k.y;
    const d = Math.hypot(dx, dy) || 1;
    look = {x: dx / d, y: dy / d};
  } else if (mood === 'mikir') look = {x: 0.7, y: -0.7};
  const sweat = f >= sf(S.rajin) && f < P.ring() ? 1 : f >= P.stepIn(4) && f < P.grid() ? interpolate(f, [P.stepIn(4), P.stepIn(6)], [0.3, 1], clamp) : 0;
  const spin = f >= P.ring() && f < sf(S.manusia) ? (f - P.ring()) * 3 : 0;
  // Tanpa tangan: menyapa dengan goyang kecil sambil mengedip.
  const hi = wf(S.ajakan, 0);
  const tilt = f >= hi ? Math.sin(((f - hi) / 30) * Math.PI * 2) * 8 * interpolate(f, [hi, hi + 8, hi + 50, hi + 60], [0, 1, 1, 0], clamp) : 0;
  const w = k.size;
  return (
    <div style={{position: 'absolute', left: k.x - w / 2, top: k.y - w / 2 + bob, width: w, zIndex: 20}}>
      <Gigi size={w} mood={mood} look={look} blink={blink} sweat={sweat} spin={spin} tilt={tilt} />
    </div>
  );
};
