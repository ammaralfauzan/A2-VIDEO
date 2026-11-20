import React from 'react';
import {interpolate} from 'remotion';
import type {Mood} from '../../components/Gigi';
import {GigiPresisi} from '../../components/GigiPresisi';
import {clamp, ease} from '../../components/motion';
import {ef, S, sf, TOTAL_FRAMES, wf} from '../../data/timeline-manual-template-otomatis';
import {gigiAt, GIGI_SIZE, nodeLeft, NODE, PANEL, P, stepCx, stepTop, TASK} from './layout';
import {GEAR_TARGET, OUTRO} from './Penutup';

// Gigi melayang di atas anak tangga yang aktif (tanpa lompatan/pantulan, aturan Bos 19 Nov 2026):
// pegas teredam kritis berpindah ke anak tangga berikutnya. Ekspresi bermorf, lirikan mengikuti benda aktif.
// Penutup: melayang ke huruf A lalu menjadi gear logo.

type Key = {f: number; x: number; y: number; size: number};
const keys = (): Key[] => [
  {f: 0, ...gigiAt(0)},
  {f: P.tier[1] + 2, ...gigiAt(1)},
  {f: P.tier[2] + 2, ...gigiAt(2)},
  {f: sf(S.tidak) - 2, ...gigiAt(0)},
  {f: P.taskUp() + 2, ...gigiAt(1)},
];

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
  [0, 'mikir'], // menatap tangga kosong
  [sf(S.tiga), 'biasa'],
  [P.tier[0] + 4, 'lelah'], // manual: capek
  [sf(S.t2), 'biasa'],
  [wf(S.kirim, 4), 'mikir'], // masih harus menekan kirim sendiri
  [P.tier[2] + 6, 'senang'], // otomatis
  [sf(S.laporan) + 10, 'puas'],
  [sf(S.tidak), 'biasa'],
  [P.taskUp(), 'senang'], // naik satu tingkat
  [sf(S.tugasmu), 'mikir'],
  [wf(S.tugasmu, 5), 'biasa'], // menatap penonton
  [sf(S.suka), 'senang'],
];
const moodIndex = (f: number) => {
  let k = 0;
  for (let i = 0; i < MOODS.length; i++) if (f >= MOODS[i][0]) k = i;
  return k;
};
const MORPH = 9;

const BLINK_GAPS = [88, 112, 74, 130, 96, 104, 82];
const blinkOpen = (f: number) => {
  let t = 40;
  let i = 0;
  while (t + 8 < f) t += BLINK_GAPS[i++ % BLINK_GAPS.length];
  const d = f - t;
  if (d < 0 || d > 7) return 1;
  return interpolate(d, [0, 3, 4, 7], [1, 0.08, 0.08, 1], clamp);
};

// Benda aktif (posisi layar) atau null = menatap penonton.
const activeTarget = (f: number): {x: number; y: number} | null => {
  if (f >= wf(S.tugasmu, 5)) return null;
  if (f >= P.compose()) return {x: 540, y: PANEL.top + 95};
  if (f >= P.task()) {
    const u = interpolate(f, [P.taskUp(), P.taskUp() + 16], [0, 1], {...clamp, easing: ease});
    return {x: stepCx(0) + u * 240, y: TASK.tops[0] + (TASK.tops[1] - TASK.tops[0]) * u + TASK.h / 2};
  }
  if (f >= P.report()) return {x: 540, y: 510};
  if (f >= P.flowIn()) {
    const k = f >= P.flowMove(2) ? 2 : f >= P.flowMove(1) ? 1 : 0;
    return {x: nodeLeft(k) + NODE.w / 2, y: 490};
  }
  if (f >= P.t3In()) return {x: 540, y: 380};
  if (f >= P.t2In()) return {x: 540, y: 430};
  if (f >= P.t1In()) return {x: 540, y: 430};
  if (f >= P.label(0) - 4) {
    const k = f >= P.label(2) - 4 ? 2 : f >= P.label(1) - 4 ? 1 : 0;
    return {x: stepCx(k), y: stepTop(k) + 60};
  }
  return {x: 540, y: 900};
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
      <GigiPresisi size={size} mood={mood} prevMood="senang" morph={morph} spin={spin} eyesOpacity={eyesOpacity} shadow={shadow} tilt={tilt} turn={turn} volume={volume} />
    </div>
  );
};

export const GigiNaik: React.FC<{f: number}> = ({f}) => {
  if (f >= OUTRO.start + 1) return <Outro f={f} />;
  const pos = posAt(f);
  const intro = interpolate(f, [0, 10], [0, 1], {...clamp, easing: ease});
  const mi = moodIndex(f);
  const [moodStart, mood] = MOODS[mi];
  const prevMood = mi > 0 ? MOODS[mi - 1][1] : mood;
  const t = f - moodStart;
  const morph = mi > 0 ? interpolate(t, [0, MORPH], [0, 1], {...clamp, easing: ease}) : 1;

  let lx = 0;
  let ly = 0;
  for (let k = 0; k < 8; k++) {
    const g = lookRaw(f - k);
    lx += g.x / 8;
    ly += g.y / 8;
  }
  const pitch = Math.max(-0.45, Math.min(0.3, ly * 0.5));
  let turn = Math.max(-0.4, Math.min(0.4, lx * 0.35));
  let vx = 0;
  for (let k = 0; k < 6; k++) vx += (posAt(f - k + 3).x - posAt(f - k + 2).x) / 6;
  turn += Math.max(-0.5, Math.min(0.5, vx / 9));

  let dy = 0;
  let dx = 0;
  let tilt = 0;
  switch (mood) {
    case 'lelah':
      dy = 3 + Math.sin(f / 22) * 2;
      tilt = -3 + Math.sin(f / 26) * 2;
      break;
    case 'mikir': {
      const lean = interpolate(t, [0, 14], [0, 1], {...clamp, easing: ease});
      tilt = 9 * lean + Math.sin(f / 22) * 2;
      dy = Math.sin(f / 20) * 2;
      break;
    }
    case 'puas': {
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
  dy += Math.sin(f / 28) * 4;
  dx += Math.sin(f / 41 + 1) * 2.5;

  const sweat = mood === 'lelah' ? interpolate(t, [0, 10], [0, 1], clamp) : 0;
  const sweatPhase = (((f % 50) + 50) % 50) / 50;
  const eyeOpen = mood === 'biasa' && t > MORPH ? blinkOpen(f) : 1;
  const w = pos.size || GIGI_SIZE;
  void ef;
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
        look={{x: lx, y: ly}}
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
