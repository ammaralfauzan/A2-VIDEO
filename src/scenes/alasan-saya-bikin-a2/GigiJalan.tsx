import React from 'react';
import {interpolate} from 'remotion';
import {Gigi, Mood} from '../../components/Gigi';
import {clamp, ease} from '../../components/motion';
import {S, sf, TOTAL_FRAMES} from '../../data/timeline-alasan-saya-bikin-a2';
import {GEAR_TARGET, OUTRO} from './Penutup';
import {LINE, P, POINTS, RING, RING_GIGI} from './layout';

// Gigi menemani di atas garis waktu: pindah ke titik yang sedang diceritakan, ekspresinya
// mengikuti rasa cerita, lalu masuk ke lingkaran dan menjadi gear di logo.
// Gerak dan bahasa tubuh mengikuti skill a2-maskot-gigi (ganti ekspresi lewat kedipan,
// regang-pipih, condong ke arah gerak).

type Key = {f: number; x: number; y: number; size: number};
const GY = 600; // pusat Gigi; badan berakhir ±120 px di atas garis
const SIZE = 240;
const gx = (i: number) => Math.max(250, Math.min(780, POINTS[i].x));

const keys = (): Key[] => [
  {f: 0, x: 540, y: GY, size: SIZE},
  {f: P.pointIn(0) - 6, x: 540, y: GY, size: SIZE},
  {f: P.pointIn(0) + 16, x: gx(0), y: GY, size: SIZE},
  {f: P.pointIn(1) - 2, x: gx(0), y: GY, size: SIZE},
  {f: P.pointIn(1) + 20, x: gx(1), y: GY, size: SIZE},
  {f: P.pointIn(2) - 2, x: gx(1), y: GY, size: SIZE},
  {f: P.pointIn(2) + 20, x: gx(2), y: GY, size: SIZE},
  {f: P.merge()[0], x: gx(2), y: GY, size: SIZE},
  {f: P.merge()[1], x: 540, y: GY, size: SIZE},
  {f: P.gigiIn()[0], x: 540, y: GY, size: SIZE},
  {f: P.gigiIn()[1], x: RING.cx, y: RING.cy, size: RING_GIGI},
];

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
  if (f >= OUTRO.mergeFrom) return 'puas';
  if (f >= P.gigiIn()[0]) return 'puas';
  if (f >= sf(S.bukan)) return 'senang'; // tersenyum
  if (f >= sf(S.manusia)) return 'puas'; // lega
  if (f >= P.mesin()) return 'senang';
  if (f >= sf(S.pikir)) return 'mikir';
  if (f >= sf(S.waktu) + 30) return 'cemas';
  if (f >= sf(S.waktu)) return 'kaget'; // tersentak: "Waktu"
  if (f >= sf(S.sadar)) return 'mikir';
  if (f >= sf(S.lihat) + 18) return 'lelah'; // lelah, mengantuk
  return 'biasa';
};

type Track = {mood: Mood[]; changes: number[]; spin: number[]};
let cache: Track | null = null;
const track = (): Track => {
  if (cache) return cache;
  const mood: Mood[] = [];
  const changes: number[] = [];
  const spin: number[] = [];
  let angle = 0;
  const go = P.mesin();
  const stop = sf(S.bukan);
  for (let f = 0; f <= TOTAL_FRAMES; f++) {
    mood[f] = moodRaw(f);
    if (f > 0 && mood[f] !== mood[f - 1]) changes.push(f);
    // "dikerjakan mesin": gear berputar halus, lalu melambat
    const speed = 3 * interpolate(f, [go, go + 20], [0, 1], {...clamp, easing: ease}) * interpolate(f, [stop, stop + 30], [1, 0], {...clamp, easing: ease});
    angle += speed;
    spin[f] = angle;
  }
  cache = {mood, changes, spin};
  return cache;
};

const at = <T,>(arr: T[], f: number) => arr[Math.max(0, Math.min(arr.length - 1, Math.round(f)))];

const BLINK_GAPS = [88, 112, 74, 130, 96, 104, 82];
const blinkOpen = (f: number) => {
  let t = 40;
  let i = 0;
  while (t + 8 < f) t += BLINK_GAPS[i++ % BLINK_GAPS.length];
  const d = f - t;
  if (d < 0 || d > 7) return 1;
  return interpolate(d, [0, 3, 4, 7], [1, 0.08, 0.08, 1], clamp);
};

const lookTarget = (f: number, pos: {x: number; y: number}, mood: Mood) => {
  // hook: menatap ujung garis yang sedang tumbuh
  const [g0, g1] = P.grow();
  if (f >= g0 && f < P.pointIn(0)) {
    const tip = LINE.x0 + (LINE.x1 - LINE.x0) * interpolate(f, [g0, g1], [0, 1], {...clamp, easing: ease});
    const dx = tip - pos.x;
    const dy = LINE.y - pos.y;
    const d = Math.hypot(dx, dy) || 1;
    return {x: dx / d, y: dy / d};
  }
  if (mood === 'mikir') return {x: 0.7, y: -0.7};
  if (mood === 'lelah') return {x: 0, y: 0.6};
  if (f < sf(S.bukan)) return {x: 0, y: 0.55}; // menatap titik di bawahnya
  return {x: 0, y: 0};
};

const hump = (t: number, len: number) => (t >= 0 && t <= len ? Math.sin((Math.PI * t) / len) : 0);
const settle = (t: number, amt: number) => (t >= 0 ? amt * Math.exp(-t / 4) * Math.cos(t * 0.8) : 0);

// Penutup: dari dalam lingkaran, ancang-ancang, melompat ke posisi gear huruf A, menutup mata,
// berputar pas ke kelipatan 45 derajat, lalu digantikan gear asli logo.
const Outro: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  const tr = track();
  if (f > o.swap[1] + 2) return null;
  const from = {x: RING.cx, y: RING.cy, size: RING_GIGI};
  const to = GEAR_TARGET;
  const u = interpolate(f, [o.hop, o.land], [0, 1], {...clamp, easing: ease});
  const x = from.x + (to.x - from.x) * u;
  const arc = Math.sin(Math.PI * u) * 200;
  const y = from.y + (to.y - from.y) * u - arc;
  const size = from.size + (to.size - from.size) * interpolate(f, [o.hop, o.land - 6], [0, 1], {...clamp, easing: ease});
  let sy = 1;
  if (f < o.hop) sy = 1 - 0.1 * interpolate(f, [o.start, o.hop], [0, 1], clamp);
  else if (f < o.land) sy = 1 + 0.08 * Math.sin(Math.PI * u);
  else sy = 1 - settle(f - o.land, 0.1);
  const sx = 1 / sy;
  const base = at(tr.spin, o.start);
  const target = Math.ceil(base / 45) * 45 + 45;
  const spin = base + (target - base) * interpolate(f, [o.mergeFrom, o.mergeTo], [0, 1], {...clamp, easing: ease});
  const mood: Mood = f >= o.mergeFrom ? 'puas' : 'senang';
  const eyesOpacity = interpolate(f, [o.mergeFrom + 6, o.mergeTo - 2], [1, 0], clamp);
  const opacity = interpolate(f, o.swap, [1, 0], clamp);
  const shadow = interpolate(f, [o.land - 4, o.land + 4], [1, 0], clamp);
  const tilt = f < o.land ? (to.x - from.x) * 0.012 * Math.sin(Math.PI * u) : 0;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, zIndex: 20, opacity}}>
      <Gigi size={size} mood={mood} spin={spin} squash={{x: sx, y: sy}} eyesOpacity={eyesOpacity} shadow={shadow} tilt={tilt} />
    </div>
  );
};

export const GigiJalan: React.FC<{f: number}> = ({f}) => {
  if (f >= OUTRO.start + 1) return <Outro f={f} />;
  const ks = keys();
  const tr = track();
  const pos = posAt(f, ks);
  const prev = posAt(f - 1, ks);
  const vx = pos.x - prev.x;
  const vy = pos.y - prev.y;
  const speed = Math.hypot(vx, vy);
  // masuk pelan di awal video
  const intro = interpolate(f, [0, 10], [0, 1], {...clamp, easing: ease});

  const lastChange = [...tr.changes].reverse().find((c) => c <= f + 4) ?? -999;
  const near = Math.abs(f - lastChange) <= 4;
  const mood = near && f < lastChange ? at(tr.mood, lastChange - 1) : at(tr.mood, f);
  const moodStart = [...tr.changes].reverse().find((c) => c <= f) ?? 0;
  const t = f - moodStart;
  let eyeOpen = near ? interpolate(Math.abs(f - lastChange), [0, 4], [0.08, 1], clamp) : 1;
  const canBlink = mood === 'biasa' || mood === 'kaget' || mood === 'cemas' || mood === 'mikir';
  if (canBlink && !near) eyeOpen = Math.min(eyeOpen, blinkOpen(f));
  // lelah = mengantuk: kelopak turun pelan sesekali
  if (mood === 'lelah' && !near) eyeOpen = Math.min(eyeOpen, 1 - 0.45 * Math.max(0, Math.sin(f / 16)));

  let lx = 0;
  let ly = 0;
  for (let k = 0; k < 8; k++) {
    const g = lookTarget(f - k, posAt(f - k, ks), at(tr.mood, f - k));
    lx += g.x / 8;
    ly += g.y / 8;
  }
  if (mood === 'cemas') {
    lx = Math.tanh(Math.sin(f / 7) * 3) * 0.75;
    ly = 0.1;
  }

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
    default:
      break;
  }

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

  const sweaty = mood === 'cemas' || mood === 'lelah';
  const sweat = sweaty ? interpolate(t, [0, 10], [0, 1], clamp) : 0;
  const sweatPhase = (((f % 50) + 50) % 50) / 50;

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
