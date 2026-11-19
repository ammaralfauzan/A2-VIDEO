import React from 'react';
import {Easing, interpolate} from 'remotion';
import type {Mood} from '../../components/Gigi';
import {GigiPresisi} from '../../components/GigiPresisi';
import {clamp, ease} from '../../components/motion';
import {ef, S, sf, TOTAL_FRAMES, wf} from '../../data/timeline-tiga-salah-kaprah-otomatisasi';
import {cardPos} from './Kartu';
import {GIGI, GIGI_KANAN, P, TASK} from './layout';
import {GEAR_TARGET, OUTRO} from './Penutup';

// Gigi melayang di bawah kartu: ragu di awal, makin lega tiap kartu dibalik, puas di akhir,
// lalu melayang ke huruf A dan menjadi gear logo. Gigi presisi (arahan Bos 19 Nov 2026):
// siluet tetap bulat, layar wajah di tengah, ekspresi bermorf, lirikan mengikuti kartu yang aktif.

type Key = {f: number; x: number; y: number; size: number};
const keys = (): Key[] => [
  {f: 0, ...GIGI},
  {f: P.flipFact(2) + 4, ...GIGI_KANAN}, // memberi tempat kartu tugas kecil
  {f: P.taskOut() + 4, ...GIGI},
];

// Pegas teredam kritis (melayang, tanpa pantulan), sama seperti "Alasan Saya Bikin A2".
const OMEGA = 0.16;
type Pos = {x: number; y: number; size: number};
let simCache: Pos[] | null = null;
const targetAt = (f: number, ks: Key[]) => {
  let t = ks[0];
  for (const k of ks) if (f >= k.f) t = k;
  return t;
};
const simulate = (): Pos[] => {
  if (simCache) return simCache;
  const ks = keys();
  const out: Pos[] = [];
  const p = {x: ks[0].x, y: ks[0].y, size: ks[0].size};
  const v = {x: 0, y: 0, size: 0};
  for (let f = 0; f <= TOTAL_FRAMES + 2; f++) {
    const tg = targetAt(f, ks);
    for (let k = 0; k < 4; k++) {
      for (const key of ['x', 'y', 'size'] as const) {
        const acc = OMEGA * OMEGA * (tg[key] - p[key]) - 2 * OMEGA * v[key];
        v[key] += acc * 0.25;
        p[key] += v[key] * 0.25;
      }
    }
    out.push({...p});
  }
  simCache = out;
  return out;
};
const posAt = (f: number) => {
  const sim = simulate();
  return sim[Math.max(0, Math.min(sim.length - 1, Math.round(f)))];
};

const MOODS: [number, Mood][] = [
  [0, 'cemas'], // ragu menatap tumpukan
  [wf(S.padahal, 1) - 2, 'mikir'], // "belum tentu benar"
  [sf(S.mitos1) - 4, 'cemas'],
  [P.stamp(0) + 4, 'mikir'],
  [P.flipFact(0) + 8, 'puas'], // sedikit lega
  [sf(S.mitos2) - 4, 'biasa'],
  [P.stamp(1) + 2, 'kaget'],
  [P.flipFact(1) + 8, 'senang'],
  [sf(S.mitos3) - 4, 'mikir'],
  [P.flipFact(2) + 8, 'puas'], // lega, napas lega
  [sf(S.tanya), 'mikir'],
  [wf(S.tanya, 8) - 2, 'biasa'], // menatap penonton
  [wf(S.tanya, 11) - 2, 'kedip'], // "duluan?"
  [ef(S.tanya) + 6, 'senang'],
];
const moodIndex = (f: number) => {
  let k = 0;
  for (let i = 0; i < MOODS.length; i++) if (f >= MOODS[i][0]) k = i;
  return k;
};
const MORPH = 9;

// Menggeleng (hook, saat "takut"): ayunan teredam seperti bandul, badan menyusul sedikit terlambat.
const SHAKE: [number, number][] = [
  [0, 0],
  [5, 0.12],
  [11, -0.62],
  [18, 0.58],
  [25, -0.44],
  [32, 0.3],
  [39, -0.14],
  [45, 0],
];
const swing = Easing.bezier(0.45, 0, 0.55, 1);
const shakeTurn = (t: number) => {
  if (t < 0 || t > 45) return 0;
  for (let i = 0; i < SHAKE.length - 1; i++) {
    const [t0, v0] = SHAKE[i];
    const [t1, v1] = SHAKE[i + 1];
    if (t >= t0 && t <= t1) return v0 + (v1 - v0) * swing((t - t0) / (t1 - t0));
  }
  return 0;
};
const SHAKE_AT = wf(S.hook, 5) - 4; // "takut"

const BLINK_GAPS = [88, 112, 74, 130, 96, 104, 82];
const blinkOpen = (f: number) => {
  let t = 40;
  let i = 0;
  while (t + 8 < f) t += BLINK_GAPS[i++ % BLINK_GAPS.length];
  const d = f - t;
  if (d < 0 || d > 7) return 1;
  return interpolate(d, [0, 3, 4, 7], [1, 0.08, 0.08, 1], clamp);
};

// Benda yang sedang aktif (posisi layar) atau null = menatap penonton.
const activeTarget = (f: number): {x: number; y: number} | null => {
  if (f >= wf(S.tanya, 8) - 2) return null;
  if (f >= P.ask()) return {x: 540, y: 690};
  if (f >= P.taskOut()) return {x: 540, y: 420};
  if (f >= P.task(1)) return {x: TASK.left + TASK.w / 2, y: TASK.tops[1] + TASK.h / 2};
  if (f >= P.task(0)) return {x: TASK.left + TASK.w / 2, y: TASK.tops[0] + TASK.h / 2};
  for (let i = 2; i >= 0; i--) {
    if (f >= P.advance(i) - 6 || (i === 0 && f >= 0)) {
      const c = cardPos(i, f);
      // sesaat setelah dicap: menatap cap (kanan bawah kartu)
      if (f >= P.stamp(i) && f < P.stamp(i) + 18) return {x: c.x + 150, y: c.y + 100};
      if (f >= P.back(i)) return cardPos(Math.min(2, i + 1), f);
      return c;
    }
  }
  return {x: 540, y: 690};
};

const lookRaw = (f: number) => {
  const t = activeTarget(f);
  if (!t) return {x: 0, y: 0};
  const p = posAt(f);
  const dx = t.x - p.x;
  const dy = t.y - p.y;
  const d = Math.hypot(dx, dy) || 1;
  return {x: dx / d, y: dy / d};
};

const Outro: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  if (f > o.swap[1] + 2) return null;
  const from = posAt(o.start);
  const to = GEAR_TARGET;
  const u = interpolate(f, [o.hop, o.land], [0, 1], {...clamp, easing: ease});
  const keep = 1 - u;
  const arc = Math.sin(Math.PI * u) * 90;
  const x = from.x + (to.x - from.x) * u + Math.sin(f / 41 + 1) * 2.5 * keep;
  const y = from.y + (to.y - from.y) * u - arc + Math.sin(f / 28) * 5 * keep;
  const size = from.size + (to.size - from.size) * interpolate(f, [o.hop, o.land - 6], [0, 1], {...clamp, easing: ease});
  const spin = 45 * interpolate(f, [o.mergeFrom, o.mergeTo], [0, 1], {...clamp, easing: ease});
  const prev: Mood = 'senang';
  const mood: Mood = f >= o.mergeFrom ? 'puas' : 'senang';
  const morph = interpolate(f, [o.mergeFrom, o.mergeFrom + MORPH], [0, 1], clamp);
  const eyesOpacity = interpolate(f, [o.mergeFrom + 6, o.mergeTo - 2], [1, 0], clamp);
  const opacity = interpolate(f, o.swap, [1, 0], clamp);
  const volume = interpolate(f, [o.mergeFrom, o.mergeTo], [1, 0], clamp);
  const shadow = interpolate(f, [o.land - 4, o.land + 4], [1, 0], clamp);
  const tilt = (f < o.land ? (to.x - from.x) * 0.012 * Math.sin(Math.PI * u) : 0) + Math.sin(f / 20) * 3 * keep;
  const turn = f < o.mergeFrom ? Math.sign(to.x - from.x) * 0.5 * Math.sin(Math.PI * u) : 0;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, zIndex: 20, opacity}}>
      <GigiPresisi size={size} mood={mood} prevMood={prev} morph={morph} spin={spin} eyesOpacity={eyesOpacity} shadow={shadow} tilt={tilt} turn={turn} volume={volume} />
    </div>
  );
};

export const GigiMelayang: React.FC<{f: number}> = ({f}) => {
  if (f >= OUTRO.start + 1) return <Outro f={f} />;
  const pos = posAt(f);
  const intro = interpolate(f, [0, 10], [0, 1], {...clamp, easing: ease});
  const mi = moodIndex(f);
  const [moodStart, mood] = MOODS[mi];
  const prevMood = mi > 0 ? MOODS[mi - 1][1] : mood;
  const t = f - moodStart;
  const morph = mi > 0 ? interpolate(t, [0, MORPH], [0, 1], {...clamp, easing: ease}) : 1;

  // lirikan dirata-rata 8 frame (halus), mendongak saat menatap kartu di atas
  let lx = 0;
  let ly = 0;
  for (let k = 0; k < 8; k++) {
    const g = lookRaw(f - k);
    lx += g.x / 8;
    ly += g.y / 8;
  }
  let pitch = Math.max(-0.45, Math.min(0.3, ly * 0.5));
  let turn = Math.max(-0.4, Math.min(0.4, lx * 0.35));

  // berpindah: menoleh ke arah tujuan
  let vx = 0;
  for (let k = 0; k < 6; k++) vx += (posAt(f - k + 3).x - posAt(f - k + 2).x) / 6;
  turn += Math.max(-0.5, Math.min(0.5, vx / 9));

  let dy = 0;
  let dx = 0;
  let tilt = 0;
  let shakeEye = 0;
  switch (mood) {
    case 'cemas': {
      const s = shakeTurn(f - SHAKE_AT);
      const lag = shakeTurn(f - SHAKE_AT - 4);
      turn += s;
      tilt = -lag * 4 - 2;
      dx = lag * 5;
      dy = Math.abs(s) * 2 + 3;
      shakeEye = -s * 0.55;
      break;
    }
    case 'kaget':
      dy = -8 * Math.sin(Math.min(1, t / 10) * Math.PI * 0.5);
      pitch -= 0.1;
      break;
    case 'mikir': {
      const lean = interpolate(t, [0, 14], [0, 1], {...clamp, easing: ease});
      tilt = 9 * lean + Math.sin(f / 22) * 2;
      dy = Math.sin(f / 20) * 2;
      break;
    }
    case 'puas': {
      // napas lega: turun sedikit lalu naik pelan, condong santai
      const sigh = Math.sin(Math.min(1, t / 24) * Math.PI);
      dy = 6 * sigh + Math.sin(f / 18) * 3;
      tilt = Math.sin(f / 18) * 4;
      break;
    }
    case 'senang':
      dy = Math.sin(f / 16) * 3;
      tilt = Math.sin(f / 20) * 3;
      turn += Math.sin(f / 16) * 0.1;
      break;
    default:
      dy = Math.sin(f / 14) * 1.5;
  }
  tilt += Math.max(-8, Math.min(8, vx * 0.7));
  dy += Math.sin(f / 28) * 5;
  dx += Math.sin(f / 41 + 1) * 2.5;

  const sweat = mood === 'cemas' ? interpolate(t, [0, 10], [0, 1], clamp) : 0;
  const sweatPhase = (((f % 50) + 50) % 50) / 50;
  const eyeOpen = mood === 'biasa' && t > MORPH ? blinkOpen(f) : 1;
  const w = pos.size;
  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x - w / 2 + dx,
        top: pos.y - w / 2 + dy + (1 - intro) * 16,
        width: w,
        zIndex: 20,
        opacity: intro,
        filter: intro < 1 ? `blur(${(1 - intro) * 6}px)` : undefined,
      }}
    >
      <GigiPresisi
        size={w}
        mood={mood}
        prevMood={prevMood}
        morph={morph}
        look={{x: lx + shakeEye, y: ly}}
        eyeOpen={eyeOpen}
        sweat={sweat}
        sweatPhase={sweatPhase}
        tilt={tilt}
        turn={Math.max(-0.85, Math.min(0.85, turn))}
        pitch={pitch}
      />
    </div>
  );
};
