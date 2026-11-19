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

// Fisika melayang (revisi 3 Bos): Gigi selalu mengambang, tidak pernah mendarat atau memantul.
// Posisi mengikuti titik tujuan lewat pegas teredam kritis (tanpa lewat batas, tanpa pantulan):
// mulai pelan, meluncur halus, lalu melambat sampai diam. Tujuan berganti di awal tiap perpindahan.
const OMEGA = 0.16; // kekakuan pegas per frame (sekitar 30 frame sampai diam)
type Pos = {f: number; x: number; y: number; size: number};
let simCache: Pos[] | null = null;
const targetAt = (f: number, ks: Key[]) => {
  let t = ks[0];
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i];
    const b = ks[i + 1];
    const moved = a.x !== b.x || a.y !== b.y || a.size !== b.size;
    if (moved && f >= a.f) t = b;
  }
  return t;
};
const simulate = (ks: Key[]): Pos[] => {
  if (simCache) return simCache;
  const out: Pos[] = [];
  const p = {x: ks[0].x, y: ks[0].y, size: ks[0].size};
  const v = {x: 0, y: 0, size: 0};
  for (let f = 0; f <= TOTAL_FRAMES + 2; f++) {
    const tg = targetAt(f, ks);
    // integrasi semi-implisit, 4 sub-langkah per frame agar stabil dan halus
    for (let k = 0; k < 4; k++) {
      const dt = 0.25;
      for (const key of ['x', 'y', 'size'] as const) {
        const acc = OMEGA * OMEGA * (tg[key] - p[key]) - 2 * OMEGA * v[key];
        v[key] += acc * dt;
        p[key] += v[key] * dt;
      }
    }
    out.push({f, x: p.x, y: p.y, size: p.size});
  }
  simCache = out;
  return out;
};
const posAt = (f: number, ks: Key[]): Pos => {
  const sim = simulate(ks);
  return sim[Math.max(0, Math.min(sim.length - 1, Math.round(f)))];
};

const moodRaw = (f: number): Mood => {
  if (f >= OUTRO.mergeFrom) return 'puas';
  if (f >= OUTRO.start - 12) return 'senang'; // ganti ekspresi selesai sebelum melayang ke logo
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

// Menggeleng (revisi 4 Bos: realistis, main kecepatan ease). Seperti kepala orang sungguhan:
// ancang-ancang kecil ke arah berlawanan, ayunan pertama paling lebar dan paling cepat, tiap ayunan
// berhenti sesaat di ujung (ease masuk-keluar sinus: cepat di tengah, melambat di ujung), amplitudo dan
// tempo mereda seperti bandul teredam, lalu diam sejenak sebelum mengulang lebih pelan dan lebih kecil.
// Badan menyusul 4 frame terlambat (follow-through) dan mata tetap menatap ke depan (berlawanan arah kepala).
const SHAKE: [number, number][] = [
  [0, 0],
  [5, 0.14],
  [11, -0.78],
  [18, 0.74],
  [25, -0.6],
  [32, 0.42],
  [39, -0.2],
  [45, 0],
];
const swing = Easing.bezier(0.45, 0, 0.55, 1);
const shakeTurn = (t: number) => {
  const cycle = 70;
  if (t < 0) return 0;
  const k = Math.floor(t / cycle);
  const u = (t % cycle) / (k === 0 ? 1 : 1.15); // ulangan lebih pelan
  const amp = k === 0 ? 1 : 0.55;
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


// Penutup: dari atas garis, melayang ke posisi gear huruf A sambil menoleh ke arah gerak, menutup mata, berputar pas ke kelipatan 45 derajat, lalu digantikan gear asli.
const Outro: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  const tr = track();
  if (f > o.swap[1] + 2) return null;
  const from = {x: 540, y: GY, size: SIZE};
  const to = GEAR_TARGET;
  const u = interpolate(f, [o.hop, o.land], [0, 1], {...clamp, easing: ease});
  // Melayang (bukan melompat): lengkung landai, sampai dengan kecepatan nol, tanpa pantulan.
  // Ayunan mengambang dari jalur utama ikut diteruskan lalu mereda, agar tidak ada loncatan posisi.
  const keep = 1 - u;
  const arc = Math.sin(Math.PI * u) * 70;
  const x = from.x + (to.x - from.x) * u + Math.sin(f / 41 + 1) * 2.5 * keep;
  const y = from.y + (to.y - from.y) * u - arc + (Math.sin(f / 28) * 5 + Math.sin(f / 16) * 3) * keep;
  const size = from.size + (to.size - from.size) * interpolate(f, [o.hop, o.land - 6], [0, 1], {...clamp, easing: ease});
  const base = at(tr.spin, o.start);
  const target = Math.ceil(base / 45) * 45 + 45;
  const spin = base + (target - base) * interpolate(f, [o.mergeFrom, o.mergeTo], [0, 1], {...clamp, easing: ease});
  const mood: Mood = f >= o.mergeFrom ? 'puas' : 'senang';
  const eyesOpacity = interpolate(f, [o.mergeFrom + 6, o.mergeTo - 2], [1, 0], clamp);
  const opacity = interpolate(f, o.swap, [1, 0], clamp);
  const shadow = interpolate(f, [o.land - 4, o.land + 4], [1, 0], clamp);
  const tilt = (f < o.land ? (to.x - from.x) * 0.012 * Math.sin(Math.PI * u) : 0) + Math.sin(f / 20) * 3 * keep;
  // menoleh ke arah lompatan, kembali menghadap depan saat mendarat
  const turn = (f < o.mergeFrom ? Math.sign(to.x - from.x) * 0.45 * Math.sin(Math.PI * u) : 0) + Math.sin(f / 16) * 0.12 * keep;
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
  // Mendongak/menunduk ala 3D tanpa gepeng: menonton ilustrasi di atas = mendongak; sedih = mendongak haru.
  // Dirata-rata 12 frame agar perubahan arah selalu halus.
  let pitch = 0;
  for (let k = 0; k < 12; k++) {
    const m = at(tr.mood, f - k);
    const g = lookTarget(f - k, posAt(f - k, ks), m);
    pitch += (m === 'sedih' ? -0.5 : Math.max(-0.4, Math.min(0.3, g.y * 0.45))) / 12;
  }

  let dy = 0;
  let dx = 0;
  let tilt = 0;
  let shakeEye = 0;
  const breathe = Math.sin(f / 14);
  switch (mood) {
    case 'biasa':
      dy = breathe * 1.5;
      break;
    case 'kaget':
      dy = -6 * Math.sin(Math.min(1, t / 10) * Math.PI * 0.5);
      break;
    case 'senang': {
      dy = Math.sin(f / 16) * 3;
      tilt = Math.sin(f / 20) * 3;
      turn += Math.sin(f / 16) * 0.12;
      break;
    }
    case 'puas':
      dy = Math.sin(f / 18) * 4;
      tilt = Math.sin(f / 18) * 5;
      break;
    case 'cemas': {
      // menggeleng: wajah berputar kiri-kanan di permukaan bulat; badan menyusul sedikit terlambat
      const s = shakeTurn(t - 2);
      const lag = shakeTurn(t - 6);
      turn += s;
      tilt = -lag * 4;
      dx = lag * 5;
      dy = Math.abs(s) * 2;
      shakeEye = -s * 0.55;
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

  tilt += Math.max(-10, Math.min(10, vx * 0.7));

  // Mengambang terus: naik-turun pelan dan sedikit melayang ke samping, tanpa hentakan.
  dy += Math.sin(f / 28) * 5;
  dx += Math.sin(f / 41 + 1) * 2.5;
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
        look={{x: lx + shakeEye, y: ly}}
        eyeOpen={eyeOpen}
        sweat={sweat}
        sweatPhase={sweatPhase}
        spin={at(tr.spin, f)}
        tilt={tilt}
        turn={Math.max(-0.85, Math.min(0.85, turn))}
        pitch={pitch}
      />
    </div>
  );
};
