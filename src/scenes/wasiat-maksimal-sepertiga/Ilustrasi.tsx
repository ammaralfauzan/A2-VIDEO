import React from 'react';
import {interpolate, spring} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';

// Bentuk dasar ilustrasi benda (Tams: bidang rata arang + oranye, sudut bulat, tanpa makhluk bernyawa).
// Semua digambar dalam satu SVG panggung (lihat Panggung.tsx). Titik acuan tiap benda = tengah bawah (tempat bayangan).
export const C = T.charcoal;
export const O = T.orange;
export const W = T.bg;
export const G = T.bg2;
export const LINE = 'rgba(10,10,10,.12)';
export const SHADE = 'rgba(10,10,10,.07)';
export const GREY = '#BDBDBB'; // abu netral (ink 26% di atas putih)

export const L = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {...clamp, easing: ease});
// Muncul memantul halus (pegas teredam), 0..1.
export const pop = (f: number, start: number) => (f < start ? 0 : spring({frame: f - start, fps: 30, config: {damping: 15, stiffness: 150, mass: 0.8}}));
// Melayang pelan agar panggung tidak mati.
export const bob = (f: number, phase = 0, amp = 4) => Math.sin(f / 22 + phase) * amp;

type G2 = {x: number; y: number; s?: number; o?: number; children?: React.ReactNode};
export const At: React.FC<G2> = ({x, y, s = 1, o = 1, children}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {children}
  </g>
);

export const Shadow: React.FC<{rx: number; y?: number}> = ({rx, y = 0}) => <ellipse cx={0} cy={y} rx={rx} ry={rx * 0.09} fill={SHADE} />;

export const House: React.FC<{lit?: number; door?: string}> = ({lit = 0, door = O}) => (
  <>
    <Shadow rx={120} />
    <rect x={-60} y={-205} width={26} height={60} rx={8} fill={C} />
    <rect x={-84} y={-134} width={168} height={134} rx={20} fill={G} stroke={LINE} strokeWidth={3} />
    <path d="M-104 -122 L0 -206 L104 -122 Z" fill={C} stroke={C} strokeWidth={20} strokeLinejoin="round" />
    <rect x={-22} y={-74} width={44} height={74} rx={16} fill={door} />
    <circle cx={12} cy={-36} r={3.5} fill={W} />
    {[-58, 34].map((wx) => (
      <g key={wx}>
        <rect x={wx} y={-104} width={26} height={26} rx={7} fill={W} stroke={LINE} strokeWidth={3} />
        <rect x={wx} y={-104} width={26} height={26} rx={7} fill={O} opacity={lit} />
      </g>
    ))}
  </>
);

export const GoldStack: React.FC = () => {
  const bar = (x: number, y: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
      <path d="M-40 0 L-30 -30 L30 -30 L40 0 Z" fill={O} stroke={O} strokeWidth={8} strokeLinejoin="round" />
      <path d="M-24 -24 L24 -24" stroke={W} strokeWidth={4} strokeLinecap="round" opacity={0.55} />
    </g>
  );
  return (
    <>
      <Shadow rx={100} />
      {bar(-44, -4)}
      {bar(44, -4)}
      {bar(0, -42)}
    </>
  );
};

export const Coins: React.FC<{n?: number; color?: string}> = ({n = 5, color = O}) => (
  <>
    <Shadow rx={52} />
    {Array.from({length: n}).map((_, i) => (
      <g key={i} transform={`translate(0 ${-10 - i * 14})`}>
        <ellipse cx={0} cy={4} rx={40} ry={13} fill={C} />
        <ellipse cx={0} cy={0} rx={40} ry={13} fill={color} />
        <ellipse cx={0} cy={0} rx={24} ry={7} fill="none" stroke={W} strokeWidth={3} opacity={0.5} />
      </g>
    ))}
  </>
);

export const Envelope: React.FC<{label?: string; seal?: string}> = ({label, seal = O}) => (
  <>
    <Shadow rx={130} />
    <rect x={-120} y={-160} width={240} height={150} rx={22} fill={W} stroke={LINE} strokeWidth={3} />
    <path d="M-106 -146 L0 -76 L106 -146" fill="none" stroke="rgba(10,10,10,.20)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-106 -24 L-30 -84 M106 -24 L30 -84" stroke="rgba(10,10,10,.08)" strokeWidth={4} strokeLinecap="round" />
    <circle cx={0} cy={-76} r={24} fill={seal} />
    <circle cx={0} cy={-76} r={13} fill="none" stroke={W} strokeWidth={3.5} opacity={0.8} />
    {label ? (
      <text x={0} y={-26} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={17} letterSpacing={3} fill="rgba(10,10,10,.45)">
        {label}
      </text>
    ) : null}
  </>
);

export const Badge: React.FC<{ok: boolean; r?: number}> = ({ok, r = 30}) => (
  <>
    <circle cx={0} cy={0} r={r} fill={ok ? O : C} />
    {ok ? (
      <path d={`M${-r * 0.42} ${r * 0.04} l${r * 0.28} ${r * 0.28} l${r * 0.56} ${-r * 0.6}`} fill="none" stroke={W} strokeWidth={r * 0.2} strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d={`M${-r * 0.36} ${-r * 0.36} L${r * 0.36} ${r * 0.36} M${r * 0.36} ${-r * 0.36} L${-r * 0.36} ${r * 0.36}`} stroke={W} strokeWidth={r * 0.2} strokeLinecap="round" />
    )}
  </>
);

export const Lock: React.FC<{color?: string; hole?: string}> = ({color = C, hole = W}) => (
  <>
    <path d="M-14 -34 V-46 a14 14 0 0 1 28 0 V-34" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
    <rect x={-24} y={-36} width={48} height={36} rx={11} fill={color} />
    <circle cx={0} cy={-19} r={5} fill={hole} />
  </>
);

// Meja samping tempat tidur: lampu menyala, segelas air, botol obat, surat terlipat.
export const Nightstand: React.FC<{f: number; glow: number}> = ({f, glow}) => (
  <>
    <circle cx={-120} cy={-300} r={150 + Math.sin(f / 18) * 4} fill={O} opacity={0.1 * glow} />
    <circle cx={-120} cy={-300} r={90} fill={O} opacity={0.1 * glow} />
    <Shadow rx={230} />
    <rect x={-210} y={-206} width={420} height={206} rx={22} fill={C} />
    <rect x={-226} y={-226} width={452} height={34} rx={14} fill={C} />
    <rect x={-176} y={-170} width={352} height={68} rx={14} fill="rgba(254,254,254,.08)" />
    <rect x={-176} y={-88} width={352} height={68} rx={14} fill="rgba(254,254,254,.08)" />
    <circle cx={0} cy={-136} r={7} fill={O} />
    <circle cx={0} cy={-54} r={7} fill={O} />
    {/* lampu */}
    <rect x={-152} y={-250} width={64} height={24} rx={10} fill={C} />
    <rect x={-124} y={-330} width={8} height={84} rx={4} fill={C} />
    <path d="M-176 -322 L-150 -392 L-90 -392 L-64 -322 Z" fill={O} stroke={O} strokeWidth={12} strokeLinejoin="round" />
    <path d="M-148 -372 L-92 -372" stroke={W} strokeWidth={4} strokeLinecap="round" opacity={0.4} />
    {/* gelas air */}
    <path d="M0 -330 L8 -228 L52 -228 L60 -330 Z" fill="rgba(10,10,10,.04)" stroke="rgba(10,10,10,.22)" strokeWidth={4} strokeLinejoin="round" />
    <path d="M4 -292 L9 -232 L51 -232 L56 -292 Z" fill={O} opacity={0.18} />
    <path d="M14 -318 L18 -250" stroke={W} strokeWidth={4} strokeLinecap="round" />
    {/* botol obat */}
    <rect x={88} y={-306} width={50} height={80} rx={12} fill={W} stroke={LINE} strokeWidth={3} />
    <rect x={84} y={-326} width={58} height={24} rx={8} fill={C} />
    <rect x={98} y={-282} width={30} height={30} rx={6} fill={O} />
    <path d="M113 -276 V-258 M104 -267 H122" stroke={W} strokeWidth={4} strokeLinecap="round" />
    {/* surat terlipat */}
    <g transform="translate(168 -226) rotate(-8)">
      <rect x={-34} y={-14} width={74} height={14} rx={4} fill={W} stroke={LINE} strokeWidth={3} />
    </g>
  </>
);

export const MoonWindow: React.FC = () => (
  <>
    <rect x={-120} y={-150} width={240} height={150} rx={30} fill="rgba(43,43,43,.06)" />
    <rect x={-120} y={-150} width={240} height={150} rx={30} fill="none" stroke={LINE} strokeWidth={4} />
    <path d="M0 -150 V0 M-120 -75 H120" stroke={LINE} strokeWidth={4} />
    <circle cx={60} cy={-108} r={22} fill={O} opacity={0.85} />
    <circle cx={72} cy={-116} r={20} fill="#F7F7F5" />
    <circle cx={-70} cy={-112} r={3} fill={GREY} />
    <circle cx={-40} cy={-40} r={2.5} fill={GREY} />
    <circle cx={30} cy={-38} r={2.5} fill={GREY} />
  </>
);

// Toples penuh koin (berkecukupan) dan mangkuk kosong (miskin).
export const Jar: React.FC<{fill: number}> = ({fill}) => (
  <>
    <Shadow rx={110} />
    <rect x={-90} y={-230} width={180} height={230} rx={44} fill="rgba(10,10,10,.03)" stroke="rgba(10,10,10,.20)" strokeWidth={5} />
    <clipPath id="jar-clip">
      <rect x={-84} y={-224} width={168} height={218} rx={38} />
    </clipPath>
    <g clipPath="url(#jar-clip)">
      {Array.from({length: 11}).map((_, r) => {
        const show = interpolate(fill, [r / 12, (r + 1) / 12], [0, 1], clamp);
        if (show <= 0) return null;
        const y = -26 - r * 18 - (1 - show) * 60;
        return (
          <g key={r} opacity={show} transform={`translate(${(r % 3) * 6 - 6} 0)`}>
            <ellipse cx={0} cy={y + 6} rx={70} ry={17} fill={C} />
            <ellipse cx={0} cy={y} rx={70} ry={17} fill={O} />
            <ellipse cx={0} cy={y} rx={44} ry={9} fill="none" stroke={W} strokeWidth={3} opacity={0.45} />
          </g>
        );
      })}
    </g>
    <rect x={-70} y={-262} width={140} height={34} rx={12} fill={C} />
    <path d="M-66 -200 V-60" stroke={W} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
  </>
);

export const Bowl: React.FC = () => (
  <>
    <Shadow rx={110} />
    <path d="M-110 -96 Q-110 0 0 0 Q110 0 110 -96 Z" fill={G} stroke="rgba(10,10,10,.20)" strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={-96} rx={110} ry={20} fill="#E6E6E3" stroke="rgba(10,10,10,.20)" strokeWidth={5} />
  </>
);

// Rak kitab: dua kitab tegak bernama di punggungnya, satu kitab terbuka, tanaman kecil.
export const Books: React.FC<{a: number; b: number; open: number}> = ({a, b, open}) => {
  const spine = (x: number, w: number, h: number, name: string, color: string, p: number) => (
    <g transform={`translate(${x} ${(1 - p) * 30})`} opacity={p}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={14} fill={color} />
      <rect x={-w / 2 + 10} y={-h + 26} width={w - 20} height={8} rx={4} fill={O} />
      <rect x={-w / 2 + 10} y={-34} width={w - 20} height={8} rx={4} fill={O} />
      <text transform={`translate(${6} ${-h / 2}) rotate(-90)`} textAnchor="middle" fontFamily={TF.head} fontWeight={800} fontSize={26} letterSpacing={4} fill={W}>
        {name}
      </text>
    </g>
  );
  return (
    <>
      <Shadow rx={280} />
      <rect x={-290} y={-8} width={580} height={16} rx={8} fill={C} />
      {spine(-150, 96, 330, 'BUKHARI', C, a)}
      {spine(-40, 96, 300, 'MUSLIM', '#3A3A3A', b)}
      {/* kitab terbuka */}
      <g transform={`translate(105 -8) scale(${0.85 + 0.15 * open})`} opacity={open}>
        <path d="M-120 0 Q-60 -16 0 0 L0 -150 Q-60 -166 -120 -150 Z" fill={W} stroke={LINE} strokeWidth={3} strokeLinejoin="round" />
        <path d="M120 0 Q60 -16 0 0 L0 -150 Q60 -166 120 -150 Z" fill={W} stroke={LINE} strokeWidth={3} strokeLinejoin="round" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path d={`M-100 ${-120 + i * 26} H-22`} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <path d={`M22 ${-120 + i * 26} H${i === 3 ? 70 : 100}`} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
          </g>
        ))}
        <path d="M30 -150 V-104 l10 -8 l10 8 V-150" fill={O} />
      </g>
      {/* tanaman kecil */}
      <g transform="translate(288 -8)">
        <path d="M0 -60 Q-34 -110 -20 -150 Q12 -112 0 -60 Z" fill={C} />
        <path d="M2 -60 Q40 -96 46 -132 Q8 -112 2 -60 Z" fill={O} />
        <rect x={-24} y={-62} width={48} height={62} rx={14} fill={G} stroke={LINE} strokeWidth={3} />
      </g>
    </>
  );
};

// Bingkisan bagian ahli waris (pita oranye) dengan centang "sudah ditetapkan".
export const Parcel: React.FC<{w?: number; h?: number}> = ({w = 120, h = 100}) => (
  <>
    <Shadow rx={w * 0.6} />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={18} fill={G} stroke={LINE} strokeWidth={3} />
    <rect x={-w / 2 - 6} y={-h - 2} width={w + 12} height={26} rx={10} fill={C} />
    <rect x={-8} y={-h - 2} width={16} height={h + 2} fill={O} />
    <path d={`M0 ${-h - 2} q-30 -34 -38 -6 q8 18 38 6 q30 12 38 -6 q-8 -28 -38 6`} fill={O} />
  </>
);

// Palang penahan (oranye) di atas dua tiang.
export const Barrier: React.FC = () => (
  <>
    <Shadow rx={110} />
    <rect x={-92} y={-120} width={18} height={120} rx={9} fill={C} />
    <rect x={74} y={-120} width={18} height={120} rx={9} fill={C} />
    <rect x={-120} y={-140} width={240} height={52} rx={26} fill={O} />
    {[-70, -10, 50].map((x) => (
      <path key={x} d={`M${x} -136 L${x + 26} -92`} stroke={W} strokeWidth={12} strokeLinecap="round" opacity={0.85} />
    ))}
  </>
);

// Lengkung pelindung di atas rumah (penutup "menjaga keluarga").
export const Arch: React.FC<{p: number}> = ({p}) => {
  const len = Math.PI * 190;
  return (
    <path d="M-190 -40 A190 190 0 0 1 190 -40" fill="none" stroke={O} strokeWidth={22} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
  );
};
