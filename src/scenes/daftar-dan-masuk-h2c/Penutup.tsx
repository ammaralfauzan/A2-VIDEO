import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {BTN, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {P} from './layout';
import {wf} from '../../data/timeline-daftar-dan-masuk-h2c';

// Penutup: logo lingkaran asli + nama + pita, lalu tombol emas umroh.h2c.or.id (ajakan dari Brand Kit).
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const a = P.outro;
  if (f < a) return null;
  const s = (k: number) => {
    const p = interpolate(f, [a + 6 + k * 6, a + 18 + k * 6], [0, 1], {...clamp, easing: ease});
    return {opacity: p, transform: `translateY(${(1 - p) * 24}px)`};
  };
  const btnAt = wf(30, 6) - 4;
  const bp = interpolate(f, [btnAt, btnAt + 8, btnAt + 12], [0, 1.08, 1], clamp);
  const glow = interpolate(f, [btnAt + 12, btnAt + 40], [0, 1], clamp);
  const promoAt = wf(30, 2) - 4;
  const pp = interpolate(f, [promoAt, promoAt + 10], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', left: 180, top: 520, width: 720, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 250, height: 250, borderRadius: '50%', border: `4px solid ${U.goldLine}`, boxShadow: '0 30px 80px -30px rgba(0,0,0,.7)', ...s(0)}} />
      <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 44, color: U.ivory, marginTop: 40, ...s(1)}}>H2C Wisata Mandiri</div>
      <div style={{...s(2)}}>
        <div style={{...RIBBON, fontFamily: UF.script, fontSize: 58, lineHeight: 1, padding: '6px 34px 14px', marginTop: 30}}>Umroh Aman &amp; Amanah</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 56, padding: '12px 30px 12px 22px', borderRadius: 999, border: `2px solid ${U.goldLine}`, background: U.bg2, fontFamily: UF.text, fontWeight: 700, fontSize: 32, color: U.goldLight, letterSpacing: 1, opacity: pp, transform: `translateY(${(1 - pp) * 16}px)`}}>
        <span style={{width: 14, height: 14, borderRadius: '50%', background: U.gold, boxShadow: '0 0 0 7px rgba(212,175,106,.25)'}} />
        ADA PROMO UMROH
      </div>
      <div
        style={{
          ...BTN,
          marginTop: 34,
          padding: '30px 64px',
          fontFamily: UF.text,
          fontWeight: 700,
          fontSize: 46,
          opacity: Math.min(1, bp),
          transform: `scale(${bp})`,
          boxShadow: `0 20px 44px -18px rgba(212,175,106,.6), 0 0 0 ${10 * glow}px rgba(212,175,106,${0.18 * glow})`,
        }}
      >
        umroh.h2c.or.id
      </div>
    </div>
  );
};
