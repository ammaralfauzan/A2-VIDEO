import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {color, font, radius, shadow} from '../../theme';
import {OUTRO} from './Penutup';
import {CARD, CENTER, FACTS, MYTHS, P, SLOT_SCALE, SLOT_Y, SLOTS, TASK} from './layout';

// Tiga kartu: tertutup bertumpuk (hook) -> merenggang -> satu per satu maju ke tengah, dibuka (MITOS),
// dicap, lalu dibalik datar (FAKTA) dan kembali ke baris atas. Akhirnya tiga FAKTA merapat dan memudar,
// tersisa satu kartu kecil kosong bertanda tanya. Tanpa cut: setiap perubahan adalah gerak/balik.

type St = {x: number; y: number; s: number; r: number};
type Key = {f: number} & St;
const MOVE = 16;

const stack = (i: number): St => [
  {x: CENTER.x, y: CENTER.y, s: 1, r: -2},
  {x: CENTER.x + 12, y: CENTER.y + 14, s: 1, r: 3},
  {x: CENTER.x - 14, y: CENTER.y + 26, s: 1, r: -4},
][i];
const fan = (i: number): St => [
  {x: CENTER.x, y: CENTER.y - 10, s: 0.94, r: 0},
  {x: CENTER.x - 92, y: CENTER.y + 18, s: 0.9, r: -9},
  {x: CENTER.x + 92, y: CENTER.y + 18, s: 0.9, r: 9},
][i];
const center: St = {x: CENTER.x, y: CENTER.y, s: 1, r: 0};
const slot = (i: number): St => ({x: SLOTS[i], y: SLOT_Y, s: SLOT_SCALE, r: 0});
const row = (i: number): St => ({x: 540 + (i - 1) * 206, y: SLOT_Y, s: 0.3, r: 0});

const keys = (i: number): Key[] => {
  const k: Key[] = [
    {f: 0, ...stack(i)},
    {f: P.spread(), ...fan(i)},
    {f: P.park(), ...(i === 0 ? center : slot(i))},
  ];
  if (i > 0) k.push({f: P.advance(i), ...center});
  if (i < 2) {
    k.push({f: P.back(i), ...slot(i)});
    k.push({f: P.gather(), ...row(i)});
  } else {
    // kartu terakhir mengecil di tempat sambil ke kanan, baru naik ke baris (tidak melintasi kartu kecil lain)
    k.push({f: P.back(i), ...row(i), y: CENTER.y});
    k.push({f: P.back(i) + 12, ...row(i)});
  }
  return k;
};

const stateAt = (f: number, ks: Key[]): St => {
  let cur: St = ks[0];
  for (let j = 1; j < ks.length; j++) {
    const k = ks[j];
    if (f < k.f) break;
    const u = interpolate(f, [k.f, k.f + MOVE], [0, 1], {...clamp, easing: ease});
    cur = {x: cur.x + (k.x - cur.x) * u, y: cur.y + (k.y - cur.y) * u, s: cur.s + (k.s - cur.s) * u, r: cur.r + (k.r - cur.r) * u};
  }
  return cur;
};

// Posisi kartu i di layar (untuk lirikan Gigi).
export const cardPos = (i: number, f: number) => stateAt(f, keys(i));

type Face = 'back' | 'myth' | 'fact';
const FLIP = 14;
// Balik datar (rotateY): wajah lama sampai 90 derajat, lalu wajah baru dari -90 ke 0.
const faceAt = (i: number, f: number): {face: Face; rot: number} => {
  const flips: [number, Face, Face][] = [
    [P.showMyth(i), 'back', 'myth'],
    [P.flipFact(i), 'myth', 'fact'],
  ];
  let face: Face = 'back';
  let rot = 0;
  for (const [at, from, to] of flips) {
    if (f < at) break;
    const u = interpolate(f, [at, at + FLIP], [0, 1], {...clamp, easing: ease});
    face = u < 0.5 ? from : to;
    rot = u < 0.5 ? u * 180 : u * 180 - 180;
  }
  return {face, rot};
};

const Back: React.FC = () => (
  <svg width={CARD.w} height={CARD.h} viewBox={`0 0 ${CARD.w} ${CARD.h}`} style={{position: 'absolute', inset: 0}}>
    <rect x={18} y={18} width={CARD.w - 36} height={CARD.h - 36} rx={radius.card} fill="none" stroke={color.blue1} strokeOpacity={0.4} strokeWidth={3} />
    <circle cx={CARD.w / 2} cy={CARD.h / 2} r={70} fill="none" stroke={color.surface} strokeOpacity={0.9} strokeWidth={6} />
    <QMark x={CARD.w / 2} y={CARD.h / 2} k={1} stroke={color.surface} />
  </svg>
);

// Tanda tanya digambar (bukan teks) agar kartu bertumpuk tidak terbaca sebagai teks bertabrakan.
const QMark: React.FC<{x: number; y: number; k: number; stroke: string}> = ({x, y, k, stroke}) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d="M-18,-16 Q-18,-38 0,-38 Q18,-38 18,-20 Q18,-8 4,-2 Q0,1 0,10" fill="none" stroke={stroke} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={0} cy={30} r={6} fill={stroke} />
  </g>
);

const Stamp: React.FC<{f: number; at: number}> = ({f, at}) => {
  if (f < at) return null;
  const u = interpolate(f, [at, at + 5], [0, 1], {...clamp, easing: ease});
  return (
    <div
      style={{
        position: 'absolute',
        right: 36,
        bottom: 24,
        padding: '0 20px',
        border: `6px solid ${color.alert}`,
        borderRadius: radius.input,
        color: color.alert,
        fontFamily: font.family,
        fontSize: 48,
        fontWeight: 600,
        letterSpacing: '0.08em',
        lineHeight: 1.15,
        opacity: interpolate(u, [0, 0.4], [0, 0.92], clamp),
        transform: `rotate(-7deg) scale(${1.6 - 0.6 * u})`,
        transformOrigin: 'center',
      }}
    >
      MITOS
    </div>
  );
};

const Front: React.FC<{i: number; face: 'myth' | 'fact'; f: number}> = ({i, face, f}) => {
  const fact = face === 'fact';
  return (
    <div style={{position: 'absolute', inset: 0, padding: '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20}}>
      {fact ? (
        <div style={{padding: '6px 20px', borderRadius: radius.pill, background: color.success, color: color.surface, fontSize: 28, fontWeight: 600, letterSpacing: '0.06em'}}>FAKTA</div>
      ) : (
        <div style={{padding: '6px 0', color: color.muted, fontSize: 30, fontWeight: 500}}>Katanya</div>
      )}
      <div style={{width: CARD.w - 80, color: color.navy, fontSize: fact ? 50 : 56, fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.02em'}}>
        {fact ? FACTS[i] : MYTHS[i]}
      </div>
      {fact ? null : <Stamp f={f} at={P.stamp(i)} />}
    </div>
  );
};

const Card: React.FC<{i: number; f: number}> = ({i, f}) => {
  const st = stateAt(f, keys(i));
  const {face, rot} = faceAt(i, f);
  const intro = interpolate(f, [P.stackIn + i * 3, P.stackIn + i * 3 + 10], [0, 1], {...clamp, easing: ease});
  const out = interpolate(f, [P.rowOut(), P.rowOut() + 10], [1, 0], clamp);
  // goyang pelan selama tumpukan tertutup
  const wob = f < P.park() + MOVE ? Math.sin(f / 9 + i * 2) * 1.4 * interpolate(f, [P.park(), P.park() + MOVE], [1, 0], clamp) : 0;
  // hentakan cap: kartu turun sedikit lalu kembali
  const at = P.stamp(i);
  const thump = f >= at && f < at + 10 ? Math.sin(((f - at) / 10) * Math.PI) * 6 : 0;
  const isFront = face !== 'back';
  const frontFact = face === 'fact';
  return (
    <div
      style={{
        position: 'absolute',
        left: st.x - CARD.w / 2,
        top: st.y - CARD.h / 2 + thump + (1 - intro) * 20,
        width: CARD.w,
        height: CARD.h,
        opacity: intro * out,
        filter: intro < 1 ? `blur(${(1 - intro) * 6}px)` : undefined,
        transform: `perspective(1800px) scale(${st.s}) rotate(${st.r + wob}deg) rotateY(${rot}deg)`,
        transformOrigin: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius.window,
          background: isFront ? color.surface : color.navy,
          border: isFront ? `${frontFact ? 4 : 2}px solid ${frontFact ? color.success : color.line}` : 'none',
          boxShadow: shadow,
          overflow: 'hidden',
          fontFamily: font.family,
        }}
      >
        {isFront ? <Front i={i} face={face as 'myth' | 'fact'} f={f} /> : <Back />}
      </div>
    </div>
  );
};

// Urutan tumpuk: kartu aktif (di tengah) selalu paling atas.
const order = (f: number) => {
  const active = [0, 1, 2].filter((i) => f >= (i === 0 ? 0 : P.advance(i)) && f < P.back(i) + MOVE);
  if (f < P.park()) return [2, 1, 0];
  const rest = [0, 1, 2].filter((i) => !active.includes(i));
  return [...rest, ...active];
};

const Task: React.FC<{k: number; f: number}> = ({k, f}) => {
  const at = P.task(k);
  if (f < at - 2 || f >= P.taskOut() + 10) return null;
  const p = interpolate(f, [at, at + 10], [0, 1], {...clamp, easing: ease});
  const lit = interpolate(f, [at + 6, at + 16], [0, 1], clamp);
  const out = interpolate(f, [P.taskOut(), P.taskOut() + 10], [1, 0], clamp);
  const label = ['Rekap harian', 'Kirim pengingat'][k];
  return (
    <div
      style={{
        position: 'absolute',
        left: TASK.left,
        top: TASK.tops[k] + (1 - p) * 10,
        width: TASK.w,
        height: TASK.h,
        boxSizing: 'border-box',
        borderRadius: radius.input,
        background: color.surface,
        border: `3px solid ${lit > 0.5 ? color.blue1 : color.line}`,
        boxShadow: `0 10px 28px rgba(11,22,48,${0.06 + 0.1 * lit})`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 20px',
        fontFamily: font.family,
        opacity: p * out,
        filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
      }}
    >
      <svg width={30} height={30} viewBox="0 0 30 30">
        <circle cx={15} cy={15} r={13} fill={lit > 0.5 ? color.success : 'none'} stroke={lit > 0.5 ? color.success : color.line} strokeWidth={3} />
        {lit > 0.5 ? <path d="M9,15.5 L13.5,20 L21,11" fill="none" stroke={color.surface} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /> : null}
      </svg>
      <div style={{fontSize: 30, fontWeight: 600, color: color.navy, letterSpacing: '-0.01em'}}>{label}</div>
      <div style={{marginLeft: 'auto', fontSize: 22, fontWeight: 500, color: color.muted}}>contoh</div>
    </div>
  );
};

// Kartu kecil kosong bertanda tanya (pertanyaan untuk penonton).
export const ASK = {w: 460, h: 290};
const Ask: React.FC<{f: number}> = ({f}) => {
  const at = P.ask();
  if (f < at - 2 || f >= OUTRO.start + 8) return null;
  const p = interpolate(f, [at, at + 12], [0, 1], {...clamp, easing: ease});
  const out = interpolate(f, [OUTRO.start - 2, OUTRO.start + 8], [1, 0], clamp);
  const pulse = 1 + Math.sin((f - at) / 9) * 0.015 * p;
  return (
    <div
      style={{
        position: 'absolute',
        left: CENTER.x - ASK.w / 2,
        top: CENTER.y - ASK.h / 2,
        width: ASK.w,
        height: ASK.h,
        boxSizing: 'border-box',
        borderRadius: radius.window,
        background: color.surface,
        border: `3px dashed ${color.muted}`,
        boxShadow: shadow,
        opacity: p * out,
        filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
        transform: `translateY(${(1 - p) * 16}px) scale(${(0.9 + 0.1 * p) * pulse})`,
      }}
    >
      <svg width={ASK.w - 6} height={ASK.h - 6} viewBox={`0 0 ${ASK.w - 6} ${ASK.h - 6}`}>
        <QMark x={(ASK.w - 6) / 2} y={(ASK.h - 6) / 2} k={1.6} stroke={color.blue2} />
      </svg>
    </div>
  );
};

export const Kartu: React.FC<{f: number}> = ({f}) => {
  if (f >= OUTRO.start + 8) return null;
  const showCards = f < P.rowOut() + 10;
  return (
    <>
      {showCards ? order(f).map((i) => <Card key={i} i={i} f={f} />) : null}
      <Task k={0} f={f} />
      <Task k={1} f={f} />
      <Ask f={f} />
    </>
  );
};
