import React from 'react';
import {T} from '../../brands/tams-consulting/theme';
import {C, O, W} from '../wasiat-maksimal-sepertiga/Ilustrasi';

// Ikon benda untuk diagram waris (Tams: bidang rata, ujung bulat, tanpa makhluk bernyawa; tumbuhan dan benda boleh).
// Semua digambar di sekitar (0,0), kira-kira 56x56. `tone` mengganti arang dengan warna lain (mis. abu saat terkunci).

type IkonProps = {tone?: string; accent?: string};

// ANAK = tunas muda.
export const IkonTunas: React.FC<IkonProps> = ({tone = C, accent = O}) => (
  <>
    <path d="M0 26 V-2" stroke={tone} strokeWidth={6} strokeLinecap="round" fill="none" />
    <path d="M0 4 C-4 -14 -16 -22 -30 -20 C-30 -4 -18 6 0 4 Z" fill={tone} stroke={tone} strokeWidth={4} strokeLinejoin="round" />
    <path d="M0 -4 C4 -22 16 -30 30 -28 C30 -12 18 -2 0 -4 Z" fill={accent} stroke={accent} strokeWidth={4} strokeLinejoin="round" />
  </>
);

// SAUDARA = satu batang bercabang dua.
export const IkonCabang: React.FC<IkonProps> = ({tone = C, accent = O}) => (
  <>
    <path d="M0 28 V10 M0 10 Q0 -6 -18 -6 M0 10 Q0 -6 18 -6" stroke={tone} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx={-18} cy={-16} r={11} fill={tone} />
    <circle cx={18} cy={-16} r={11} fill={accent} />
  </>
);

// ORANG TUA = pohon cemara bertingkat berakar kuat.
export const IkonPohon: React.FC<IkonProps> = ({tone = C, accent = O}) => (
  <>
    <rect x={-5} y={16} width={10} height={14} rx={5} fill={tone} />
    <path d="M0 -24 L-17 -2 H17 Z" fill={tone} stroke={tone} strokeWidth={8} strokeLinejoin="round" />
    <path d="M0 -8 L-22 20 H22 Z" fill={accent} stroke={accent} strokeWidth={8} strokeLinejoin="round" />
  </>
);

// PASANGAN = dua cincin saling terkait.
export const IkonCincin: React.FC<IkonProps> = ({tone = C, accent = O}) => (
  <>
    <circle cx={-12} cy={0} r={17} fill="none" stroke={tone} strokeWidth={7} />
    <circle cx={12} cy={0} r={17} fill="none" stroke={accent} strokeWidth={7} />
  </>
);

// PEWARIS = rumah (harta) dengan pintu oranye, putih di atas arang.
export const IkonRumah: React.FC = () => (
  <>
    <path d="M-28 2 L0 -24 L28 2" fill="none" stroke={W} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={-19} y={0} width={38} height={28} rx={9} fill={W} />
    <rect x={-6} y={10} width={12} height={18} rx={5} fill={O} />
  </>
);

// Gembok: badan bulat, lengkung (shackle) tebal berujung bulat, lubang kunci, kilap tipis. Titik acuan = tengah bawah badan.
// closed 0..1: lengkung naik dan miring saat terbuka. Tinggi total ±86.
export const Gembok: React.FC<{closed: number; color?: string}> = ({closed, color = C}) => {
  const open = 1 - closed;
  return (
    <>
      <g transform={`translate(${open * 10} ${-open * 16}) rotate(${open * 14} 19 -48)`}>
        <path d="M-19 -46 V-62 a19 19 0 0 1 38 0 V-46" fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x={-34} y={-48} width={68} height={48} rx={16} fill={color} />
      <rect x={-26} y={-40} width={6} height={30} rx={3} fill={W} opacity={0.22} />
      <circle cx={0} cy={-29} r={7} fill={W} />
      <rect x={-3} y={-28} width={6} height={13} rx={3} fill={W} />
    </>
  );
};

// Kunci: gagang cincin, batang, dua gigi bulat, kilap tipis. Berujung ke kanan; titik acuan = tengah gagang.
export const Kunci: React.FC<{color?: string}> = ({color = O}) => (
  <>
    <circle cx={0} cy={0} r={27} fill="none" stroke={color} strokeWidth={14} />
    <rect x={26} y={-8} width={102} height={16} rx={8} fill={color} />
    <rect x={92} y={4} width={13} height={26} rx={6.5} fill={color} />
    <rect x={112} y={4} width={13} height={19} rx={6.5} fill={color} />
    <path d="M-17 -16 A24 24 0 0 1 4 -24" fill="none" stroke={W} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
  </>
);

export const Centang: React.FC<{r?: number; color?: string}> = ({r = 18, color = T.green}) => (
  <>
    <circle cx={0} cy={0} r={r} fill={color} />
    <path d={`M${-r * 0.42} ${r * 0.04} l${r * 0.28} ${r * 0.28} l${r * 0.56} ${-r * 0.6}`} fill="none" stroke={W} strokeWidth={r * 0.2} strokeLinecap="round" strokeLinejoin="round" />
  </>
);

export const Silang: React.FC<{r?: number; color?: string}> = ({r = 18, color = T.red}) => (
  <>
    <circle cx={0} cy={0} r={r} fill={color} />
    <path d={`M${-r * 0.36} ${-r * 0.36} L${r * 0.36} ${r * 0.36} M${r * 0.36} ${-r * 0.36} L${-r * 0.36} ${r * 0.36}`} stroke={W} strokeWidth={r * 0.2} strokeLinecap="round" />
  </>
);
