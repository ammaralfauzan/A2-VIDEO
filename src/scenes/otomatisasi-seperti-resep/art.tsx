import React from 'react';
import {color} from '../../theme';

// Ilustrasi garis tipis gaya dapur (stroke 2-5 px, bulat). Warna dari token A2 saja.
export const INK = color.navy;
const sw = 5;

// Goresan yang "digambar": progress 0..1 lewat pathLength.
export const Stroke: React.FC<{d?: string; p: number; stroke?: string; w?: number; fill?: string; children?: React.ReactNode; tag?: 'path' | 'ellipse' | 'rect' | 'circle'; extra?: Record<string, number | string>}> = ({
  d,
  p,
  stroke = INK,
  w = sw,
  fill = 'none',
  tag = 'path',
  extra = {},
}) => {
  const common = {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - Math.min(1, Math.max(0, p)),
    stroke,
    strokeWidth: w,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill,
    opacity: p <= 0 ? 0 : 1,
  };
  if (tag === 'ellipse') return <ellipse {...common} {...(extra as object)} />;
  if (tag === 'rect') return <rect {...common} {...(extra as object)} />;
  if (tag === 'circle') return <circle {...common} {...(extra as object)} />;
  return <path d={d} {...common} />;
};

const seg = (f: number, a: number, b: number) => Math.min(1, Math.max(0, (f - a) / (b - a)));

// Panci di atas kompor, 400x320. t = frame sejak mulai digambar; boil 0..1 = gelembung; flame = api.
export const Pot: React.FC<{t: number; boil?: number; clock: number; style?: React.CSSProperties; width?: number}> = ({t, boil = 0, clock, style, width = 420}) => {
  const h = (width * 320) / 400;
  const bubbles = [
    {x: 130, y: 150, r: 11, ph: 0},
    {x: 205, y: 165, r: 15, ph: 9},
    {x: 270, y: 148, r: 10, ph: 17},
    {x: 165, y: 130, r: 8, ph: 24},
    {x: 240, y: 132, r: 9, ph: 31},
  ];
  return (
    <svg width={width} height={h} viewBox="0 0 400 320" style={{overflow: 'visible', ...style}}>
      <Stroke p={seg(t, 14, 34)} d="M40 276 H360" />
      <Stroke p={seg(t, 0, 20)} tag="ellipse" extra={{cx: 200, cy: 112, rx: 140, ry: 28}} />
      <Stroke p={seg(t, 4, 26)} d="M60 112 V232 Q60 256 84 256 H316 Q340 256 340 232 V112" />
      <Stroke p={seg(t, 16, 28)} d="M60 136 H34 Q24 136 24 148 V156 Q24 168 34 168 H60" />
      <Stroke p={seg(t, 18, 30)} d="M340 136 H366 Q376 136 376 148 V156 Q376 168 366 168 H340" />
      <Stroke p={seg(t, 22, 34)} stroke={color.blue1} d="M150 300 Q158 288 166 300 Q170 308 158 310 Q146 308 150 300 Z M242 300 Q250 288 258 300 Q262 308 250 310 Q238 308 242 300 Z" />
      {[0, 1, 2].map((i) => {
        const x = 150 + i * 50;
        const rise = ((clock + i * 14) % 56) / 56;
        const op = seg(t, 24, 40) * Math.sin(rise * Math.PI);
        return (
          <path
            key={i}
            d={`M${x} 84 q-14 -14 0 -28 t0 -28`}
            transform={`translate(0 ${-rise * 34})`}
            fill="none"
            stroke={color.muted}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={op * 0.7}
          />
        );
      })}
      {bubbles.map((b, i) => {
        const u = ((clock + b.ph) % 40) / 40;
        const o = boil * Math.sin(u * Math.PI);
        return <circle key={i} cx={b.x} cy={b.y - u * 16} r={b.r * (0.7 + 0.3 * u)} fill="none" stroke={color.blue2} strokeWidth={3.5} opacity={o} />;
      })}
    </svg>
  );
};

// Kartu resep dengan tiga baris garis, 280x340.
export const RecipeCard: React.FC<{t: number; marks: number[]; style?: React.CSSProperties}> = ({t, marks, style}) => (
  <svg width={280} height={340} viewBox="0 0 280 340" style={{overflow: 'visible', ...style}}>
    <rect x={4} y={4} width={272} height={332} rx={16} fill={color.surface} stroke={color.line} strokeWidth={3} />
    <Stroke p={seg(t, 0, 14)} d="M32 56 H150" w={5} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <Stroke p={seg(t, 8 + i * 6, 22 + i * 6)} d={`M32 ${130 + i * 70} H248`} stroke={color.line} w={5} />
        <circle cx={44} cy={118 + i * 70} r={11} fill="none" stroke={color.navy} strokeWidth={3.5} opacity={seg(t, 14 + i * 6, 20 + i * 6)} />
        {marks[i] > 0 ? <circle cx={44} cy={118 + i * 70} r={11 * marks[i]} fill={color.blue1} opacity={0.9} /> : null}
      </g>
    ))}
  </svg>
);

// Ikon kecil 120x120 untuk bahan dan langkah.
export const IconNoodle: React.FC<{p: number; size?: number}> = ({p, size = 140}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <Stroke p={p} tag="rect" extra={{x: 14, y: 24, width: 92, height: 72, rx: 16}} />
    {[0, 1, 2, 3].map((i) => (
      <Stroke key={i} p={seg(p, 0.3, 1)} d={`M26 ${40 + i * 14} q10 -10 20 0 t20 0 t20 0`} w={3.5} stroke={color.blue2} />
    ))}
  </svg>
);
export const IconSachet: React.FC<{p: number; size?: number}> = ({p, size = 140}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <Stroke p={p} d="M34 18 L40 12 L46 18 L52 12 L58 18 L64 12 L70 18 L76 12 L82 18 V104 H34 Z" />
    <Stroke p={seg(p, 0.4, 1)} d="M46 56 H70 M46 72 H62" w={3.5} stroke={color.blue2} />
  </svg>
);
export const IconWater: React.FC<{p: number; size?: number}> = ({p, size = 140}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <Stroke p={p} d="M30 22 L38 104 H82 L90 22 Z" />
    <Stroke p={seg(p, 0.4, 1)} d="M33 56 q9 -8 18 0 t18 0 t17 0" w={3.5} stroke={color.blue1} />
  </svg>
);
export const IconBowl: React.FC<{p: number; size?: number}> = ({p, size = 360}) => (
  <svg width={size} height={(size * 110) / 360} viewBox="0 0 360 110" style={{overflow: 'visible'}}>
    <Stroke p={p} d="M20 20 H340 Q336 90 180 96 Q24 90 20 20 Z" />
    <Stroke p={seg(p, 0.3, 1)} d="M120 104 H240" />
  </svg>
);

// Tiga langkah: mi masuk panci, jam pasir, tuang bumbu.
export const StepMi: React.FC<{p: number; size?: number}> = ({p, size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <Stroke p={p} d="M14 62 H106 V92 Q106 104 94 104 H26 Q14 104 14 92 Z" />
    <Stroke p={seg(p, 0.3, 1)} d="M44 18 V50 M32 40 L44 52 L56 40" stroke={color.blue2} />
    <Stroke p={seg(p, 0.5, 1)} d="M66 26 q10 -8 20 0 t14 0" w={3.5} stroke={color.blue2} />
  </svg>
);
export const StepWait: React.FC<{p: number; size?: number}> = ({p, size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <Stroke p={p} d="M34 14 H86 M34 106 H86 M40 14 Q40 52 60 60 Q80 52 80 14 M40 106 Q40 68 60 60 Q80 68 80 106" />
    <Stroke p={seg(p, 0.5, 1)} d="M50 98 H70 M60 64 V84" w={3.5} stroke={color.blue2} />
  </svg>
);
export const StepPour: React.FC<{p: number; size?: number}> = ({p, size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <Stroke p={p} d="M24 24 L60 12 L84 54 L48 66 Z" />
    <Stroke p={seg(p, 0.5, 1)} d="M66 70 V74 M76 78 V82 M58 84 V88 M70 92 V96 M82 90 V94" w={5} stroke={color.blue2} />
  </svg>
);

// Ikon isi simpul (60x60): petir, kartu data, tiga langkah.
export const NodeBolt: React.FC<{color?: string}> = ({color: c = color.navy}) => (
  <svg width={64} height={64} viewBox="0 0 64 64"><path d="M36 6 L16 36 H30 L26 58 L48 26 H34 Z" fill="none" stroke={c} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" /></svg>
);
export const NodeData: React.FC<{color?: string}> = ({color: c = color.navy}) => (
  <svg width={64} height={64} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <rect x={8} y={10} width={48} height={12} rx={4} /><rect x={8} y={26} width={48} height={12} rx={4} /><rect x={8} y={42} width={48} height={12} rx={4} />
  </svg>
);
export const NodeSteps: React.FC<{color?: string}> = ({color: c = color.navy}) => (
  <svg width={64} height={64} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={32} r={7} /><circle cx={32} cy={32} r={7} /><circle cx={52} cy={32} r={7} />
    <path d="M19 32 H25 M39 32 H45" />
  </svg>
);
