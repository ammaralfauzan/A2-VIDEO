import React from 'react';
import {leafRadius, T} from '../../brands/tams-consulting/theme';

// Ilustrasi benda (bidang rata, tanpa orang, tanpa wajah) di atas ubin terang bersudut-daun.
// m = warna garis/isi utama, a = warna aksen, p = kertas/kain putih.
export type IkonNama = 'kain' | 'tagihan' | 'amplop' | 'rumah' | 'koin' | 'kunci';
type Warna = {m: string; a: string};

const P = T.onDark;

const Gambar: React.FC<{nama: IkonNama} & Warna> = ({nama, m, a}) => {
  switch (nama) {
    case 'kain': // kain kafan terlipat + sekop (perawatan dan pemakaman)
      return (
        <>
          <rect x={8} y={62} width={56} height={18} rx={4} fill={P} stroke={m} strokeWidth={4} />
          <rect x={12} y={44} width={48} height={18} rx={4} fill={P} stroke={m} strokeWidth={4} />
          <rect x={16} y={26} width={40} height={18} rx={4} fill={P} stroke={m} strokeWidth={4} />
          <rect x={44} y={26} width={7} height={54} fill={a} />
          <g transform="rotate(28 78 50)">
            <rect x={75} y={8} width={6} height={52} rx={2} fill={m} />
            <rect x={68} y={6} width={20} height={7} rx={3} fill={m} />
            <path d="M66 60 H90 V74 Q78 94 66 74 Z" fill={a} stroke={m} strokeWidth={3.5} strokeLinejoin="round" />
          </g>
        </>
      );
    case 'tagihan': // lembar tagihan + koin pelunasan
      return (
        <>
          <rect x={22} y={12} width={52} height={74} rx={5} fill={P} stroke={m} strokeWidth={4} />
          <rect x={30} y={22} width={36} height={9} rx={2} fill={a} />
          <rect x={30} y={40} width={36} height={5} rx={2} fill={m} />
          <rect x={30} y={52} width={36} height={5} rx={2} fill={m} />
          <rect x={30} y={64} width={22} height={5} rx={2} fill={m} />
          <circle cx={72} cy={72} r={16} fill={a} stroke={m} strokeWidth={4} />
          <circle cx={72} cy={72} r={7} fill="none" stroke={P} strokeWidth={3} />
        </>
      );
    case 'amplop': // amplop wasiat bersegel + pena
      return (
        <>
          <rect x={10} y={26} width={72} height={52} rx={5} fill={P} stroke={m} strokeWidth={4} />
          <path d="M10 30 L46 56 L82 30" fill="none" stroke={m} strokeWidth={4} strokeLinejoin="round" />
          <circle cx={46} cy={56} r={10} fill={a} />
          <g transform="rotate(35 78 70)">
            <rect x={74} y={44} width={9} height={36} rx={3} fill={m} />
            <polygon points="74,80 83,80 78.5,90" fill={a} />
          </g>
        </>
      );
    case 'rumah': // rumah (harta tak bergerak / ahli waris)
      return (
        <>
          <rect x={64} y={18} width={10} height={20} fill={m} />
          <rect x={20} y={46} width={60} height={42} fill={P} stroke={m} strokeWidth={4} />
          <polygon points="50,12 92,48 8,48" fill={a} stroke={m} strokeWidth={4} strokeLinejoin="round" />
          <rect x={42} y={62} width={16} height={26} fill={m} />
        </>
      );
    case 'koin': // tumpukan koin
      return (
        <>
          <rect x={20} y={72} width={60} height={14} rx={7} fill={a} stroke={m} strokeWidth={3.5} />
          <rect x={20} y={58} width={60} height={14} rx={7} fill={P} stroke={m} strokeWidth={3.5} />
          <rect x={20} y={44} width={60} height={14} rx={7} fill={a} stroke={m} strokeWidth={3.5} />
          <ellipse cx={50} cy={34} rx={30} ry={12} fill={P} stroke={m} strokeWidth={3.5} />
          <ellipse cx={50} cy={34} rx={14} ry={5} fill="none" stroke={a} strokeWidth={3} />
        </>
      );
    case 'kunci':
      return (
        <>
          <circle cx={30} cy={50} r={17} fill="none" stroke={a} strokeWidth={10} />
          <rect x={44} y={45} width={46} height={10} rx={3} fill={m} />
          <rect x={72} y={55} width={8} height={14} rx={2} fill={m} />
          <rect x={84} y={55} width={7} height={10} rx={2} fill={m} />
        </>
      );
  }
};

export const Ikon: React.FC<{nama: IkonNama; size: number; m?: string; a?: string; tile?: string}> = ({nama, size, m = T.charcoal, a = T.orange, tile = T.bg2}) => (
  <div style={{width: size, height: size, borderRadius: leafRadius(Math.round(size * 0.34)), background: tile, border: `2px solid ${T.line}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 100 100">
      <Gambar nama={nama} m={m} a={a} />
    </svg>
  </div>
);
