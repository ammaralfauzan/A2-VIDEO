import React from 'react';
import {color} from '../theme';

// Maskot "Gigi": roda gigi 2D datar berwarna navy dengan dua mata, terinspirasi gear di logo A2.
// Bukan robot dan bukan 3D: satu warna, tanpa gradasi, tanpa bayangan tebal.

export type Mood = 'senang' | 'biasa' | 'lelah' | 'kaget' | 'mikir';

type Props = {
  size?: number;
  mood?: Mood;
  look?: {x: number; y: number}; // arah lirikan, -1..1
  spin?: number; // derajat putaran gigi (badan dan wajah tetap tegak)
  blink?: boolean;
  sweat?: number; // 0..1
  wave?: number; // 0..1, lambaian tangan
};

const TEETH = 8;
const R_BODY = 60;
const R_TOOTH = 76;

const gearPath = () => {
  const pts: string[] = [];
  for (let i = 0; i < TEETH; i++) {
    const a = (i / TEETH) * Math.PI * 2;
    const w = (Math.PI * 2) / TEETH / 2.6; // setengah lebar gigi
    const p = (r: number, ang: number) => `${(Math.cos(ang) * r).toFixed(2)},${(Math.sin(ang) * r).toFixed(2)}`;
    pts.push(p(R_BODY, a - w * 1.25), p(R_TOOTH, a - w * 0.8), p(R_TOOTH, a + w * 0.8), p(R_BODY, a + w * 1.25));
  }
  return `M${pts.join(' L')} Z`;
};
const GEAR = gearPath();

export const Gigi: React.FC<Props> = ({size = 200, mood = 'biasa', look = {x: 0, y: 0}, spin = 0, blink = false, sweat = 0, wave = 0}) => {
  const eyeRy = blink ? 2 : mood === 'kaget' ? 16 : 13;
  const px = look.x * 4.5;
  const py = look.y * 4.5;
  const lid = mood === 'lelah' ? 9 : 0; // kelopak turun
  const mouth = {
    senang: 'M-14,22 Q0,34 14,22',
    biasa: 'M-10,25 Q0,29 10,25',
    lelah: 'M-11,28 Q0,23 11,28',
    kaget: 'M-6,26 a6,7 0 1,0 12,0 a6,7 0 1,0 -12,0',
    mikir: 'M-9,27 L9,24',
  }[mood];
  return (
    <svg width={size} height={size * 1.2} viewBox="-100 -100 200 240" style={{overflow: 'visible'}}>
      {/* bayangan lembut di lantai */}
      <ellipse cx={0} cy={118} rx={52} ry={8} fill={color.navyInk} opacity={0.1} />
      {/* kaki */}
      <rect x={-34} y={84} width={22} height={28} rx={11} fill={color.navy} />
      <rect x={12} y={84} width={22} height={28} rx={11} fill={color.navy} />
      {/* tangan melambai (kanan) */}
      {wave > 0 ? (
        <g transform={`rotate(${-30 - Math.sin(wave * Math.PI * 4) * 22} 66 10)`} opacity={Math.min(1, wave * 4)}>
          <rect x={60} y={-34} width={16} height={46} rx={8} fill={color.navy} />
        </g>
      ) : null}
      <g transform={`rotate(${spin})`}>
        <path d={GEAR} fill={color.navy} />
      </g>
      <circle r={44} fill={color.navy} />
      {/* wajah */}
      <g>
        <ellipse cx={-17} cy={-4} rx={11} ry={eyeRy} fill={color.surface} />
        <ellipse cx={17} cy={-4} rx={11} ry={eyeRy} fill={color.surface} />
        {!blink ? (
          <>
            <circle cx={-17 + px} cy={-2 + py} r={5.5} fill={color.navyInk} />
            <circle cx={17 + px} cy={-2 + py} r={5.5} fill={color.navyInk} />
          </>
        ) : null}
        {lid > 0 && !blink ? (
          <>
            <rect x={-29} y={-18} width={24} height={lid + 1} fill={color.navy} />
            <rect x={5} y={-18} width={24} height={lid + 1} fill={color.navy} />
          </>
        ) : null}
        <path d={mouth} fill={mood === 'kaget' ? color.surface : 'none'} stroke={color.surface} strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* keringat */}
      {sweat > 0 ? (
        <g opacity={sweat}>
          <path d="M58,-58 q7,11 0,17 q-7,-6 0,-17z" fill={color.blue1} />
          <path d="M74,-34 q5,8 0,12 q-5,-4 0,-12z" fill={color.blue1} />
        </g>
      ) : null}
    </svg>
  );
};
