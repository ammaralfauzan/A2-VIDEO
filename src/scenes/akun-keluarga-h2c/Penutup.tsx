import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {BTN, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {P, SCR} from './layout';

// Penutup: isi layar monitor membesar mengisi bingkai; logo lingkaran asli + nama + pita, lalu tombol emas umroh.h2c.or.id.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const a = P.outro;
  if (f < a) return null;
  const g = interpolate(f, [a, a + 16], [0, 1], {...clamp, easing: ease});
  // bingkai tumbuh dari kira-kira posisi layar (kamera "out") ke layar penuh
  const sx = 0.62 + 0.38 * g;
  const s = (k: number) => {
    const p = interpolate(f, [a + 8 + k * 6, a + 20 + k * 6], [0, 1], {...clamp, easing: ease});
    return {opacity: p, transform: `translateY(${(1 - p) * 24}px)`};
  };
  const bp = interpolate(f, [P.button, P.button + 8, P.button + 12], [0, 1.08, 1], clamp);
  const glow = interpolate(f, [P.button + 12, P.button + 40], [0, 1], clamp);
  void SCR;
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: U.bg, opacity: g, transform: `scale(${sx})`, transformOrigin: '480px 760px', borderRadius: 60 * (1 - g)}}>
        <div style={{position: 'absolute', left: -300, top: -260, width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,56,.85) 0%, rgba(10,31,23,0) 70%)'}} />
        <div style={{position: 'absolute', right: -260, bottom: 160, width: 640, height: 640, borderRadius: '50%', border: `2px solid ${U.goldLine}`, opacity: 0.45, transform: `rotate(${f * 0.05}deg)`}} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 470, width: 840, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 250, height: 250, borderRadius: '50%', border: `4px solid ${U.goldLine}`, boxShadow: '0 30px 80px -30px rgba(0,0,0,.7)', ...s(0)}} />
        <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 44, color: U.ivory, marginTop: 40, ...s(1)}}>H2C Wisata Mandiri</div>
        <div style={{...s(2)}}>
          <div style={{...RIBBON, fontFamily: UF.script, fontSize: 58, lineHeight: 1, padding: '6px 34px 14px', marginTop: 30}}>Umroh Aman &amp; Amanah</div>
        </div>
        <div
          style={{
            ...BTN,
            marginTop: 70,
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
    </>
  );
};
