import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Gigi, Mood} from '../../components/Gigi';
import {clamp, ease} from '../../components/motion';
import {S, sf, TOTAL_FRAMES, wf} from '../../data/timeline-alasan-saya-bikin-a2';
import {GEAR_TARGET, OUTRO} from './Penutup';
import {LINE, P, POINTS} from './layout';

// Gigi menemani di atas garis waktu, menonton ilustrasi cerita; ekspresinya mengikuti rasa cerita,
// lalu melompat dan menjadi gear di logo.
// Revisi 2 (Bos): Gigi 2D tapi terasa 3D. Badan TIDAK pernah dipipihkan/diregangkan (tidak gepeng);
// gerak memakai putaran kepala (`turn`: wajah bergeser di permukaan bulat), condong, dan naik-turun.
// Cemas = menggeleng dengan percepatan/perlambatan alami; ganti ekspresi disamarkan dengan
// menoleh sekejap, bukan memencet wajah.

type Key = {f: number; x: number; y: number; size: number};
const GY = 795; // pusat Gigi kecil, duduk di atas garis waktu (di bawah panggung ilustrasi)
const SIZE = 150;
const HOOK = {x: 540, y: 540, size: 240}; // saat hook Gigi besar di tengah, panggung belum ada
const gx = (i: number) => Math.max(250, Math.min(780, POINTS[i].x));

const keys = (): Key[] => [
  {f: 0, ...HOOK},
  {f: P.pointIn(0) - 10, ...HOOK},
  {f: P.pointIn(0) + 10, x: gx(0), y: GY, size: SIZE},
  {f: P.pointIn(1) - 2, x: gx(0), y: GY, size: SIZE},
  {f: P.pointIn(1) + 20, x: gx(1), y: GY, size: SIZE},
  {f: P.pointIn(2) - 2, x: gx(1), y: GY, size: SIZE},
  {f: P.pointIn(2) + 20, x: gx(2), y: GY, size: SIZE},
  {f: P.merge()[0], x: gx(2), y: GY, size: SIZE},
  {f: P.merge()[1], x: 540, y: GY, size: SIZE},
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
  if (f >= OUTRO.start) return 'senang';
  if (f >= wf(S.alasan, 7) - 2) return 'puas'; // "kebersamaan keluarga": hangat
  if (f >= sf(S.bukan)) return 'senang'; // tersenyum
  if (f >= sf(S.manusia)) return 'puas'; // lega
  if (f >= P.mesin()) return 'senang';
  if (f >= sf(S.pikir)) return 'mikir';
  if (f >= sf(S.waktu)) return 'sedih'; // "waktu untuk keluarga": sedih sambil menatap ilustrasi
  if (f >= sf(S.sadar)) return 'mikir';
  if (f >= wf(S.ketik, 3) - 2) return 'lelah'; // "tapi karena mengetik ulang"
  if (f >= sf(S.ketik) - 2) return 'cemas'; // "Bukan karena sepi": menggeleng
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

// Menggeleng: kunci sudut kepala dengan ease masuk-keluar per ayunan (cepat di tengah, melambat di ujung),
// ayunan mengecil, lalu jeda sebelum mengulang lebih pelan. Nilai = sinus sudut hadap.
const SHAKE: [number, number][] = [
  [0, 0],
  [5, -0.72],
  [12, 0.72],
  [19, -0.6],
  [25, 0.42],
  [30, -0.18],
  [34, 0],
];
const swing = Easing.bezier(0.42, 0, 0.3, 1);
const shakeTurn = (t: number) => {
  const cycle = 58;
  if (t < 0) return 0;
  const k = Math.floor(t / cycle);
  const u = t % cycle;
  const amp = k === 0 ? 1 : 0.6;
  for (let i = 0; i < SHAKE.length - 1; i++) {
    const [t0, v0] = SHAKE[i];
    const [t1, v1] = SHAKE[i + 1];
    if (u >= t0 && u <= t1) return amp * (v0 + (v1 - v0) * swing((u - t0) / (t1 - t0)));
  }
  return 0;
};

const lookTarget = (f: number, pos: {x: number; y: number}, mood: Mood) => {
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
  if (mood === 'cemas') return {x: 0, y: 0};
  if (f < P.lineOut()[0]) return {x: 0.1, y: -0.85}; // menonton ilustrasi cerita di atasnya
  return {x: 0, y: 0};
};

const hump = (t: number, len: number) => (t >= 0 && t <= len ? Math.sin((Math.PI * t) / len) : 0);

// Penutup: dari atas garis, ancang-ancang (menunduk sedikit), melompat ke posisi gear huruf A sambil
// menoleh ke arah lompatan, menutup mata, berputar pas ke kelipatan 45 derajat, lalu digantikan gear asli.
const Outro: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  const tr = track();
  if (f > o.swap[1] + 2) return null;
  const from = {x: 540, y: GY, size: SIZE};
  const to = GEAR_TARGET;
  const u = interpolate(f, [o.hop, o.land], [0, 1], {...clamp, easing: ease});
  const x = from.x + (to.x - from.x) * u;
  const arc = Math.sin(Math.PI * u) * 200;
  const crouch = f < o.hop ? 6 * interpolate(f, [o.start, o.hop], [0, 1], clamp) : 0;
  const y = from.y + (to.y - from.y) * u - arc + crouch;
  const size = from.size + (to.size - from.size) * interpolate(f, [o.hop, o.land - 6], [0, 1], {...clamp, easing: ease});
  const base = at(tr.spin, o.start);
  const target = Math.ceil(base / 45) * 45 + 45;
  const spin = base + (target - base) * interpolate(f, [o.mergeFrom, o.mergeTo], [0, 1], {...clamp, easing: ease});
  const mood: Mood = f >= o.mergeFrom ? 'puas' : 'senang';
  const eyesOpacity = interpolate(f, [o.mergeFrom + 6, o.mergeTo - 2], [1, 0], clamp);
  const opacity = interpolate(f, o.swap, [1, 0], clamp);
  const shadow = interpolate(f, [o.land - 4, o.land + 4], [1, 0], clamp);
  const tilt = f < o.land ? (to.x - from.x) * 0.012 * Math.sin(Math.PI * u) : 0;
  // menoleh ke arah lompatan, kembali menghadap depan saat mendarat
  const turn = f < o.mergeFrom ? Math.sign(to.x - from.x) * 0.45 * Math.sin(Math.PI * u) : 0;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, zIndex: 20, opacity}}>
      <Gigi size={size} mood={mood} spin={spin} eyesOpacity={eyesOpacity} shadow={shadow} tilt={tilt} turn={turn} />
    </div>
  );
};

export const GigiJalan: React.FC<{f: number}> = ({f}) => {
  if (f >= OUTRO.start + 1) return <Outro f={f} />;
  const ks = keys();
  const tr = track();
  const pos = posAt(f, ks);
  const intro = interpolate(f, [0, 10], [0, 1], {...clamp, easing: ease});

  // Ganti ekspresi: menoleh sekejap (ekspresi ditukar saat wajah paling menyamping).
  const lastChange = [...tr.changes].reverse().find((c) => c <= f + 5) ?? -999;
  const d = f - lastChange; // -5..5 di sekitar pergantian
  const near = Math.abs(d) <= 5;
  const mood = at(tr.mood, f);
  const moodStart = [...tr.changes].reverse().find((c) => c <= f) ?? 0;
  const t = f - moodStart;
  let turn = near ? 0.5 * Math.sin((Math.PI * (d + 5)) / 10) : 0;
  let eyeOpen = 1;
  if (mood === 'biasa' && !near) eyeOpen = blinkOpen(f);

  // Saat berpindah, kepala menoleh ke arah tujuan (terasa 3D), tanpa meregang.
  let vx = 0;
  for (let k = 0; k < 6; k++) vx += (posAt(f - k + 3, ks).x - posAt(f - k + 2, ks).x) / 6;
  turn += Math.max(-0.7, Math.min(0.7, vx / 9));

  let lx = 0;
  let ly = 0;
  for (let k = 0; k < 8; k++) {
    const g = lookTarget(f - k, posAt(f - k, ks), at(tr.mood, f - k));
    lx += g.x / 8;
    ly += g.y / 8;
  }

  let dy = 0;
  let dx = 0;
  let tilt = 0;
  const breathe = Math.sin(f / 14);
  switch (mood) {
    case 'biasa':
      dy = breathe * 5;
      break;
    case 'kaget':
      dy = -38 * (pos.size / 240) * hump(t, 14);
      break;
    case 'senang': {
      const hop = Math.abs(Math.sin((t * Math.PI) / 9)) * 14 * interpolate(t, [0, 36], [1, 0], clamp);
      dy = -hop + Math.sin(f / 10) * 4;
      tilt = Math.sin(f / 10) * 3;
      turn += Math.sin(f / 16) * 0.12;
      break;
    }
    case 'puas':
      dy = Math.sin(f / 18) * 4;
      tilt = Math.sin(f / 18) * 5;
      break;
    case 'cemas': {
      // menggeleng: wajah berputar kiri-kanan di permukaan bulat; kepala ikut condong sedikit
      const s = shakeTurn(t - 2);
      turn += s;
      tilt = -s * 5;
      dx = s * 4;
      dy = Math.sin(f / 6) * 1.5;
      break;
    }
    case 'lelah': {
      // lunglai: turun pelan, miring lesu, kepala sesekali terangguk kantuk (tanpa dipipihkan)
      const slump = interpolate(t, [0, 16], [0, 1], {...clamp, easing: ease});
      const nod = Math.max(0, Math.sin(f / 22)) ** 3;
      dy = 10 * slump + nod * 6 + Math.sin(f / 24) * 2;
      tilt = -6 * slump - nod * 3;
      turn += Math.sin(f / 30) * 0.12 * slump;
      break;
    }
    case 'sedih': {
      // sedih: sedikit turun, napas berat pelan, menatap ilustrasi di atas
      const sink = interpolate(t, [0, 20], [0, 1], {...clamp, easing: ease});
      dy = 6 * sink + Math.sin(f / 26) * 2;
      tilt = -3 * sink + Math.sin(f / 30) * 1.5;
      break;
    }
    case 'mikir': {
      const lean = interpolate(t, [0, 14], [0, 1], {...clamp, easing: ease});
      tilt = 11 * lean + Math.sin(f / 22) * 2;
      dy = Math.sin(f / 20) * 3;
      turn += 0.2 * lean;
      break;
    }
    default:
      break;
  }

  // Mendarat: memantul kecil (naik-turun), bukan dipipihkan.
  const land = f - lastLanding(f, ks);
  if (land >= 0 && land < 14) dy += -5 * Math.sin((Math.PI * land) / 14);
  tilt += Math.max(-10, Math.min(10, vx * 0.7));

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
        turn={Math.max(-0.85, Math.min(0.85, turn))}
      />
    </div>
  );
};
