import React from 'react';
import {interpolate} from 'remotion';
import {clamp, ease, sp} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-alasan-saya-bikin-a2';
import {color, radius, shadow} from '../../theme';
import {P, STAGE} from './layout';

// Ilustrasi animasi cerita di panggung atas: gambar datar dari token warna A2, satu adegan per bagian
// cerita, berganti dengan pudar (adegan lama habis dulu, baru yang baru masuk).
// Revisi 2 (Bos): lebih dramatis dan estetik. Cahaya & suasana dibangun dari lapisan token beropasitas
// (hujan, lampu jalan, kerucut cahaya lampu meja, makanan mendingin, cahaya senja), tokoh punya wajah
// yang ikut merasakan, kamera mendorong pelan, bohlam dan lampu digambar lebih detail.
//  A malam hujan, toko menyala; pemilik usaha pulang larut, lampu toko padam
//  B kamar kerja gelap: pesanan ramai, mengetik ulang hal yang sama, lalu tenaga habis
//  D ruang makan malam: keluarga menunggu, kursi kosong, makanan mendingin, bohlam "berpikir" padam
//  E pekerjaan berulang dikerjakan mesin
//  F orangnya fokus ke pelanggan
//  G senja: pemilik pulang, duduk bersama keluarga (kebersamaan keluarga)

const W = STAGE.w;
const H = STAGE.h;
const FLOOR = 300;

const SC = {
  A: () => [P.stageIn(), sf(S.ketik) - 6] as const,
  B: () => [sf(S.ketik) - 6, sf(S.waktu) - 4] as const,
  D: () => [sf(S.waktu) - 4, sf(S.pikir) - 4] as const,
  E: () => [sf(S.pikir) - 4, sf(S.manusia) - 4] as const,
  F: () => [sf(S.manusia) - 4, sf(S.bukan) - 4] as const,
  G: () => [sf(S.bukan) - 4, P.stageOut() + 12] as const, // pudar bersama kartu panggung
};

const lin = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});
const pop = (f: number, at: number) => sp(f, at, 14);
const popStyle = (p: number, ox: number, oy: number) => ({
  opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
  transform: `translate(${ox}px, ${oy}px) scale(${0.85 + 0.15 * p}) translate(${-ox}px, ${-oy}px)`,
});
// Angka acak tetap (deterministik) untuk hujan, bintang, dll.
const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
// Kamera mendorong pelan ke satu titik.
const Push: React.FC<{k: number; cx: number; cy: number; children: React.ReactNode}> = ({k, cx, cy, children}) => (
  <g transform={`translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`}>{children}</g>
);

// ---------- Tokoh ----------

type Face = 'netral' | 'senang' | 'sedih' | 'lelah' | 'pejam';
type PersonProps = {
  x: number;
  y: number; // dasar kaki
  s?: number;
  body: string;
  face?: Face;
  hair?: 'pendek' | 'panjang' | 'anak';
  look?: number; // -1..1 kepala menoleh (wajah bergeser)
  walk?: number;
  slump?: number;
  handR?: {x: number; y: number};
  handL?: {x: number; y: number};
  bag?: boolean;
  hop?: number;
  legs?: string;
};

const FaceMarks: React.FC<{face: Face; cx: number; cy: number}> = ({face, cx, cy}) => {
  const ink = color.navy;
  const st = {stroke: ink, strokeWidth: 2.4, fill: 'none', strokeLinecap: 'round' as const};
  const ex = 6.5;
  const ey = cy + 1;
  switch (face) {
    case 'senang':
      return (
        <>
          <path d={`M${cx - ex - 3},${ey + 1} q3,-4 6,0 M${cx + ex - 3},${ey + 1} q3,-4 6,0`} {...st} />
          <path d={`M${cx - 4},${cy + 8} q4,4 8,0`} {...st} />
        </>
      );
    case 'sedih':
      return (
        <>
          <path d={`M${cx - ex - 4},${cy - 5} l6,-2 M${cx + ex + 4},${cy - 5} l-6,-2`} {...st} strokeWidth={2} />
          <circle cx={cx - ex} cy={ey} r={2.2} fill={ink} />
          <circle cx={cx + ex} cy={ey} r={2.2} fill={ink} />
          <path d={`M${cx - 4},${cy + 10} q4,-3 8,0`} {...st} strokeWidth={2} />
        </>
      );
    case 'lelah':
      return (
        <>
          <path d={`M${cx - ex - 3},${ey} h6 M${cx + ex - 3},${ey} h6`} {...st} />
          <path d={`M${cx - 3},${cy + 9} h6`} {...st} strokeWidth={2} />
        </>
      );
    case 'pejam':
      return (
        <>
          <path d={`M${cx - ex - 3},${ey - 1} q3,3 6,0 M${cx + ex - 3},${ey - 1} q3,3 6,0`} {...st} />
          <path d={`M${cx - 4},${cy + 8} q4,4 8,0`} {...st} />
        </>
      );
    default:
      return (
        <>
          <circle cx={cx - ex} cy={ey} r={2.4} fill={ink} />
          <circle cx={cx + ex} cy={ey} r={2.4} fill={ink} />
          <path d={`M${cx - 3},${cy + 9} h6`} {...st} strokeWidth={2} />
        </>
      );
  }
};

const Person: React.FC<PersonProps> = ({
  x,
  y,
  s = 1,
  body,
  face = 'netral',
  hair = 'pendek',
  look = 0,
  walk,
  slump = 0,
  handR,
  handL,
  bag,
  hop = 0,
  legs = color.navy,
}) => {
  const sw = walk !== undefined ? Math.sin(walk) : 0;
  const legA = sw * 20;
  const leg = (deg: number, dx: number) => {
    const r = (deg * Math.PI) / 180;
    const fx = dx + Math.sin(r) * 54;
    const fy = -56 + Math.cos(r) * 54;
    return (
      <g>
        <line x1={dx} y1={-56} x2={fx} y2={fy} stroke={legs} strokeWidth={12} strokeLinecap="round" />
        <ellipse cx={fx + 4} cy={fy + 2} rx={9} ry={5} fill={color.navyInk} />
      </g>
    );
  };
  const top = -124 + slump * 20;
  const hx = slump * 4 + look * 3;
  const hy = -146 + slump * 44 + Math.abs(sw) * -2;
  const shoulderY = top + 14;
  const hr = handR ?? {x: 26 + sw * 8, y: -66};
  const hl = handL ?? {x: -26 - sw * 8, y: -66};
  const torsoH = -56 - top + 8;
  return (
    <g transform={`translate(${x} ${y - hop}) scale(${s})`}>
      {leg(legA, -9)}
      {leg(-legA, 9)}
      <line x1={-16} y1={shoulderY} x2={hl.x} y2={hl.y} stroke={body} strokeWidth={11} strokeLinecap="round" />
      <rect x={-23} y={top} width={46} height={torsoH} rx={20} fill={body} />
      {/* bayangan sisi badan dan kerah */}
      <rect x={4} y={top} width={19} height={torsoH} rx={12} fill={color.navyInk} opacity={0.14} />
      <path d={`M-9,${top + 2} L0,${top + 12} L9,${top + 2}`} stroke={color.surface} strokeWidth={3} fill="none" opacity={0.7} strokeLinejoin="round" />
      <line x1={16} y1={shoulderY} x2={hr.x} y2={hr.y} stroke={body} strokeWidth={11} strokeLinecap="round" />
      <circle cx={hr.x} cy={hr.y} r={5.5} fill={color.line} />
      <circle cx={hl.x} cy={hl.y} r={5.5} fill={color.line} />
      {bag ? <rect x={hr.x - 10} y={hr.y + 2} width={22} height={26} rx={5} fill={color.navyInk} stroke={color.muted} strokeWidth={2} /> : null}
      <rect x={-6 + hx * 0.5} y={hy + 14} width={12} height={10} fill={color.line} />
      <circle cx={hx} cy={hy} r={19} fill={color.line} />
      {/* rambut */}
      {hair === 'panjang' ? <path d={`M${hx - 20},${hy + 14} C${hx - 24},${hy - 24} ${hx + 24},${hy - 24} ${hx + 20},${hy + 14} L${hx + 14},${hy - 4} Q${hx},${hy - 12} ${hx - 14},${hy - 4} Z`} fill={color.navy} /> : null}
      <path d={`M${hx - 19},${hy - 2} C${hx - 20},${hy - 26} ${hx + 20},${hy - 26} ${hx + 19},${hy - 2} Q${hx + 6},${hy - 12} ${hx - 19},${hy - 2} Z`} fill={color.navy} />
      {hair === 'anak' ? <circle cx={hx + 2} cy={hy - 22} r={5} fill={color.navy} /> : null}
      <FaceMarks face={face} cx={hx + look * 6} cy={hy} />
    </g>
  );
};

// ---------- Benda ----------

const Moon: React.FC<{x: number; y: number; r: number; sky: string}> = ({x, y, r, sky}) => (
  <g>
    <circle cx={x} cy={y} r={r * 1.9} fill={color.surface} opacity={0.06} />
    <circle cx={x} cy={y} r={r} fill={color.surface} />
    <circle cx={x + r * 0.45} cy={y - r * 0.3} r={r * 0.85} fill={sky} />
  </g>
);

const Stars: React.FC<{f: number; pts: [number, number][]}> = ({f, pts}) => (
  <>
    {pts.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={2.4} fill={color.surface} opacity={0.35 + 0.45 * Math.sin(f / 9 + i * 1.7)} />
    ))}
  </>
);

// Hujan: garis miring tipis yang jatuh terus.
const Rain: React.FC<{f: number; n: number; x0: number; x1: number; y0: number; y1: number; op?: number}> = ({f, n, x0, x1, y0, y1, op = 0.32}) => (
  <g opacity={op}>
    {Array.from({length: n}, (_, i) => {
      const span = y1 - y0 + 40;
      const y = y0 - 20 + ((rnd(i) * span + f * (13 + rnd(i + 9) * 5)) % span);
      const x = x0 + rnd(i + 3) * (x1 - x0) - (y - y0) * 0.18;
      return <line key={i} x1={x} y1={y} x2={x - 3} y2={y + 14} stroke={color.surface} strokeWidth={2} strokeLinecap="round" />;
    })}
  </g>
);

// Jendela rumah; malam (bulan, hujan) atau senja (matahari terbenam).
const HomeWindow: React.FC<{f: number; x: number; y: number; night: boolean; rain?: boolean; id: string}> = ({f, x, y, night, rain, id}) => {
  const w = 140;
  const h = 100;
  const sky = night ? color.navyInk : color.blue1;
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h} rx={10} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y} width={w} height={h} fill={sky} />
        {night ? (
          <>
            <Moon x={x + 100} y={y + 34} r={15} sky={sky} />
            <Stars f={f} pts={[[x + 26, y + 22], [x + 52, y + 54], [x + 120, y + 80]]} />
            {rain ? <Rain f={f} n={14} x0={x} x1={x + w + 20} y0={y} y1={y + h} op={0.4} /> : null}
          </>
        ) : (
          <>
            <circle cx={x + 70} cy={y + 92} r={44} fill={color.surface} opacity={0.25} />
            <circle cx={x + 70} cy={y + 92} r={26} fill={color.surface} opacity={0.95} />
            <rect x={x} y={y + 80} width={w} height={20} fill={color.blue2} opacity={0.35} />
          </>
        )}
      </g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={color.navy} strokeWidth={6} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={color.navy} strokeWidth={5} />
      <rect x={x - 8} y={y + h - 2} width={w + 16} height={8} rx={3} fill={color.navy} />
    </g>
  );
};

const Clock: React.FC<{x: number; y: number; r: number; min: number; hour: number; dark?: boolean}> = ({x, y, r, min, hour, dark}) => {
  const face = dark ? color.navyInk : color.surface;
  const ink = dark ? color.line : color.navy;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={face} stroke={ink} strokeWidth={5} />
      {Array.from({length: 12}, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r0 = i % 3 === 0 ? r - 12 : r - 9;
        return <line key={i} x1={x + Math.sin(a) * r0} y1={y - Math.cos(a) * r0} x2={x + Math.sin(a) * (r - 6)} y2={y - Math.cos(a) * (r - 6)} stroke={ink} strokeWidth={i % 3 === 0 ? 3 : 1.6} strokeLinecap="round" />;
      })}
      <line x1={x} y1={y} x2={x + Math.sin((hour * Math.PI) / 180) * r * 0.45} y2={y - Math.cos((hour * Math.PI) / 180) * r * 0.45} stroke={ink} strokeWidth={4.5} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + Math.sin((min * Math.PI) / 180) * r * 0.72} y2={y - Math.cos((min * Math.PI) / 180) * r * 0.72} stroke={color.blue1} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={x} cy={y} r={3.5} fill={ink} />
    </g>
  );
};

// Bohlam detail: kaca, filamen, ulir; menyala (sinar + pendar) atau padam.
const Bulb: React.FC<{x: number; y: number; s?: number; on: number}> = ({x, y, s = 1, on}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-8} r={40} fill={color.blue1} opacity={0.16 * on} />
    {Array.from({length: 8}, (_, i) => {
      const a = ((i * 45 - 90) * Math.PI) / 180;
      return <line key={i} x1={Math.cos(a) * 28} y1={-8 + Math.sin(a) * 28} x2={Math.cos(a) * 36} y2={-8 + Math.sin(a) * 36} stroke={color.blue1} strokeWidth={3} strokeLinecap="round" opacity={on} />;
    })}
    <path d="M-8,12 C-8,5 -18,1 -18,-9 A18,18 0 1 1 18,-9 C18,1 8,5 8,12 Z" fill={on > 0.5 ? color.surface : color.line} stroke={color.navy} strokeWidth={3} />
    <path d="M-7,-14 A10,10 0 0 1 2,-22" stroke={color.surface} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9} />
    <path d="M-4,11 L-4,2 L-2,-5 L1,1 L3,-5 L4,2 L4,11" stroke={on > 0.5 ? color.blue2 : color.muted} strokeWidth={2} fill="none" strokeLinejoin="round" />
    <rect x={-9} y={12} width={18} height={5} rx={2} fill={color.navy} />
    <rect x={-8} y={18} width={16} height={4} rx={2} fill={color.navy} />
    <rect x={-7} y={23} width={14} height={4} rx={2} fill={color.navy} />
    <path d="M-4,28 h8 l-2,4 h-4 z" fill={color.navy} />
  </g>
);

// Lampu meja detail: alas, lengan dua ruas dengan sendi, kap, bohlam berpendar, kerucut cahaya.
const DeskLamp: React.FC<{on: number}> = ({on}) => (
  <g>
    <polygon points="150,170 198,170 318,236 96,236" fill={color.surface} opacity={0.07 * on} />
    <polygon points="158,170 192,170 268,236 122,236" fill={color.surface} opacity={0.1 * on} />
    <ellipse cx={196} cy={235} rx={120} ry={9} fill={color.surface} opacity={0.22 * on} />
    <ellipse cx={120} cy={232} rx={26} ry={6} fill={color.line} />
    <line x1={120} y1={228} x2={104} y2={188} stroke={color.line} strokeWidth={6} strokeLinecap="round" />
    <line x1={104} y1={188} x2={160} y2={152} stroke={color.line} strokeWidth={6} strokeLinecap="round" />
    <line x1={110} y1={206} x2={128} y2={172} stroke={color.muted} strokeWidth={2} strokeDasharray="3 3" />
    <circle cx={104} cy={188} r={6} fill={color.muted} />
    <circle cx={160} cy={152} r={5} fill={color.muted} />
    <path d="M150,144 L172,140 L200,168 L148,172 Z" fill={color.blue2} />
    <path d="M150,144 L172,140 L178,146 L154,150 Z" fill={color.surface} opacity={0.25} />
    <circle cx={174} cy={170} r={9} fill={color.surface} opacity={on} />
    <circle cx={174} cy={170} r={16} fill={color.surface} opacity={0.25 * on} />
  </g>
);

const Cog: React.FC<{x: number; y: number; r: number; a: number; fill: string; hole: string}> = ({x, y, r, a, fill, hole}) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    {Array.from({length: 8}, (_, i) => (
      <rect key={i} x={-r * 0.16} y={-r} width={r * 0.32} height={r * 0.4} rx={2} fill={fill} transform={`rotate(${i * 45})`} />
    ))}
    <circle r={r * 0.78} fill={fill} />
    <circle r={r * 0.36} fill={hole} />
  </g>
);

const RowCard: React.FC<{x: number; y: number; w?: number; done?: boolean}> = ({x, y, w = 58, done}) => (
  <g>
    <rect x={x} y={y} width={w} height={42} rx={8} fill={color.surface} stroke={done ? color.success : color.line} strokeWidth={3} />
    <rect x={x + 9} y={y + 11} width={w * 0.55} height={6} rx={3} fill={color.muted} />
    <rect x={x + 9} y={y + 24} width={w * 0.4} height={6} rx={3} fill={color.muted} />
    {done ? (
      <g>
        <circle cx={x + w - 4} cy={y + 4} r={11} fill={color.success} />
        <path d={`M${x + w - 9},${y + 4} l4,4 l7,-8`} stroke={color.surface} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ) : null}
  </g>
);

const Bubble: React.FC<{x: number; y: number; w: number; tailRight?: boolean; children?: React.ReactNode}> = ({x, y, w, tailRight, children}) => (
  <g>
    <rect x={x} y={y} width={w} height={48} rx={16} fill={color.surface} stroke={color.line} strokeWidth={3} />
    <path d={tailRight ? `M${x + w - 34},${y + 46} l12,14 l4,-14` : `M${x + 22},${y + 46} l-4,14 l12,-14`} fill={color.surface} stroke={color.line} strokeWidth={3} strokeLinejoin="round" />
    <rect x={x + 3} y={y + 40} width={w - 6} height={6} fill={color.surface} />
    {children}
  </g>
);

const Dots: React.FC<{x: number; y: number; f: number}> = ({x, y, f}) => (
  <>
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={x + i * 16} cy={y - Math.max(0, Math.sin(f / 4 - i * 0.9)) * 4} r={5} fill={color.blue2} />
    ))}
  </>
);

const Heart: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0,10 C-14,-2 -22,-12 -14,-20 C-8,-26 -2,-22 0,-16 C2,-22 8,-26 14,-20 C22,-12 14,-2 0,10 Z" fill={color.alert} />
);

const Sparkle: React.FC<{x: number; y: number; s: number; fill: string}> = ({x, y, s, fill}) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0,-10 Q1.5,-1.5 10,0 Q1.5,1.5 0,10 Q-1.5,1.5 -10,0 Q-1.5,-1.5 0,-10 Z" fill={fill} />
);

const Table: React.FC<{x: number; w: number; top?: string; panel?: string}> = ({x, w, top = color.navy, panel = color.line}) => (
  <g>
    <rect x={x} y={232} width={w} height={H - 232} fill={panel} />
    <rect x={x - 8} y={226} width={w + 16} height={14} rx={5} fill={top} />
  </g>
);

// Mangkuk makanan dengan uap; `warm` 1 = hangat (uap naik), 0 = sudah dingin.
const Bowl: React.FC<{x: number; f: number; warm: number}> = ({x, f, warm}) => (
  <g>
    {[0, 1, 2].map((i) => {
      const ph = ((f * 0.9 + i * 14) % 42) / 42;
      return (
        <path
          key={i}
          d={`M${x - 8 + i * 8},${212 - ph * 10} q4,-3 0,-6 q-4,-3 0,-6`}
          stroke={color.muted}
          strokeWidth={2.4}
          fill="none"
          strokeLinecap="round"
          opacity={warm * Math.sin(ph * Math.PI) * 0.7}
        />
      );
    })}
    <path d={`M${x - 22},${216} q22,22 44,0 z`} fill={color.surface} stroke={color.muted} strokeWidth={3} strokeLinejoin="round" />
    <ellipse cx={x} cy={216} rx={22} ry={4} fill={color.blue1} opacity={0.35} />
  </g>
);

const Chair: React.FC<{x: number; hi: number}> = ({x, hi}) => (
  <g>
    {hi > 0 ? <rect x={x - 34} y={136} width={68} height={100} rx={14} fill={color.blue1} opacity={0.12 * hi} /> : null}
    <rect x={x - 26} y={146} width={52} height={88} rx={10} fill="none" stroke={hi > 0.1 ? color.blue2 : color.muted} strokeWidth={6} />
    <line x1={x - 26} y1={176} x2={x + 26} y2={176} stroke={hi > 0.1 ? color.blue2 : color.muted} strokeWidth={4} />
  </g>
);

const Floor: React.FC<{fill?: string; op?: number}> = ({fill = color.line, op = 0.6}) => <rect x={0} y={FLOOR} width={W} height={H - FLOOR} fill={fill} opacity={op} />;

// ---------- Adegan ----------

// A. Malam hujan. Toko masih menyala; pemilik usaha keluar, berjalan lesu di bawah lampu jalan, lampu toko padam.
const SceneA: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const moonY = interpolate(t, [0, 50], [104, 62], {...clamp, easing: ease});
  const walkU = lin(t, 14, 96);
  const flick = t > 60 && t < 70 ? (Math.sin(t * 3.1) > 0 ? 1 : 0.4) : 1;
  const lightOn = (1 - 0.9 * lin(t, 68, 74)) * flick;
  const px = 290 + walkU * 250;
  const k = 1 + 0.06 * lin(t, 0, 100);
  return (
    <Push k={k} cx={px} cy={200}>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={color.navy} />
      <Stars f={f} pts={[[60, 40], [150, 76], [420, 34], [500, 96], [690, 46], [250, 30]]} />
      <Moon x={620} y={moonY} r={26} sky={color.navy} />
      {/* kota jauh */}
      {[
        [380, 170, 60, 130],
        [450, 140, 46, 160],
        [505, 190, 70, 110],
        [590, 160, 52, 140],
        [-30, 180, 90, 120],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill={color.navyInk} opacity={0.55} />
          {Array.from({length: 4}, (_, j) => (
            <rect key={j} x={x + 10 + (j % 2) * 22} y={y + 16 + Math.floor(j / 2) * 26} width={8} height={10} fill={color.surface} opacity={rnd(i * 7 + j) > 0.5 ? 0.35 : 0.08} />
          ))}
        </g>
      ))}
      <rect x={-40} y={FLOOR} width={W + 80} height={H - FLOOR + 40} fill={color.navyInk} />
      {/* toko */}
      <rect x={70} y={136} width={280} height={164} fill={color.blue2} opacity={0.6} />
      <rect x={150} y={96} width={120} height={28} rx={7} fill={color.surface} opacity={0.35 + 0.55 * lightOn} />
      <rect x={166} y={106} width={56} height={8} rx={4} fill={color.navy} />
      {Array.from({length: 7}, (_, i) => (
        <path key={i} d={`M${60 + i * 43},128 h43 v30 q-21.5,10 -43,0 z`} fill={i % 2 ? color.surface : color.blue1} opacity={0.75 + 0.25 * lightOn} />
      ))}
      <rect x={96} y={186} width={118} height={78} rx={6} fill={color.surface} opacity={0.12 + 0.88 * lightOn} />
      {[0, 1].map((r) =>
        [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={108 + c * 25} y={196 + r * 32} width={16} height={20} rx={3} fill={[color.blue1, color.success, color.blue2, color.alert][(r + c) % 4]} opacity={0.75 * lightOn} />),
      )}
      <rect x={250} y={190} width={72} height={110} rx={4} fill={color.navyInk} />
      <rect x={258} y={198} width={56} height={102} fill={color.surface} opacity={0.32 * lightOn} />
      {/* cahaya toko di tanah basah */}
      <polygon points="96,300 214,300 250,340 70,340" fill={color.surface} opacity={0.1 * lightOn} />
      {/* lampu jalan */}
      <polygon points="640,92 664,92 720,300 584,300" fill={color.surface} opacity={0.08} />
      <ellipse cx={652} cy={302} rx={74} ry={9} fill={color.surface} opacity={0.14} />
      <rect x={648} y={86} width={8} height={214} fill={color.navyInk} />
      <path d="M630,92 h44 l-6,-14 h-32 z" fill={color.muted} />
      <ellipse cx={652} cy={93} rx={14} ry={4} fill={color.surface} />
      {/* pantulan di genangan */}
      <ellipse cx={420} cy={322} rx={60} ry={5} fill={color.surface} opacity={0.08} />
      {/* pemilik usaha pulang: lesu, wajah lelah, membawa tas */}
      <ellipse cx={px + 6} cy={FLOOR + 3} rx={30} ry={5} fill={color.navy} opacity={0.6} />
      <Person x={px} y={FLOOR} s={1.1} body={color.blue1} face="lelah" legs={color.muted} walk={walkU < 1 && walkU > 0 ? t * 0.3 : undefined} slump={0.4} bag />
      <Rain f={f} n={46} x0={0} x1={W + 60} y0={0} y1={H} />
    </Push>
  );
};

// B. Kamar kerja gelap, hanya lampu meja dan layar yang menyala.
const SceneB: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const bubbleOut = 1 - lin(f, wf(S.ketik, 3) - 8, wf(S.ketik, 3) - 2);
  const typeStart = wf(S.ketik, 4) - 2;
  const cardsOut = 1 - lin(f, sf(S.sadar) - 6, sf(S.sadar) + 2);
  const slump = lin(f, sf(S.sadar), sf(S.sadar) + 24);
  const typing = f >= typeStart && f < sf(S.sadar);
  const tap = typing ? Math.abs(Math.sin(f * 0.9)) * 6 : 0;
  const level = interpolate(f, [wf(S.sadar, 4), wf(S.sadar, 7) + 12], [0.85, 0.08], {...clamp, easing: ease});
  const batt = pop(f, sf(S.sadar) + 8);
  const low = level < 0.3 ? 0.5 + 0.5 * Math.sin(f / 3) : 1;
  // lampu meja berkedip lalu meredup saat tenaga habis
  const fl = f > wf(S.sadar, 6) && f < wf(S.sadar, 6) + 14 ? (Math.sin(f * 2.7) > 0 ? 1 : 0.35) : 1;
  const lamp = (1 - 0.45 * lin(f, wf(S.sadar, 7), wf(S.sadar, 7) + 20)) * fl;
  const k = 1 + 0.05 * lin(t, 0, 260);
  const bubbles = [
    {x: 470, y: 46},
    {x: 560, y: 116},
    {x: 470, y: 186},
  ];
  return (
    <g>
      <Push k={k} cx={280} cy={200}>
        <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={color.navy} />
        <HomeWindow f={f} x={250} y={26} night rain id="jendela-b" />
        <Clock x={190} y={64} r={28} min={270} hour={-10} dark />
        <Floor fill={color.navyInk} op={1} />
        <DeskLamp on={lamp} />
        {/* layar menerangi wajah */}
        <circle cx={330} cy={150} r={70} fill={color.blue1} opacity={0.1 * (1 - slump * 0.6)} />
        <Person
          x={280}
          y={FLOOR}
          body={color.blue1}
          face={slump > 0.5 ? 'pejam' : 'lelah'}
          slump={slump}
          look={0.4}
          handR={{x: 40, y: -86 + 6 * slump - (typing ? tap : 0)}}
          handL={{x: -30, y: -84 + 6 * slump - (typing ? 6 - tap : 0)}}
        />
        <rect x={316} y={160} width={112} height={68} rx={7} fill={color.muted} />
        <rect x={316} y={160} width={112} height={68} rx={7} fill="none" stroke={color.line} strokeWidth={2} opacity={0.5} />
        <circle cx={372} cy={194} r={7} fill={color.line} />
        {/* tumpukan kertas */}
        <rect x={214} y={210} width={48} height={8} rx={2} fill={color.line} />
        <rect x={218} y={202} width={44} height={8} rx={2} fill={color.surface} />
        <rect x={212} y={194} width={46} height={8} rx={2} fill={color.line} />
        <Table x={110} w={360} top={color.muted} panel={color.navyInk} />
      </Push>
      {bubbleOut > 0
        ? bubbles.map((b, i) => {
            const p = pop(f, wf(S.ketik, i) - 4);
            if (p <= 0.001) return null;
            return (
              <g key={i} style={popStyle(p, b.x + 60, b.y + 24)} opacity={bubbleOut}>
                <Bubble x={b.x} y={b.y} w={124}>
                  <rect x={b.x + 16} y={b.y + 16} width={20} height={18} rx={4} fill={color.blue1} />
                  <path d={`M${b.x + 20},${b.y + 17} q6,-10 12,0`} stroke={color.blue1} strokeWidth={3} fill="none" />
                  <rect x={b.x + 46} y={b.y + 16} width={56} height={6} rx={3} fill={color.muted} />
                  <rect x={b.x + 46} y={b.y + 28} width={36} height={6} rx={3} fill={color.muted} />
                  <circle cx={b.x + 116} cy={b.y + 4} r={9} fill={color.alert} />
                </Bubble>
              </g>
            );
          })
        : null}
      {f >= wf(S.ketik, 3) - 4 && cardsOut > 0
        ? [0, 1, 2].map((i) => {
            const cx = 488;
            const cy = 34 + i * 92;
            const p = pop(f, wf(S.ketik, 3) - 4 + i * 3);
            const head = [color.blue1, color.blue2, color.success][i];
            return (
              <g key={i} style={popStyle(p, cx + 100, cy + 40)} opacity={cardsOut}>
                <rect x={cx} y={cy} width={200} height={80} rx={12} fill={color.surface} stroke={color.line} strokeWidth={3} />
                <rect x={cx + 14} y={cy + 14} width={22} height={22} rx={6} fill={head} />
                <rect x={cx + 46} y={cy + 20} width={70} height={8} rx={4} fill={color.line} />
                {[0, 1].map((r) => {
                  const kk = r * 3 + i;
                  const u = lin(f, typeStart + kk * 9, typeStart + kk * 9 + 9);
                  const caret = u > 0 && u < 1;
                  return (
                    <g key={r}>
                      <rect x={cx + 14} y={cy + 46 + r * 16} width={90 * u} height={7} rx={3.5} fill={color.navy} opacity={0.75} />
                      <rect x={cx + 108} y={cy + 46 + r * 16} width={50 * u} height={7} rx={3.5} fill={color.blue2} opacity={0.75} />
                      {caret ? <rect x={cx + 14 + (u < 0.64 ? 90 * u / 0.64 : 94 + 50 * u)} y={cy + 44 + r * 16} width={2.5} height={11} fill={color.blue2} /> : null}
                    </g>
                  );
                })}
              </g>
            );
          })
        : null}
      {batt > 0.001 ? (
        <g style={popStyle(batt, 590, 150)}>
          <rect x={524} y={120} width={130} height={62} rx={12} fill={color.surface} stroke={color.line} strokeWidth={6} />
          <rect x={656} y={138} width={10} height={26} rx={3} fill={color.line} />
          <rect x={534} y={130} width={110 * level} height={42} rx={6} fill={level > 0.4 ? color.success : color.alert} opacity={low} />
          <path d="M592,134 l-12,20 h10 l-6,16 l16,-22 h-10 l6,-14 z" fill={color.navy} opacity={0.55} />
        </g>
      ) : null}
    </g>
  );
};

// D. Ruang makan malam: keluarga menunggu, kursi kosong, makanan mendingin, ruangan meredup;
// waktu untuk berpikir (bohlam di awan pikiran) berkedip lalu padam.
const SceneD: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const chairHi = interpolate(f, [wf(S.waktu, 2) - 2, wf(S.waktu, 2) + 6, wf(S.waktu, 2) + 34], [0, 1, 0.3], clamp);
  const thinkIn = pop(f, wf(S.waktu, 5) - 4);
  const fade = lin(f, wf(S.waktu, 7) - 4, wf(S.waktu, 7) + 16);
  const fl = f > wf(S.waktu, 6) && f < wf(S.waktu, 7) + 2 ? (Math.sin(f * 2.4) > 0 ? 1 : 0.3) : 1;
  const bulbOn = (1 - fade) * fl;
  const warm = 1 - lin(t, 20, 110);
  const dim = 0.18 + 0.3 * fade;
  const k = 1 + 0.05 * lin(t, 0, 140);
  return (
    <Push k={k} cx={330} cy={210}>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={color.canvas} />
      <HomeWindow f={f} x={540} y={26} night id="jendela-d" />
      <Clock x={450} y={62} r={30} min={t * 16} hour={300 + t * 1.3} />
      <Floor />
      <Person x={210} y={FLOOR + 8} body={color.blue1} hair="panjang" face="sedih" look={0.3} handR={{x: 6, y: -118}} />
      <Person x={322} y={FLOOR - 14} s={0.72} body={color.success} hair="anak" face="sedih" look={0.9} />
      <Chair x={438} hi={chairHi} />
      <Table x={140} w={370} />
      <Bowl x={210} f={f} warm={warm} />
      <Bowl x={322} f={f} warm={warm} />
      <Bowl x={438} f={f} warm={warm} />
      {thinkIn > 0.001 ? (
        <g style={popStyle(thinkIn, 300, 70)}>
          <circle cx={236} cy={120} r={6} fill={color.surface} stroke={color.line} strokeWidth={3} />
          <circle cx={252} cy={100} r={9} fill={color.surface} stroke={color.line} strokeWidth={3} />
          <ellipse cx={310} cy={60} rx={60} ry={44} fill={color.surface} stroke={color.line} strokeWidth={3} />
          <Bulb x={310} y={60} s={0.95} on={bulbOn} />
        </g>
      ) : null}
      {/* ruangan meredup */}
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={color.navy} opacity={dim} />
    </Push>
  );
};

// E. Pekerjaan berulang masuk ke mesin, keluar rapi dan selesai.
const SceneE: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const N = 6;
  const start = t0 + 30;
  const gap = 15;
  const glow = interpolate(f, [P.mesin() - 2, P.mesin() + 6, P.mesin() + 30], [0, 1, 0.4], clamp);
  const departed = (k: number) => f >= start + k * gap;
  const remaining = Array.from({length: N}, (_, k) => k).filter((k) => !departed(k));
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <HomeWindow f={f} x={40} y={26} night={false} id="jendela-e" />
      <polygon points="40,126 180,126 300,300 120,300" fill={color.surface} opacity={0.5} />
      <Floor />
      <rect x={60} y={266} width={600} height={12} rx={6} fill={color.navy} />
      {Array.from({length: 9}, (_, i) => (
        <circle key={i} cx={90 + i * 68} cy={272} r={4} fill={color.line} transform={`rotate(${t * 6} ${90 + i * 68} 272)`} />
      ))}
      {remaining.map((k, j) => (
        <RowCard key={k} x={80} y={222 - j * 14} />
      ))}
      {Array.from({length: N}, (_, k) => {
        const p = (f - (start + k * gap)) / 40;
        if (p < 0) return null;
        const outY = 222 - k * 14;
        if (p < 0.45) return <RowCard key={k} x={80 + (p / 0.45) * 220} y={222} />;
        if (p < 0.6) return null;
        const u = Math.min(1, (p - 0.6) / 0.4);
        const e = ease(u);
        const sparkle = p > 1 && p < 1.4 ? Math.sin(((p - 1) / 0.4) * Math.PI) : 0;
        return (
          <g key={k}>
            <RowCard x={440 + e * 150} y={222 + (outY - 222) * e} done />
            {sparkle > 0 ? <Sparkle x={668} y={outY - 4} s={0.9 * sparkle} fill={color.success} /> : null}
          </g>
        );
      })}
      <circle cx={370} cy={200} r={110} fill={color.blue1} opacity={0.12 * glow} />
      <rect x={300} y={140} width={140} height={130} rx={18} fill={color.navy} />
      <rect x={300} y={140} width={140} height={20} rx={10} fill={color.navyInk} opacity={0.5} />
      <circle cx={370} cy={200} r={44} fill={color.navyInk} />
      <Cog x={370} y={200} r={36} a={t * 5} fill={color.blue1} hole={color.navyInk} />
      <circle cx={420} cy={150} r={5} fill={color.success} opacity={0.5 + 0.5 * Math.sin(t / 4)} />
      <circle cx={404} cy={150} r={5} fill={color.blue1} opacity={0.5 + 0.5 * Math.cos(t / 5)} />
    </g>
  );
};

// F. Orangnya fokus ke pelanggan: ngobrol, berjabat tangan; mesin kecil bekerja sendiri di pojok.
const SceneF: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const b1 = pop(f, t0 + 12);
  const b2 = pop(f, t0 + 40);
  const shake = lin(f, wf(S.manusia, 5) - 10, wf(S.manusia, 5) + 2);
  const bob = shake >= 1 ? Math.sin((f - wf(S.manusia, 5)) / 3) * 4 : 0;
  const ticks = [0, 1, 2].filter((i) => t > 20 + i * 22);
  return (
    <g>
      <rect width={W} height={H} fill={color.canvas} />
      <circle cx={360} cy={170} r={160} fill={color.blue1} opacity={0.07} />
      <Floor />
      {/* tanaman kecil */}
      <rect x={70} y={250} width={34} height={50} rx={6} fill={color.navy} />
      <path d="M87,252 C70,220 60,210 66,196 C80,206 86,226 87,252 C88,224 96,200 110,192 C114,210 100,232 87,252 Z" fill={color.success} />
      <rect x={560} y={26} width={136} height={86} rx={14} fill={color.navy} />
      <Cog x={600} y={69} r={24} a={t * 6} fill={color.blue1} hole={color.navy} />
      {ticks.map((i) => (
        <g key={i}>
          <circle cx={646} cy={46 + i * 22} r={8} fill={color.success} />
          <path d={`M${642},${46 + i * 22} l3,3 l5,-6`} stroke={color.surface} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <Person x={250} y={FLOOR} body={color.blue1} face="senang" look={0.5} handR={{x: 26 + shake * 78, y: -66 - shake * 24 + bob}} />
      <Person x={460} y={FLOOR} body={color.blue2} hair="panjang" face="senang" look={-0.5} handL={{x: -26 - shake * 78, y: -66 - shake * 24 + bob}} />
      {b1 > 0.001 ? (
        <g style={popStyle(b1, 460, 110)}>
          <Bubble x={410} y={34} w={110}>
            <Dots x={442} y={58} f={f} />
          </Bubble>
        </g>
      ) : null}
      {b2 > 0.001 ? (
        <g style={popStyle(b2, 250, 110)}>
          <Bubble x={170} y={34} w={110} tailRight>
            <Heart x={225} y={62} s={0.75} />
          </Bubble>
        </g>
      ) : null}
    </g>
  );
};

// G. Senja: cahaya hangat masuk lewat jendela, pemilik pulang tepat waktu dan duduk di kursi
// yang tadi kosong; makanan masih hangat; di "kebersamaan keluarga" semua tersenyum, hati muncul.
const SceneG: React.FC<{f: number; t0: number}> = ({f, t0}) => {
  const t = f - t0;
  const walk = lin(t, 4, 46);
  const sit = lin(t, 46, 58);
  const px = 680 - walk * 242;
  const childHop = t > 44 && t < 80 ? Math.max(0, Math.sin(((t - 44) / 18) * Math.PI)) * 14 : 0;
  const heartAt = wf(S.alasan, 7) - 4; // "kebersamaan"
  const heart = pop(f, heartAt);
  const beat = heart >= 1 ? 1 + 0.06 * Math.sin((f - heartAt) / 4) : 1;
  const together = f >= heartAt + 6;
  const shafts = 0.3 + 0.08 * Math.sin(t / 20);
  const k = 1 + 0.07 * lin(f, heartAt - 10, heartAt + 60);
  return (
    <Push k={k} cx={324} cy={190}>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={color.canvas} />
      <HomeWindow f={f} x={540} y={26} night={false} id="jendela-g" />
      {/* berkas cahaya senja */}
      <polygon points="540,126 610,126 330,340 170,340" fill={color.surface} opacity={shafts} />
      <polygon points="620,126 680,126 520,340 420,340" fill={color.surface} opacity={shafts * 0.7} />
      <Clock x={450} y={62} r={30} min={150 + t * 0.6} hour={170} />
      <Floor />
      <Person x={210} y={FLOOR + 8} body={color.blue1} hair="panjang" face={together ? 'pejam' : 'senang'} look={0.4} />
      <Person x={322} y={FLOOR - 14} s={0.72} body={color.success} hair="anak" face={together ? 'pejam' : 'senang'} look={walk < 1 ? 0.9 : 0.3} hop={childHop} />
      <Person
        x={px}
        y={FLOOR + 8 * sit}
        body={color.blue2}
        face={together ? 'pejam' : 'senang'}
        look={-0.6}
        walk={walk > 0 && walk < 1 ? t * 0.3 : undefined}
        bag={walk < 1}
      />
      <Table x={140} w={370} />
      <Bowl x={210} f={f} warm={1} />
      <Bowl x={322} f={f} warm={1} />
      <Bowl x={438} f={f} warm={1} />
      {heart > 0.001 ? (
        <g style={popStyle(heart, 324, 120)}>
          <circle cx={324} cy={120} r={38 * heart} fill={color.alert} opacity={0.08} />
          <Heart x={324} y={128} s={1.5 * beat} />
          <Sparkle x={278} y={98} s={0.7 * heart} fill={color.blue1} />
          <Sparkle x={372} y={108} s={0.55 * heart} fill={color.blue1} />
        </g>
      ) : null}
    </Push>
  );
};

// Pudar silang: adegan baru (di atas) masuk selama 8 frame sebelum jendelanya mulai, adegan lama tetap
// penuh di bawahnya sampai tertutup, sehingga tidak ada kedip latar putih di antara dua adegan gelap.
const FADE = 8;
const sceneOpacity = (f: number, [a]: readonly [number, number], first: boolean) => (first ? 1 : interpolate(f, [a - FADE, a], [0, 1], clamp));

export const Ilustrasi: React.FC<{f: number}> = ({f}) => {
  const inn = P.stageIn();
  const out = P.stageOut();
  if (f < inn || f > out + 12) return null;
  const card = sp(f, inn, 16);
  const cardOut = interpolate(f, [out, out + 10], [1, 0], clamp);
  const scenes: [keyof typeof SC, React.ReactNode][] = [
    ['A', <SceneA key="A" f={f} t0={SC.A()[0]} />],
    ['B', <SceneB key="B" f={f} t0={SC.B()[0]} />],
    ['D', <SceneD key="D" f={f} t0={SC.D()[0]} />],
    ['E', <SceneE key="E" f={f} t0={SC.E()[0]} />],
    ['F', <SceneF key="F" f={f} t0={SC.F()[0]} />],
    ['G', <SceneG key="G" f={f} t0={SC.G()[0]} />],
  ];
  return (
    <div
      style={{
        position: 'absolute',
        left: STAGE.left,
        top: STAGE.top,
        width: W,
        height: H,
        borderRadius: radius.window + 8,
        overflow: 'hidden',
        background: color.surface,
        boxShadow: shadow,
        opacity: interpolate(card, [0, 0.5], [0, 1], clamp) * cardOut,
        transform: `translateY(${(1 - card) * 24}px) scale(${0.94 + 0.06 * card})`,
        filter: card < 1 ? `blur(${(1 - card) * 6}px)` : undefined,
      }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block'}}>
        {scenes.map(([k, node]) => {
          const win = SC[k]();
          if (f < win[0] - (k === 'A' ? 0 : FADE) || f > win[1]) return null;
          return (
            <g key={k} opacity={sceneOpacity(f, win, k === 'A')}>
              {node}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
