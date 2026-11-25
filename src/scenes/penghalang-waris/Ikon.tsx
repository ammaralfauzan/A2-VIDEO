import React from 'react';
import {T} from '../../brands/tams-consulting/theme';
import {C, G, GREY, O, W} from '../wasiat-maksimal-sepertiga/Ilustrasi';

// Benda bergaya motion graphic untuk penghalang-waris (revisi 2 Bos, 25 Nov 2026): lebih detail dan lebih "nyata",
// tanpa bingkai/kotak. Bidang rata token Tams + lapisan terang (putih beropasitas) dan bayangan (tinta beropasitas)
// untuk kesan volume; tanpa gradasi. Tanpa makhluk bernyawa: hanya tumbuhan dan benda.
// Ikon keluarga digambar di sekitar (0,0) dalam kotak ±55, dasar (tanah) di y 50.

const HI = 'rgba(254,254,254,.38)'; // kilap
const SH = 'rgba(10,10,10,.20)'; // bayangan bidang
const r = {strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none'};

// Daun dengan tulang daun. ang = arah daun (derajat), len = panjang.
const Daun: React.FC<{x: number; y: number; ang: number; len: number; color: string}> = ({x, y, ang, len, color}) => (
  <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={`M0 0 C${len * 0.3} ${-len * 0.42} ${len * 0.78} ${-len * 0.4} ${len} 0 C${len * 0.78} ${len * 0.36} ${len * 0.3} ${len * 0.38} 0 0 Z`} fill={color} />
    <path d={`M0 0 C${len * 0.3} ${len * 0.18} ${len * 0.78} ${len * 0.16} ${len} 0 C${len * 0.78} ${len * 0.36} ${len * 0.3} ${len * 0.38} 0 0 Z`} fill={SH} />
    <path d={`M${len * 0.06} 0 Q${len * 0.5} ${-len * 0.04} ${len * 0.9} 0`} stroke={HI} strokeWidth={2.4} {...r} />
    <path d={`M${len * 0.4} -1 l${len * 0.12} ${-len * 0.14} M${len * 0.6} -1 l${len * 0.1} ${-len * 0.12}`} stroke={HI} strokeWidth={1.8} {...r} />
  </g>
);

// Pot tanah liat: bibir, badan meruncing, bayangan sisi, tanah.
const Pot: React.FC<{w: number; color: string}> = ({w, color}) => (
  <>
    <path d={`M${-w * 0.4} 18 L${-w * 0.32} 50 H${w * 0.32} L${w * 0.4} 18 Z`} fill={color} stroke={color} strokeWidth={4} strokeLinejoin="round" />
    <path d={`M${w * 0.1} 18 L${w * 0.12} 50 H${w * 0.32} L${w * 0.4} 18 Z`} fill={SH} />
    <rect x={-w / 2} y={8} width={w} height={14} rx={7} fill={color} />
    <rect x={-w / 2} y={16} width={w} height={6} rx={3} fill={SH} />
    <rect x={-w / 2 + 6} y={10} width={w * 0.35} height={3.5} rx={1.75} fill={HI} />
    <ellipse cx={0} cy={9} rx={w * 0.42} ry={4} fill={C} />
  </>
);

// ANAK = tunas muda di pot kecil.
export const IkonTunas: React.FC = () => (
  <>
    <Pot w={56} color={O} />
    <path d="M0 8 C0 -8 -2 -16 2 -28" stroke={C} strokeWidth={4.5} {...r} />
    <Daun x={0} y={-10} ang={-150} len={30} color={C} />
    <Daun x={1} y={-22} ang={-34} len={34} color={O} />
    <circle cx={2} cy={-31} r={4} fill={C} />
  </>
);

// SAUDARA = dua tunas bersaudara dari satu akar, di pot lebar.
export const IkonCabang: React.FC = () => (
  <>
    <Pot w={84} color={C} />
    <path d="M0 8 C0 -2 -10 -6 -16 -22 M0 8 C0 -2 10 -6 16 -26" stroke={C} strokeWidth={4.5} {...r} />
    <Daun x={-12} y={-14} ang={-160} len={24} color={C} />
    <Daun x={-16} y={-22} ang={-112} len={24} color={O} />
    <Daun x={12} y={-16} ang={-20} len={24} color={C} />
    <Daun x={16} y={-26} ang={-70} len={26} color={O} />
  </>
);

// ORANG TUA = pohon besar berakar: batang bercabang, mahkota daun berlapis, buah kecil.
export const IkonPohon: React.FC = () => (
  <>
    <path d="M-7 50 Q-5 20 -6 -4 H6 Q5 20 7 50 Z" fill={C} />
    <path d="M1 50 Q2 20 2 -4 H6 Q5 20 7 50 Z" fill={SH} />
    <path d="M-7 50 Q-14 46 -22 50 M7 50 Q14 46 22 50" stroke={C} strokeWidth={4} {...r} />
    <path d="M0 10 Q-14 2 -22 -8 M1 4 Q14 -2 20 -12" stroke={C} strokeWidth={4} {...r} />
    <circle cx={-20} cy={-14} r={20} fill={O} />
    <circle cx={20} cy={-16} r={20} fill={O} />
    <circle cx={0} cy={-30} r={24} fill={O} />
    <circle cx={-20} cy={-8} r={14} fill={SH} opacity={0.6} />
    <circle cx={22} cy={-8} r={13} fill={SH} opacity={0.6} />
    <circle cx={-6} cy={-38} r={10} fill={HI} />
    <circle cx={-26} cy={-20} r={6} fill={HI} />
    <circle cx={10} cy={-22} r={3.4} fill={C} />
    <circle cx={-12} cy={-26} r={3.4} fill={C} />
    <circle cx={24} cy={-18} r={3.4} fill={C} />
  </>
);

// PASANGAN = dua cincin bertaut, satu bermata permata berfaset.
export const IkonCincin: React.FC = () => (
  <>
    <circle cx={-13} cy={14} r={24} fill="none" stroke={C} strokeWidth={9} />
    <path d="M-34 6 A24 24 0 0 1 -20 -9" stroke={HI} strokeWidth={3} {...r} />
    <circle cx={14} cy={18} r={24} fill="none" stroke={O} strokeWidth={9} />
    {/* bagian cincin arang yang lewat di depan cincin oranye (bertaut) */}
    <path d="M-4.8 -8.55 A24 24 0 0 1 8.75 3.86" stroke={C} strokeWidth={9} strokeLinecap="butt" fill="none" />
    <path d="M34 28 A24 24 0 0 1 24 40" stroke={SH} strokeWidth={4} {...r} />
    <path d="M-4 10 A24 24 0 0 1 6 -2" stroke={HI} strokeWidth={3} {...r} />
    {/* permata */}
    <g transform="translate(14 -12)">
      <path d="M-6 6 L-9 2 H9 L6 6 Z" fill={O} />
      <path d="M-13 -6 L-7 -14 H7 L13 -6 L0 8 Z" fill={W} stroke={GREY} strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M-13 -6 H13 M-7 -14 L-3 -6 L0 8 M7 -14 L3 -6 L0 8" stroke={GREY} strokeWidth={1.6} {...r} />
      <path d="M-8 -12 L-5 -8" stroke={O} strokeWidth={2} {...r} opacity={0.7} />
    </g>
  </>
);

// PEWARIS = rumah detail: atap genteng berbaris, cerobong, dinding dengan sisi bayangan, jendela menyala berkusen,
// pintu oranye berpanel dengan lubang kunci (tempat kunci masuk), anak tangga.
// Titik acuan: tengah tanah depan pintu (0,0). Lebar ±138, tinggi 204. Lubang kunci di KEYHOLE.
export const KEYHOLE = {x: 0, y: -32};
export const Rumah: React.FC<{lit: number; door: number}> = ({lit, door}) => (
  <>
    {/* cerobong */}
    <rect x={52} y={-188} width={26} height={56} rx={4} fill={C} />
    <rect x={48} y={-194} width={34} height={10} rx={4} fill={C} />
    <rect x={66} y={-186} width={12} height={54} fill={SH} />
    {/* dinding */}
    <rect x={-96} y={-112} width={192} height={112} rx={6} fill={G} stroke="rgba(10,10,10,.16)" strokeWidth={3} />
    <rect x={58} y={-110} width={36} height={108} rx={4} fill="rgba(10,10,10,.06)" />
    {/* atap: bidang arang, baris genteng, sisi bayangan, lis bawah */}
    <path d="M-128 -104 L0 -204 L128 -104 Z" fill={C} stroke={C} strokeWidth={12} strokeLinejoin="round" />
    <path d="M0 -204 L128 -104 L40 -104 Z" fill={SH} />
    {[-176, -152, -128].map((y) => {
      const half = ((y + 204) / 100) * 128;
      return <path key={y} d={`M${-half + 6} ${y} H${half - 6}`} stroke="rgba(254,254,254,.13)" strokeWidth={3} {...r} />;
    })}
    <rect x={-138} y={-110} width={276} height={14} rx={7} fill={C} />
    <rect x={-130} y={-108} width={110} height={3.5} rx={1.75} fill="rgba(254,254,254,.22)" />
    {/* jendela kiri dan kanan */}
    {[-62, 62].map((x) => (
      <g key={x} transform={`translate(${x} -64)`}>
        <rect x={-24} y={-24} width={48} height={44} rx={6} fill={C} />
        <rect x={-18} y={-18} width={36} height={32} rx={3} fill={O} opacity={0.3 + 0.7 * lit} />
        <rect x={-18} y={-18} width={12} height={32} fill={HI} opacity={0.5} />
        <path d="M0 -18 V14 M-18 -2 H18" stroke={C} strokeWidth={4} />
        <rect x={-28} y={18} width={56} height={7} rx={3.5} fill={C} />
      </g>
    ))}
    {/* pintu: kusen arang, cahaya di balik pintu, daun pintu bergeser saat dibuka */}
    <rect x={-30} y={-84} width={60} height={84} rx={10} fill={C} />
    <rect x={-24} y={-78} width={48} height={78} rx={8} fill={W} opacity={lit} />
    <rect x={-24} y={-78} width={48} height={78} rx={8} fill={O} opacity={lit * 0.28} />
    <g transform={`translate(${-24 + 0} 0) scale(${1 - door * 0.55} 1) translate(24 0)`}>
      <rect x={-24} y={-78} width={48} height={78} rx={8} fill={O} />
      <rect x={-17} y={-70} width={34} height={24} rx={5} fill={SH} opacity={0.55} />
      <rect x={-17} y={-40} width={34} height={8} rx={4} fill={SH} opacity={0.0} />
      <rect x={-21} y={-74} width={7} height={70} rx={3.5} fill={HI} opacity={0.55} />
      {/* pelat dan lubang kunci */}
      <rect x={-7} y={-44} width={14} height={26} rx={7} fill={C} />
      <circle cx={0} cy={-35} r={3.4} fill={O} />
      <rect x={-1.4} y={-35} width={2.8} height={9} rx={1.4} fill={O} />
      <circle cx={15} cy={-24} r={3.4} fill={W} opacity={0.85} />
    </g>
    {/* anak tangga */}
    <rect x={-48} y={-4} width={96} height={10} rx={5} fill={C} />
    <rect x={-48} y={2} width={96} height={4} rx={2} fill={SH} />
  </>
);

// Kunci kuningan realistis: gagang berhias tiga lengkung dengan lubang, kerah beralur, batang berkilap, mata kunci bergigi.
// Mengarah ke kanan; titik acuan = ujung mata kunci (masuk lubang kunci). Panjang 196 (gagang ke ujung).
// bit 1..-1 = mata kunci dilihat dari samping; berputar = skala vertikal mengecil lalu terbalik.
export const Kunci: React.FC<{bit?: number}> = ({bit = 1}) => (
  <g transform="translate(-170 0)">
    {[0, 120, 240].map((a) => (
      <circle key={a} cx={Math.cos(((a - 90) * Math.PI) / 180) * 15} cy={Math.sin(((a - 90) * Math.PI) / 180) * 15} r={17} fill={O} />
    ))}
    <circle cx={0} cy={0} r={21} fill={O} />
    <circle cx={5} cy={7} r={18} fill={SH} opacity={0.45} />
    <circle cx={0} cy={0} r={9} fill={W} />
    <circle cx={0} cy={0} r={9} fill="none" stroke={SH} strokeWidth={2.5} />
    <path d="M-26 -8 A28 28 0 0 1 -8 -30" stroke={HI} strokeWidth={4} {...r} />
    {/* kerah */}
    <rect x={26} y={-11} width={10} height={22} rx={4} fill={O} />
    <rect x={40} y={-9} width={8} height={18} rx={3.5} fill={O} />
    <rect x={26} y={4} width={22} height={7} rx={3} fill={SH} opacity={0.6} />
    {/* batang */}
    <rect x={34} y={-6} width={130} height={12} rx={6} fill={O} />
    <rect x={40} y={-4.5} width={116} height={3.5} rx={1.75} fill={HI} />
    <rect x={40} y={2} width={118} height={3.5} rx={1.75} fill={SH} />
    {/* mata kunci bergigi */}
    <g transform={`translate(0 4) scale(1 ${bit})`}>
      <path d="M120 0 V24 H128 V16 H136 V28 H144 V18 H152 V10 H158 V0 Z" fill={O} stroke={O} strokeWidth={3} strokeLinejoin="round" />
      <path d="M120 0 H158 V5 H120 Z" fill={SH} opacity={0.6} />
    </g>
  </g>
);

// Gantungan label kertas pada kunci (tanpa kotak bingkai: bentuk label kertas bersudut potong dengan lubang tali).
export const LabelGantung: React.FC<{text: string; w: number}> = ({text, w}) => (
  <>
    <path d={`M18 -20 H${w} Q${w + 6} -20 ${w + 6} -14 V14 Q${w + 6} 20 ${w} 20 H18 L0 6 V-6 Z`} fill={W} stroke="rgba(10,10,10,.16)" strokeWidth={2.5} strokeLinejoin="round" />
    <path d={`M18 14 H${w} Q${w + 6} 14 ${w + 6} 8 V14 Q${w + 6} 20 ${w} 20 H18 L10 14 Z`} fill="rgba(10,10,10,.05)" />
    <circle cx={14} cy={0} r={4.5} fill="none" stroke={GREY} strokeWidth={2.5} />
    <text x={(w + 30) / 2} y={6} textAnchor="middle" fontFamily='"Montserrat", sans-serif' fontWeight={800} fontSize={16} letterSpacing={1.6} fill={O}>
      {text}
    </text>
  </>
);

// Gembok realistis: lengkung baja tebal berkilap, badan merah dengan pinggir timbul, paku keling, pelat lubang kunci
// berlubang dalam. closed 0..1: lengkung terangkat dan berputar saat terbuka. Titik acuan = tengah bawah badan; tinggi ±104.
export const Gembok: React.FC<{closed: number; color?: string}> = ({closed, color = T.red}) => {
  const open = 1 - closed;
  return (
    <>
      <g transform={`translate(0 ${-open * 20}) rotate(${-open * 26} 22 -52)`}>
        <path d="M-22 -54 V-74 a22 22 0 0 1 44 0 V-54" stroke={GREY} strokeWidth={13} {...r} />
        <path d="M-26 -58 V-74 a26 26 0 0 1 20 -25.3" stroke="rgba(254,254,254,.85)" strokeWidth={3} {...r} />
        <path d="M27.5 -56 V-74 a27.5 27.5 0 0 0 -9 -20.5" stroke="rgba(10,10,10,.28)" strokeWidth={3} {...r} />
      </g>
      <rect x={-40} y={-60} width={80} height={60} rx={14} fill={color} />
      <rect x={-36} y={-58} width={72} height={9} rx={4.5} fill={HI} opacity={0.7} />
      <rect x={-40} y={-14} width={80} height={14} rx={7} fill={SH} />
      <rect x={-32} y={-48} width={6} height={34} rx={3} fill={HI} />
      <rect x={-40} y={-60} width={80} height={60} rx={14} fill="none" stroke="rgba(10,10,10,.18)" strokeWidth={2.5} />
      {[[-30, -48], [30, -48], [-30, -10], [30, -10]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={2.6} fill="rgba(254,254,254,.7)" />
      ))}
      <circle cx={0} cy={-34} r={12} fill="rgba(10,10,10,.22)" />
      <circle cx={0} cy={-36} r={6} fill={C} />
      <path d="M-3.5 -34 L-5 -21 H5 L3.5 -34 Z" fill={C} />
      <circle cx={-2} cy={-38} r={1.8} fill="rgba(254,254,254,.6)" />
    </>
  );
};

export const Centang: React.FC<{r?: number; color?: string}> = ({r: rr = 18, color = T.green}) => (
  <>
    <circle cx={0} cy={0} r={rr} fill={color} />
    <path d={`M${-rr * 0.42} ${rr * 0.04} l${rr * 0.28} ${rr * 0.28} l${rr * 0.56} ${-rr * 0.6}`} fill="none" stroke={W} strokeWidth={rr * 0.2} strokeLinecap="round" strokeLinejoin="round" />
  </>
);

export const Silang: React.FC<{r?: number; color?: string}> = ({r: rr = 18, color = T.red}) => (
  <>
    <circle cx={0} cy={0} r={rr} fill={color} />
    <path d={`M${-rr * 0.36} ${-rr * 0.36} L${rr * 0.36} ${rr * 0.36} M${rr * 0.36} ${-rr * 0.36} L${-rr * 0.36} ${rr * 0.36}`} stroke={W} strokeWidth={rr * 0.2} strokeLinecap="round" />
  </>
);
