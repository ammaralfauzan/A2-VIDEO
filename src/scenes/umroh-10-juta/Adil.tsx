import React from 'react';
import {interpolate} from 'remotion';
import {CARD, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp} from '../../components/motion';
import {inP, pop, rise, win} from './anim';
import {P} from './layout';

const Centang: React.FC<{size: number; p: number}> = ({size, p}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{display: 'block'}}>
    <circle cx="24" cy="24" r="22" fill={U.leaf} />
    <path d="M14 25 L21 32 L35 17" fill="none" stroke={U.bg} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={40} strokeDashoffset={40 * (1 - p)} />
  </svg>
);

const Hadiah: React.FC = () => (
  <svg width={110} height={110} viewBox="0 0 110 110" style={{display: 'block'}}>
    <rect x="14" y="44" width="82" height="58" rx="8" fill={U.gold} />
    <rect x="8" y="30" width="94" height="20" rx="6" fill={U.goldLight} />
    <rect x="49" y="30" width="12" height="72" fill={U.goldDeep} />
    <path d="M55 30 C40 8 20 16 30 28 C34 32 46 31 55 30 Z" fill="none" stroke={U.goldLight} strokeWidth={6} strokeLinejoin="round" />
    <path d="M55 30 C70 8 90 16 80 28 C76 32 64 31 55 30 Z" fill="none" stroke={U.goldLight} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

// "Tabungan tidak dikurangi": kartu tabungan jamaah tetap utuh (bilah penuh + centang), kartu hadiah
// pemenang muncul terpisah di sampingnya, lalu lencana Halal.
export const Adil: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.fair, 12, 10);
  if (v <= 0.001) return null;
  const a = rise(inP(f, P.fair[0], 14), 40);
  const u = inP(f, P.utuh, 12);
  const h = inP(f, P.hadiah, 14);
  const hl = pop(f, P.halal);
  // bilah tabungan "dicoba dikurangi" sebentar lalu kembali penuh: menegaskan tidak berkurang
  const dip = interpolate(f, [P.utuh - 20, P.utuh - 10, P.utuh], [0, 0.18, 0], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v}}>
      <div style={{position: 'absolute', left: 180, top: 330, width: 340, height: 560, ...CARD, borderRadius: 36, padding: '0 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...a}}>
        <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 24, color: U.sage, letterSpacing: 1.5}}>TABUNGAN JAMAAH</div>
        <div style={{fontFamily: UF.display, fontSize: 58, color: U.ivory, marginTop: 40, lineHeight: 1}}>Rp1.000.000</div>
        <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 16, color: U.sage, marginTop: 14, padding: '2px 10px', borderRadius: 999, border: `1.5px solid ${U.line}`}}>contoh</div>
        <div style={{width: 260, height: 18, borderRadius: 999, background: U.bg, marginTop: 34, overflow: 'hidden'}}>
          <div style={{width: `${100 * (1 - dip)}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${U.gold}, ${U.leaf})`}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 50, opacity: u, transform: `translateY(${(1 - u) * 12}px)`}}>
          <Centang size={44} p={u} />
          <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 30, color: U.leafLight}}>tetap utuh</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 560, top: 330, width: 340, height: 560, borderRadius: 36, background: U.surface2, border: `3px solid ${U.gold}`, boxShadow: `0 40px 100px -40px rgba(0,0,0,.6), 0 0 0 ${10 * h}px rgba(212,175,106,${0.12 * h})`, padding: '0 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: h, transform: `translateX(${(1 - h) * 60}px) scale(${0.94 + 0.06 * h})`}}>
        <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 24, color: U.goldLight, letterSpacing: 1.5}}>HADIAH PEMENANG</div>
        <div style={{marginTop: 50, transform: `rotate(${Math.sin(f / 10) * 3 * h}deg)`}}>
          <div style={{transform: 'scale(1.35)'}}><Hadiah /></div>
        </div>
        <div style={{fontFamily: UF.text, fontWeight: 600, fontSize: 28, color: U.ivory2, marginTop: 50, textAlign: 'center', lineHeight: 1.3}}>terpisah dari tabungan</div>
      </div>
      <div style={{position: 'absolute', left: 180, top: 1000, width: 720, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 40px 16px 20px', borderRadius: 999, background: U.bg2, border: `2px solid ${U.leaf}`, opacity: Math.min(1, hl), transform: `scale(${hl})`}}>
          <Centang size={76} p={inP(f, P.halal + 4, 12)} />
          <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 60, color: U.ivory}}>Halal</span>
        </div>
      </div>
    </div>
  );
};
