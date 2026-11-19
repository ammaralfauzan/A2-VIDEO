import React from 'react';
import {color} from '../theme';

// Maskot "Gigi": gear yang sama dengan gear di logo A2 (8 gigi persegi bersudut tumpul,
// cincin navy tebal, lubang putih di tengah). Lubang putih itu jadi "layar wajah";
// ekspresi hanya lewat mata, mengikuti referensi mata dari Bos. Tanpa kaki, melayang.

export type Mood = 'biasa' | 'senang' | 'puas' | 'kaget' | 'cemas' | 'lelah' | 'mikir' | 'kedip' | 'sedih';

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
  eyesOpacity?: number; // 0 = wajah kosong (lubang putih seperti gear di logo)
  shadow?: number; // kekuatan bayangan lembut di belakang badan (0..1)
  // Putar kepala ala 3D (-1..1 = sinus sudut hadap ke kiri/kanan): wajah bergeser dan menyempit di
  // permukaan, badan gear tetap bulat (tidak gepeng). 0 = menghadap depan (tampilan lama, identik).
  turn?: number;
  // Angguk/dongak ala 3D (-1..1, negatif = mendongak): sama seperti `turn` tetapi arah atas-bawah.
  pitch?: number;
  // Tampilan bervolume (revisi 5 Bos): 2D tetapi terlihat 3D. 0 = datar (tampilan lama, identik),
  // 1 = penuh: ketebalan gear terlihat (ekstrusi), cahaya kiri-atas, bayangan kanan-bawah, kilau,
  // layar wajah cekung berkaca. Nilai di antaranya memudarkan efek (untuk peralihan ke logo datar).
  volume?: number;
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
    // alis melonjak + mata bulat lebar + mulut "o"
    kaget: (
      <>
        <path d="M-21,-17 Q-14,-23 -7,-17 M7,-17 Q14,-23 21,-17" {...line} strokeWidth={3.5} />
        <ellipse cx={-13} cy={-3} rx={5.5} ry={8.5} fill={ink} />
        <ellipse cx={13} cy={-3} rx={5.5} ry={8.5} fill={ink} />
        <ellipse cx={0} cy={14} rx={3.4} ry={4.2} fill={ink} />
      </>
    ),
    // khawatir: alis miring (ujung dalam terangkat), mata kecil, mulut bergelombang
    cemas: (
      <>
        <path d="M-22,-11 L-8,-17 M8,-17 L22,-11" {...line} strokeWidth={4} />
        <ellipse cx={-13} cy={-2} rx={4} ry={6} fill={ink} />
        <ellipse cx={13} cy={-2} rx={4} ry={6} fill={ink} />
        <path d="M-9,14 q2.25,-3 4.5,0 q2.25,3 4.5,0 q2.25,-3 4.5,0 q2.25,3 4.5,0" {...line} strokeWidth={3} />
      </>
    ),
    // > <  + mulut cemberut
    lelah: (
      <>
        <path d="M-19,-8 L-8,-1 L-19,6 M19,-8 L8,-1 L19,6" {...line} />
        <path d="M-6,16 Q0,10.5 6,16" {...line} strokeWidth={3.2} />
      </>
    ),
    // melirik ke atas, satu alis naik
    mikir: (
      <>
        <rect x={-16} y={-10} width={10} height={11} rx={3.5} fill={ink} />
        <rect x={9} y={-10} width={10} height={11} rx={3.5} fill={ink} />
        <path d="M7,-17 L21,-21" {...line} strokeWidth={4} />
      </>
    ),
    // sedih: alis miring tegas (ujung dalam naik), mata sayu (sudut luar turun), mulut melengkung turun tipis
    sedih: (
      <>
        <path d="M-22,-10 Q-16,-12 -9,-18 M9,-18 Q16,-12 22,-10" {...line} strokeWidth={3} />
        <path d="M-19,-3 L-8,-7 L-8,4 Q-13.5,8.5 -19,4 Z" fill={ink} stroke={ink} strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M19,-3 L8,-7 L8,4 Q13.5,8.5 19,4 Z" fill={ink} stroke={ink} strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M-6.5,16.5 Q0,11.5 6.5,16.5" {...line} strokeWidth={2.2} />
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
  eyesOpacity = 1,
  shadow = 1,
  turn = 0,
  pitch = 0,
  volume = 0,
}) => {
  if (volume > 0) {
    return (
      <GigiVolume
        {...{size, mood, look, spin, blink, eyeOpen, sweat, sweatPhase, tilt, eyesOpacity, shadow, turn, pitch, volume}}
      />
    );
  }
  const clipId = React.useId().replace(/:/g, '');
  // Satu tetes keringat besar yang menetes turun lalu memudar (minimalis).
  const dropY = -58 + sweatPhase * 16;
  const dropO = sweat * Math.min(1, (1 - sweatPhase) * 3) * Math.min(1, sweatPhase * 6 + 0.2);
  return (
    // Bayangan lembut di belakang badan (bukan di lantai), mengikuti bentuk gear.
    <svg
      width={size}
      height={size * 1.18}
      viewBox="-80 -80 160 189"
      style={{overflow: 'visible', filter: shadow > 0 ? `drop-shadow(0 ${size * 0.06}px ${size * 0.1}px rgba(11,22,48,${0.2 * shadow}))` : undefined}}
    >
      <g transform={`translate(0 ${70 * (1 - squash.y)}) rotate(${tilt}) scale(${squash.x} ${squash.y})`}>
        {turn !== 0 || pitch !== 0 ? (
          // sisi tebal gear: salinan gelap di belakang, bergeser berlawanan arah hadap
          <g transform={`translate(${-turn * 8} ${-pitch * 8}) rotate(${spin + turn * 12})`}>
            {Array.from({length: 8}, (_, i) => (
              <rect key={i} x={-TOOTH_W / 2} y={-R_TOOTH} width={TOOTH_W} height={R_TOOTH - R_BODY + 8} rx={3} fill={color.navyInk} transform={`rotate(${i * 45})`} />
            ))}
            <circle r={R_BODY} fill={color.navyInk} />
          </g>
        ) : null}
        <g transform={`rotate(${spin + turn * 12})`}>
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
        {turn === 0 && pitch === 0 ? (
          <>
            <circle r={R_HOLE} fill={color.surface} />
            <g opacity={eyesOpacity}>
              <Eyes mood={mood} blink={blink} look={look} open={eyeOpen} />
            </g>
          </>
        ) : (
          <>
            {/* 2D yang terasa 3D tanpa gepeng (revisi 4 Bos): tidak ada skala menyamping. Layar wajah dan mata
                bergeser dengan paralaks (mata lebih jauh dari layar = terasa di permukaan bulat), dan sisi tebal
                gear (navyInk) mengintip di sisi yang berlawanan, seperti koin yang berputar sedikit. */}
            <clipPath id={clipId}>
              <circle cx={turn * 9} cy={pitch * 9} r={R_HOLE} />
            </clipPath>
            <circle cx={turn * 9} cy={pitch * 9} r={R_HOLE} fill={color.surface} />
            <g opacity={eyesOpacity} clipPath={`url(#${clipId})`}>
              <g transform={`translate(${turn * 20} ${pitch * 14})`}>
                <Eyes mood={mood} blink={blink} look={look} open={eyeOpen} />
              </g>
            </g>
          </>
        )}
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

// ---------- Gigi bervolume ----------
// Cahaya tetap dari kiri atas (tidak ikut berputar), gear berputar di bawahnya. Ketebalan = tumpukan
// siluet gelap yang bergeser berlawanan arah hadap (turn/pitch), jadi saat menoleh sisi tebalnya terlihat
// tanpa memipihkan apa pun.
const GearShape: React.FC<{fill: string; rot: number; dx?: number; dy?: number}> = ({fill, rot, dx = 0, dy = 0}) => (
  <g transform={`translate(${dx} ${dy}) rotate(${rot})`}>
    {Array.from({length: 8}, (_, i) => (
      <rect key={i} x={-TOOTH_W / 2} y={-R_TOOTH} width={TOOTH_W} height={R_TOOTH - R_BODY + 8} rx={3} fill={fill} transform={`rotate(${i * 45})`} />
    ))}
    <circle r={R_BODY} fill={fill} />
  </g>
);

// Untuk clipPath: hanya bentuk langsung (tanpa <g>), transform digabung di tiap bentuk.
const gearClip = (rot: number, k = 1) => (
  <>
    {Array.from({length: 8}, (_, i) => (
      <rect
        key={i}
        x={-TOOTH_W / 2}
        y={-R_TOOTH}
        width={TOOTH_W}
        height={R_TOOTH - R_BODY + 8}
        rx={3}
        transform={`scale(${k}) rotate(${rot + i * 45})`}
      />
    ))}
    <circle r={R_BODY * k} />
  </>
);

const GigiVolume: React.FC<Required<Omit<Props, 'squash'>>> = ({
  size,
  mood,
  look,
  spin,
  blink,
  eyeOpen,
  sweat,
  sweatPhase,
  tilt,
  eyesOpacity,
  shadow,
  turn,
  pitch,
  volume,
}) => {
  const id = React.useId().replace(/:/g, '');
  const v = Math.min(1, volume);
  const rot = spin + turn * 12;
  // arah ketebalan: sedikit ke kanan-bawah saat menghadap depan, berlawanan arah saat menoleh/mendongak
  const dvx = (6 - turn * 12) * v;
  const dvy = (11 - pitch * 10) * v;
  const hx = turn * 9;
  const hy = pitch * 9;
  const dropY = -58 + sweatPhase * 16;
  const dropO = sweat * Math.min(1, (1 - sweatPhase) * 3) * Math.min(1, sweatPhase * 6 + 0.2);
  const LAYERS = 10;
  const INSET = 0.86;
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="-80 -80 160 189"
      style={{overflow: 'visible', filter: shadow > 0 ? `drop-shadow(0 ${size * 0.08}px ${size * 0.12}px rgba(11,22,48,${0.26 * shadow}))` : undefined}}
    >
      <defs>
        <clipPath id={`${id}g`}>{gearClip(rot)}</clipPath>
        <radialGradient id={`${id}l`} cx="30%" cy="22%" r="80%">
          <stop offset="0%" stopColor={color.surface} stopOpacity={0.34 * v} />
          <stop offset="55%" stopColor={color.surface} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="45%" stopColor={color.navyInk} stopOpacity={0} />
          <stop offset="100%" stopColor={color.navyInk} stopOpacity={0.55 * v} />
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.navy} />
          <stop offset="100%" stopColor={color.navyInk} />
        </linearGradient>
        <radialGradient id={`${id}scr`} cx="42%" cy="36%" r="70%">
          <stop offset="0%" stopColor={color.surface} />
          <stop offset="62%" stopColor={color.surface} />
          <stop offset="88%" stopColor={color.line} />
          <stop offset="100%" stopColor={color.muted} stopOpacity={0.9} />
        </radialGradient>
        <clipPath id={`${id}i`}>{gearClip(rot, INSET)}</clipPath>
        <linearGradient id={`${id}bev`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={color.surface} stopOpacity={0.55 * v} />
          <stop offset="42%" stopColor={color.surface} stopOpacity={0} />
          <stop offset="60%" stopColor={color.navyInk} stopOpacity={0} />
          <stop offset="100%" stopColor={color.navyInk} stopOpacity={0.85 * v} />
        </linearGradient>
        <radialGradient id={`${id}top`} cx="34%" cy="26%" r="75%">
          <stop offset="0%" stopColor={color.blue1} stopOpacity={0.42 * v} />
          <stop offset="35%" stopColor={color.blue2} stopOpacity={0.3 * v} />
          <stop offset="70%" stopColor={color.blue2} stopOpacity={0} />
        </radialGradient>
        <clipPath id={`${id}h`}>
          <circle cx={hx + 1.2 * v} cy={hy + 1.6 * v} r={R_HOLE - 1.5 * v} />
        </clipPath>
      </defs>
      <g transform={`rotate(${tilt})`}>
        {/* ketebalan gear (ekstrusi), dari belakang ke depan */}
        {Array.from({length: LAYERS}, (_, k) => {
          const t = (LAYERS - k) / LAYERS;
          return <GearShape key={k} fill={k === 0 ? color.navyInk : `url(#${id}side)`} rot={rot} dx={dvx * t} dy={dvy * t} />;
        })}
        {/* muka depan gear + cahaya dan bayangan tetap */}
        <GearShape fill={color.navy} rot={rot} />
        {/* bevel: tepi kiri-atas terang, kanan-bawah gelap */}
        <g clipPath={`url(#${id}g)`}>
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}bev)`} />
        </g>
        {/* permukaan atas (lebih kecil), diterangi lembut */}
        <g transform={`scale(${INSET})`}>
          <GearShape fill={color.navy} rot={rot} />
        </g>
        <g clipPath={`url(#${id}i)`}>
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}top)`} />
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}l)`} />
          <rect x={-80} y={-80} width={160} height={160} fill={`url(#${id}s)`} />
        </g>
        {/* kilau tepi kiri atas */}
        <path d="M-47,-30 A56,56 0 0 1 -18,-53" stroke={color.surface} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.35 * v} />
        <path d="M-52,-12 A56,56 0 0 1 -50,-24" stroke={color.surface} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.25 * v} />
        {/* layar wajah cekung: dinding dalam gelap, kaca bulat sedikit menonjol */}
        <circle cx={hx} cy={hy} r={R_HOLE + 1.5 * v} fill={color.navyInk} />
        <circle cx={hx + 1.2 * v} cy={hy + 1.6 * v} r={R_HOLE - 1.5 * v} fill={`url(#${id}scr)`} />
        <g clipPath={`url(#${id}h)`}>
          <circle cx={hx - 2 * v} cy={hy - 3 * v} r={R_HOLE} fill="none" stroke={color.navyInk} strokeWidth={6} opacity={0.22 * v} />
          <g opacity={eyesOpacity}>
            <g transform={`translate(${turn * 20 + 1.2 * v} ${pitch * 14 + 1.6 * v})`}>
              <Eyes mood={mood} blink={blink} look={look} open={eyeOpen} />
            </g>
          </g>
          {/* kilau kaca */}
          <ellipse cx={hx - 15} cy={hy - 22} rx={11} ry={4.5} transform={`rotate(-32 ${hx - 15} ${hy - 22})`} fill={color.surface} opacity={0.85 * v} />
          <circle cx={hx - 4} cy={hy - 27} r={2} fill={color.surface} opacity={0.8 * v} />
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
