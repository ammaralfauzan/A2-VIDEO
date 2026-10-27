import React from 'react';
import {color} from '../theme';

// Maskot "Gigi": gear yang sama dengan gear di logo A2 (8 gigi persegi bersudut tumpul,
// cincin navy tebal, lubang putih di tengah). Lubang putih itu jadi "layar wajah";
// ekspresi hanya lewat mata, mengikuti referensi mata dari Bos. Tanpa kaki, melayang.

export type Mood = 'biasa' | 'senang' | 'puas' | 'kaget' | 'cemas' | 'lelah' | 'mikir' | 'kedip';

type Props = {
  size?: number; // lebar gear
  mood?: Mood;
  look?: {x: number; y: number}; // arah lirikan, -1..1
  spin?: number; // derajat putaran cincin gear (wajah tetap tegak)
  blink?: boolean;
  eyeOpen?: number; // 0..1, kelopak: 1 terbuka, 0 terpejam (untuk kedip dan ganti ekspresi)
  sweat?: number; // 0..1, kemunculan tetes keringat
  sweatPhase?: number; // 0..1, posisi tetes saat menetes turun
  tilt?: number; // derajat kemiringan seluruh badan
  squash?: {x: number; y: number}; // regang/pipih badan (1 = normal)
};

// Proporsi diukur dari gear di file logo: ujung gigi 70, badan 58, lubang 39, lebar gigi ±20°.
const R_TOOTH = 70;
const R_BODY = 58;
const R_HOLE = 39;
const TOOTH_W = 2 * R_TOOTH * Math.sin((10 * Math.PI) / 180);

const Eyes: React.FC<{mood: Mood; blink: boolean; look: {x: number; y: number}; open: number}> = ({mood, blink, look, open}) => {
  const dx = look.x * 3;
  const dy = look.y * 3;
  const ink = color.navy;
  const line = {fill: 'none', stroke: ink, strokeWidth: 5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  if (blink && mood !== 'kedip') {
    return (
      <g transform={`translate(${dx} ${dy + 4}) scale(1.3)`}>
        <path d="M-19,0 L-7,0 M7,0 L19,0" {...line} />
      </g>
    );
  }
  const shapes: Record<Mood, React.ReactNode> = {
    // ■ ■
    biasa: (
      <>
        <rect x={-19} y={-7} width={11} height={13} rx={3.5} fill={ink} />
        <rect x={8} y={-7} width={11} height={13} rx={3.5} fill={ink} />
      </>
    ),
    // ^ ^
    senang: <path d="M-20,3 Q-13.5,-9 -7,3 M7,3 Q13.5,-9 20,3" {...line} />,
    // ‿ ‿
    puas: <path d="M-20,-1 Q-13.5,8 -7,-1 M7,-1 Q13.5,8 20,-1" {...line} />,
    // | |  (membesar)
    kaget: (
      <>
        <rect x={-16} y={-11} width={6} height={20} rx={3} fill={ink} />
        <rect x={10} y={-11} width={6} height={20} rx={3} fill={ink} />
      </>
    ),
    // alis naik + mata batang
    cemas: (
      <>
        <path d="M-21,-14 Q-14,-19 -7,-14 M7,-14 Q14,-19 21,-14" {...line} strokeWidth={3.5} />
        <rect x={-16} y={-7} width={5.5} height={15} rx={2.75} fill={ink} />
        <rect x={10.5} y={-7} width={5.5} height={15} rx={2.75} fill={ink} />
      </>
    ),
    // > <
    lelah: <path d="M-19,-8 L-8,-1 L-19,6 M19,-8 L8,-1 L19,6" {...line} />,
    // melirik ke atas, satu alis naik
    mikir: (
      <>
        <rect x={-16} y={-10} width={10} height={11} rx={3.5} fill={ink} />
        <rect x={9} y={-10} width={10} height={11} rx={3.5} fill={ink} />
        <path d="M7,-17 L21,-21" {...line} strokeWidth={4} />
      </>
    ),
    // ▬ ■  (kedip)
    kedip: (
      <>
        <path d="M-20,1 L-7,-1" {...line} />
        <rect x={8} y={-7} width={11} height={13} rx={3.5} fill={ink} />
      </>
    ),
  };
  // Mata dibesarkan dan sedikit diturunkan dari tengah agar lebih imut; kelopak menutup ke garis tengah mata.
  const o = Math.max(0.08, open);
  return <g transform={`translate(${dx} ${dy + 4}) scale(1.3 ${1.3 * o})`}>{shapes[mood]}</g>;
};

export const Gigi: React.FC<Props> = ({
  size = 200,
  mood = 'biasa',
  look = {x: 0, y: 0},
  spin = 0,
  blink = false,
  eyeOpen = 1,
  sweat = 0,
  sweatPhase = 0,
  tilt = 0,
  squash = {x: 1, y: 1},
}) => {
  // Satu tetes keringat besar yang menetes turun lalu memudar (minimalis).
  const dropY = -58 + sweatPhase * 16;
  const dropO = sweat * Math.min(1, (1 - sweatPhase) * 3) * Math.min(1, sweatPhase * 6 + 0.2);
  return (
    <svg width={size} height={size * 1.18} viewBox="-80 -80 160 189" style={{overflow: 'visible'}}>
      {/* bayangan lembut di lantai: mengecil saat Gigi terangkat */}
      <ellipse cx={0} cy={100} rx={42 * squash.x} ry={6} fill={color.navyInk} opacity={0.1} />
      <g transform={`translate(0 ${70 * (1 - squash.y)}) rotate(${tilt}) scale(${squash.x} ${squash.y})`}>
        <g transform={`rotate(${spin})`}>
          {Array.from({length: 8}, (_, i) => (
            <rect
              key={i}
              x={-TOOTH_W / 2}
              y={-R_TOOTH}
              width={TOOTH_W}
              height={R_TOOTH - R_BODY + 8}
              rx={3}
              fill={color.navy}
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r={R_BODY} fill={color.navy} />
        </g>
        <circle r={R_HOLE} fill={color.surface} />
        <Eyes mood={mood} blink={blink} look={look} open={eyeOpen} />
        {sweat > 0 ? (
          <path
            d={`M60,${dropY} c0,0 9,12 9,18 a9,9 0 0,1 -18,0 c0,-6 9,-18 9,-18z`}
            fill={color.blue1}
            opacity={dropO}
          />
        ) : null}
      </g>
    </svg>
  );
};
