import React from 'react';
import {interpolate} from 'remotion';
import {RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {inP, pop, rise} from '../umroh-10-juta/anim';
import {COL, P, STAGE} from './layout';
import {big, Tiket} from './Web';

// Halaman di panggung: masuk dari kanan, keluar ke kiri (seperti pindah halaman di HP).
const Halaman: React.FC<{f: number; r: [number, number]; children: React.ReactNode}> = ({f, r, children}) => {
  if (f < r[0] - 1 || f > r[1] + 12) return null;
  const a = interpolate(f, [r[0], r[0] + 12], [1, 0], {...clamp, easing: ease});
  const b = interpolate(f, [r[1], r[1] + 12], [0, 1], {...clamp, easing: ease});
  return <div style={{position: 'absolute', inset: 0, opacity: (1 - a) * (1 - b), transform: `translateX(${a * 140 - b * 140}px)`}}>{children}</div>;
};

const Judul: React.FC<{kecil: string; skrip?: string; besar: string; y: number; p: number}> = ({kecil, skrip, besar, y, p}) => (
  <div style={{position: 'absolute', left: COL.x, width: COL.w, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', ...rise(p, 20)}}>
    <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: U.gold}}>✦ {kecil} ✦</div>
    {skrip ? <div style={{fontFamily: UF.script, fontSize: 84, color: U.ivory, lineHeight: 1.15}}>{skrip}</div> : null}
    <div style={{...big, fontSize: 118}}>{besar}</div>
  </div>
);

// ---------- Pembuka: judul, dua paket, lima titik ----------
export const Pembuka: React.FC<{f: number}> = ({f}) => {
  const out = 1 - inP(f, P.hook[1], 10);
  if (out <= 0.001) return null;
  const t = inP(f, P.titleIn, 14);
  const c = (k: number) => inP(f, P.cards + k * 6, 14);
  const rb = pop(f, P.ribbon);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out, transform: `translateX(${-(1 - out) * 140}px)`}}>
      <Judul kecil="PROMO UMROH" skrip="Paket" besar="Hajar Aswad" y={STAGE.y + 10} p={t} />
      {[0, 1].map((k) => (
        <div key={k} style={{position: 'absolute', left: COL.x + 15 + k * 375, top: 760, ...rise(c(k), 80), transform: `${rise(c(k), 80).transform} rotate(${(k ? 1.5 : -1.5) * c(k)}deg)`}}>
          <Tiket jenis={k ? 'premium' : 'standar'} w={345} />
        </div>
      ))}
      {rb > 0 ? (
        <div style={{position: 'absolute', left: COL.cx - 190, top: 700, width: 380, padding: '14px 0', textAlign: 'center', ...RIBBON, fontFamily: UF.text, fontWeight: 800, fontSize: 36, transform: `${RIBBON.transform} scale(${rb})`}}>HARGA SPESIAL</div>
      ) : null}
    </div>
  );
};

export const Ikon: React.FC<{id: string; size: number; color: string}> = ({id, size, color}) => {
  const st = {fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {id === 'beranda' ? <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" {...st} /> : null}
      {id === 'paket' ? (
        <>
          <path d="M5 8h14l-1 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z" {...st} />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" {...st} />
        </>
      ) : null}
      {id === 'pesanan' ? (
        <>
          <rect x="5" y="3" width="14" height="18" rx="2" {...st} />
          <path d="M9 8h6M9 12h6M9 16h4" {...st} />
        </>
      ) : null}
      {id === 'akun' ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" {...st} />
          <path d="M7 10h6M7 14h10" {...st} />
        </>
      ) : null}
      {id === 'simpan' ? <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" {...st} /> : null}
      {id === 'kalender' ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" {...st} />
          <path d="M3 10h18M8 3v4M16 3v4" {...st} />
        </>
      ) : null}
    </svg>
  );
};
