import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {BIG_GRADIENT, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {P} from './layout';

// Judul pembuka, kartu bagian bernomor besar (1 DAFTAR, 2 MASUK), kartu "DAFTAR selesai", dan chip bagian di atas.
const big: React.CSSProperties = {
  fontFamily: UF.big,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  background: BIG_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: 0.95,
};
const center: React.CSSProperties = {position: 'absolute', left: 180, width: 720, display: 'flex', flexDirection: 'column', alignItems: 'center'};

// Masuk bertahap (stagger) dengan ease-out lembut, keluar memudar.
const stag = (f: number, start: number, k: number, end: number) => {
  const p = interpolate(f, [start + k * 5, start + k * 5 + 10], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [end - 8, end], [1, 0], clamp);
  return {opacity: p * o, transform: `translateY(${(1 - p) * 26}px) scale(${0.96 + 0.04 * p})`};
};

// Versi F: "Daftar online itu ribet?" lalu cap "Salah!" saat diucapkan, lalu pita "Bapak, Ibu juga bisa".
export const Hook: React.FC<{f: number}> = ({f}) => {
  if (f > P.hookOut + 2) return null;
  const end = P.hookOut;
  const strike = interpolate(f, [P.hookSalah, P.hookSalah + 6], [0, 1], {...clamp, easing: ease});
  const stamp = interpolate(f, [P.hookSalah + 2, P.hookSalah + 8, P.hookSalah + 12], [0, 1.12, 1], clamp);
  const out = interpolate(f, [end - 8, end], [1, 0], clamp);
  return (
    <div style={{...center, top: 330}}>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 150, height: 150, borderRadius: '50%', border: `3px solid ${U.goldLine}`, ...stag(f, 0, 0, end)}} />
      <div style={{fontFamily: UF.script, fontSize: 96, lineHeight: 1.1, color: U.ivory, marginTop: 24, padding: '0 10px', ...stag(f, 0, 1, end)}}>Daftar online itu</div>
      <div style={{position: 'relative', ...stag(f, 0, 2, end)}}>
        <div style={{...big, fontSize: 170, opacity: 1 - 0.55 * strike}}>Ribet?</div>
        <div style={{position: 'absolute', left: -10, right: -10, top: '48%', height: 12, borderRadius: 6, background: U.ivory, transformOrigin: 'left center', transform: `scaleX(${strike}) rotate(-4deg)`}} />
      </div>
      <div style={{...big, fontSize: 190, marginTop: 10, opacity: Math.min(1, stamp) * out, transform: `rotate(-4deg) scale(${stamp})`}}>Salah!</div>
      <div style={{...stag(f, P.hookRibbon, 0, end)}}>
        <div style={{...RIBBON, fontFamily: UF.script, fontSize: 60, lineHeight: 1, padding: '6px 34px 14px', marginTop: 30}}>Bapak, Ibu juga bisa</div>
      </div>
    </div>
  );
};

const Bagian: React.FC<{f: number; range: [number, number]; n: string; word: string; ribbon: string}> = ({f, range, n, word, ribbon}) => {
  const [a, b] = range;
  if (f < a - 1 || f > b + 1) return null;
  return (
    <div style={{...center, top: 470}}>
      <div style={{fontFamily: UF.display, fontWeight: 700, fontSize: 300, lineHeight: 1, color: U.goldLight, ...stag(f, a + 6, 0, b)}}>{n}</div>
      <div style={{...big, fontSize: 180, ...stag(f, a + 6, 1, b)}}>{word}</div>
      <div style={{...stag(f, a + 6, 2, b)}}>
        <div style={{...RIBBON, fontFamily: UF.script, fontSize: 60, lineHeight: 1, padding: '6px 34px 14px', marginTop: 34}}>{ribbon}</div>
      </div>
    </div>
  );
};

export const Bagian1: React.FC<{f: number}> = ({f}) => <Bagian f={f} range={P.sec1} n="1" word="Daftar" ribbon="sekali saja" />;
export const Bagian2: React.FC<{f: number}> = ({f}) => <Bagian f={f} range={P.sec2} n="2" word="Masuk" ribbon="tanpa kode lagi" />;

export const Selesai: React.FC<{f: number}> = ({f}) => {
  const [a, b] = P.done;
  if (f < a - 1 || f > b + 1) return null;
  const pop = interpolate(f, [a + 6, a + 14, a + 18], [0, 1.1, 1], clamp);
  return (
    <div style={{...center, top: 520}}>
      <div style={{...stag(f, a + 6, 0, b)}}>
        <div style={{width: 250, height: 250, borderRadius: '50%', background: U.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`, boxShadow: '0 0 0 22px rgba(140,198,63,.18)'}}>
          <svg width={150} height={150} viewBox="0 0 24 24">
            <path d="M5 12.5 L10 17 L19 7" fill="none" stroke={U.bg} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{...big, fontSize: 170, marginTop: 70, ...stag(f, a + 6, 1, b)}}>Daftar</div>
      <div style={{...stag(f, a + 6, 2, b)}}>
        <div style={{...RIBBON, fontFamily: UF.script, fontSize: 64, lineHeight: 1, padding: '6px 40px 14px', marginTop: 30}}>selesai</div>
      </div>
    </div>
  );
};

// Chip penanda bagian di atas jendela (y 228–288).
export const ChipBagian: React.FC<{f: number}> = ({f}) => {
  const show1 = interpolate(f, [P.sec1[1] - 4, P.sec1[1] + 6, P.done[0] - 6, P.done[0]], [0, 1, 1, 0], clamp);
  const show2 = interpolate(f, [P.sec2[1] - 4, P.sec2[1] + 6, P.outro - 6, P.outro], [0, 1, 1, 0], clamp);
  const chip = (o: number, n: string, label: string) =>
    o > 0 ? (
      <div style={{position: 'absolute', left: 180, top: 228, width: 720, display: 'flex', justifyContent: 'center', opacity: o}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 28px 10px 12px', borderRadius: 999, border: `2px solid ${U.goldLine}`, background: U.bg2, fontFamily: UF.text, fontWeight: 700, fontSize: 26, color: U.ivory}}>
          <span style={{width: 38, height: 38, borderRadius: '50%', background: U.gold, color: U.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24}}>{n}</span>
          {label}
        </div>
      </div>
    ) : null;
  return (
    <>
      {chip(show1, '1', 'DAFTAR')}
      {chip(show2, '2', 'MASUK')}
    </>
  );
};
