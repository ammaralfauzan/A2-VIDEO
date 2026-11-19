import React from 'react';
import {color} from '../theme';
import {Eyes, Mood, R_BODY, R_HOLE, R_TOOTH, TOOTH_W} from './Gigi';

// Gigi "presisi" (Arahan Bos 19 Nov 2026, dipakai mulai "Tiga Salah Kaprah"):
// 1. Siluet selalu lingkaran: ketebalan tipis seperti roda gigi mesin (±5% jari-jari), arahnya TETAP
//    (kanan-bawah, mengikuti cahaya tetap), tidak membesar saat menoleh/mendongak.
// 2. Layar wajah selalu di tengah gear. Yang bergerak hanya mata/alis/mulut (paralaks kecil di dalam layar)
//    dan gigi gear yang ikut berputar sedikit.
// 3. Ganti ekspresi = morf: wajah lama dan baru disilang-pudar beberapa frame sambil kelopak sedikit
//    menyempit dan wajah bergeser kecil (`prevMood` + `morph`), bukan menoleh/menutup mata.
// 4. Arah lirikan (`look`) dihitung pemanggil dari posisi benda yang sedang aktif.
// Komponen Gigi lama (`Gigi.tsx`) tidak diubah, jadi video lama tetap identik.

type Props = {
  size?: number;
  mood?: Mood;
  prevMood?: Mood; // ekspresi sebelumnya, untuk morf
  morph?: number; // 0 = masih ekspresi lama, 1 = ekspresi baru penuh
  look?: {x: number; y: number};
  spin?: number;
  eyeOpen?: number;
  sweat?: number;
  sweatPhase?: number;
  tilt?: number;
  eyesOpacity?: number;
  shadow?: number;
  turn?: number; // -1..1, hanya menggeser isi wajah dan memutar gigi gear sedikit
  pitch?: number; // -1..1 (negatif = mendongak)
  volume?: number; // 1 = penuh, menuju 0 = datar (saat menyatu dengan gear logo)
};

const Gear: React.FC<{fill: string; rot: number; dx?: number; dy?: number; k?: number}> = ({fill, rot, dx = 0, dy = 0, k = 1}) => (
  <g transform={`translate(${dx} ${dy}) scale(${k}) rotate(${rot})`}>
    {Array.from({length: 8}, (_, i) => (
      <rect key={i} x={-TOOTH_W / 2} y={-R_TOOTH} width={TOOTH_W} height={R_TOOTH - R_BODY + 8} rx={3} fill={fill} transform={`rotate(${i * 45})`} />
    ))}
    <circle r={R_BODY} fill={fill} />
  </g>
);

// clipPath tidak boleh berisi <g> (lihat skill a2-maskot-gigi): bentuk langsung, transform per bentuk.
const gearClip = (rot: number, k = 1) => (
  <>
    {Array.from({length: 8}, (_, i) => (
      <rect key={i} x={-TOOTH_W / 2} y={-R_TOOTH} width={TOOTH_W} height={R_TOOTH - R_BODY + 8} rx={3} transform={`scale(${k}) rotate(${rot + i * 45})`} />
    ))}
    <circle r={R_BODY * k} />
  </>
);

export const GigiPresisi: React.FC<Props> = ({
  size = 140,
  mood = 'biasa',
  prevMood,
  morph = 1,
  look = {x: 0, y: 0},
  spin = 0,
  eyeOpen = 1,
  sweat = 0,
  sweatPhase = 0,
  tilt = 0,
  eyesOpacity = 1,
  shadow = 1,
  turn = 0,
  pitch = 0,
  volume = 1,
}) => {
  const id = React.useId().replace(/:/g, '');
  const v = Math.max(0, Math.min(1, volume));
  const rot = spin + turn * 10;
  // ketebalan tipis, arah tetap
  const TH = {x: 2.2 * v, y: 3.4 * v};
  const INSET = 0.88;
  // isi wajah: paralaks kecil di dalam layar yang diam di tengah
  const fx = turn * 9;
  const fy = pitch * 7;
  const m = Math.max(0, Math.min(1, morph));
  const swap = prevMood && prevMood !== mood && m < 1;
  // morf: kelopak menyempit di tengah peralihan, wajah bergeser kecil ke bawah lalu kembali
  const squint = swap ? 1 - 0.45 * Math.sin(Math.PI * m) : 1;
  const nudge = swap ? Math.sin(Math.PI * m) * 2.5 : 0;
  const dropY = -58 + sweatPhase * 16;
  const dropO = sweat * Math.min(1, (1 - sweatPhase) * 3) * Math.min(1, sweatPhase * 6 + 0.2);
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="-80 -80 160 189"
      style={{overflow: 'visible', filter: shadow > 0 ? `drop-shadow(0 ${size * 0.07}px ${size * 0.11}px rgba(11,22,48,${0.24 * shadow}))` : undefined}}
    >
      <defs>
        <clipPath id={`${id}g`}>{gearClip(rot)}</clipPath>
        <clipPath id={`${id}i`}>{gearClip(rot, INSET)}</clipPath>
        <clipPath id={`${id}h`}>
          <circle r={R_HOLE - 1} />
        </clipPath>
        <linearGradient id={`${id}bev`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={color.surface} stopOpacity={0.5 * v} />
          <stop offset="40%" stopColor={color.surface} stopOpacity={0} />
          <stop offset="62%" stopColor={color.navyInk} stopOpacity={0} />
          <stop offset="100%" stopColor={color.navyInk} stopOpacity={0.8 * v} />
        </linearGradient>
        <radialGradient id={`${id}top`} cx="34%" cy="26%" r="75%">
          <stop offset="0%" stopColor={color.blue1} stopOpacity={0.4 * v} />
          <stop offset="35%" stopColor={color.blue2} stopOpacity={0.28 * v} />
          <stop offset="70%" stopColor={color.blue2} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="45%" stopColor={color.navyInk} stopOpacity={0} />
          <stop offset="100%" stopColor={color.navyInk} stopOpacity={0.5 * v} />
        </linearGradient>
        <radialGradient id={`${id}scr`} cx="42%" cy="36%" r="70%">
          <stop offset="0%" stopColor={color.surface} />
          <stop offset="66%" stopColor={color.surface} />
          <stop offset="90%" stopColor={color.line} />
          <stop offset="100%" stopColor={color.muted} stopOpacity={0.7 * v} />
        </radialGradient>
      </defs>
      <g transform={`rotate(${tilt})`}>
        {/* ketebalan: dua lapis tipis, arah tetap */}
        <Gear fill={color.navyInk} rot={rot} dx={TH.x} dy={TH.y} />
        <Gear fill={color.navyInk} rot={rot} dx={TH.x / 2} dy={TH.y / 2} />
        {/* muka depan + bevel */}
        <Gear fill={color.navy} rot={rot} />
        <g clipPath={`url(#${id}g)`}>
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}bev)`} />
        </g>
        {/* permukaan atas sedikit lebih kecil, diterangi lembut dari kiri atas */}
        <Gear fill={color.navy} rot={rot} k={INSET} />
        <g clipPath={`url(#${id}i)`}>
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}top)`} />
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}s)`} />
        </g>
        <path d="M-47,-30 A56,56 0 0 1 -18,-53" stroke={color.surface} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.32 * v} />
        {/* layar wajah: selalu di tengah */}
        <circle r={R_HOLE + 1.5 * v} fill={color.navyInk} />
        <circle r={R_HOLE - 1} fill={`url(#${id}scr)`} />
        <g clipPath={`url(#${id}h)`}>
          <g opacity={eyesOpacity} transform={`translate(${fx} ${fy + nudge})`}>
            {swap ? (
              <>
                <g opacity={1 - m}>
                  <Eyes mood={prevMood} blink={false} look={look} open={eyeOpen * squint} />
                </g>
                <g opacity={m}>
                  <Eyes mood={mood} blink={false} look={look} open={eyeOpen * squint} />
                </g>
              </>
            ) : (
              <Eyes mood={mood} blink={false} look={look} open={eyeOpen} />
            )}
          </g>
          <ellipse cx={-15} cy={-22} rx={10} ry={4} transform="rotate(-32 -15 -22)" fill={color.surface} opacity={0.8 * v} />
        </g>
        {sweat > 0 ? (
          <g opacity={dropO}>
            <path d={`M60,${dropY} c0,0 9,12 9,18 a9,9 0 0,1 -18,0 c0,-6 9,-18 9,-18z`} fill={color.blue1} />
            <ellipse cx={57} cy={dropY + 13} rx={2} ry={3.5} fill={color.surface} opacity={0.7} />
          </g>
        ) : null}
      </g>
    </svg>
  );
};
