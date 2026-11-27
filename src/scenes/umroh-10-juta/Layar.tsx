import React from 'react';
import {Img, staticFile} from 'remotion';
import {BTN, CARD, U, UF} from '../../brands/h2c-umroh/theme';
import {big} from './Hook';
import {inP, pop, rise, win} from './anim';
import {P} from './layout';

// Layar H2C (replika berlabel "contoh"; isi situs asli menyusul): HP di tengah, chip "mulai Rp500.000" menyala emas.
export const Layar: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.phone, 14, 10);
  if (v <= 0.001) return null;
  const enter = inP(f, P.phone[0], 16);
  const s = (k: number) => rise(inP(f, P.phone[0] + 8 + k * 5, 12), 18);
  const chip = pop(f, P.chip500);
  const glow = inP(f, P.chip500 + 8, 20);
  return (
    <div style={{position: 'absolute', left: 320, top: 290, width: 440, height: 760, opacity: v, transform: `translateY(${(1 - enter) * 140}px) scale(${0.94 + 0.06 * enter})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 64, background: U.bg2, border: `3px solid ${U.goldLine}`, boxShadow: '0 60px 120px -40px rgba(0,0,0,.75)', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 160, top: 18, width: 120, height: 30, borderRadius: 999, background: U.bg}} />
        {/* kepala situs */}
        <div style={{position: 'absolute', left: 32, top: 74, right: 32, display: 'flex', alignItems: 'center', gap: 14, ...s(0)}}>
          <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 56, height: 56, borderRadius: '50%'}} />
          <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 22, color: U.ivory, flex: 1}}>H2C Wisata Mandiri</div>
          <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 18, color: U.sage, padding: '4px 12px', borderRadius: 999, border: `1.5px solid ${U.line}`}}>contoh</div>
        </div>
        {/* judul paket */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 176, display: 'flex', flexDirection: 'column', alignItems: 'center', ...s(1)}}>
          <div style={{fontFamily: UF.script, fontSize: 60, color: U.goldLight, lineHeight: 1}}>Paket</div>
          <div style={{...big, fontSize: 76}}>Hajar Aswad</div>
        </div>
        {/* kartu promo */}
        <div style={{position: 'absolute', left: 32, right: 32, top: 360, padding: '30px 28px', ...CARD, borderRadius: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, ...s(2)}}>
          <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 24, color: U.sage, letterSpacing: 2}}>UNDIAN UMROH</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 26px',
              borderRadius: 999,
              border: `2px solid ${chip > 0 ? U.gold : U.goldLine}`,
              background: chip > 0 ? `rgba(212,175,106,${0.1 + 0.12 * glow})` : 'transparent',
              transform: `scale(${chip > 0 ? chip : 1})`,
              boxShadow: `0 0 0 ${12 * glow}px rgba(212,175,106,${0.14 * glow})`,
            }}
          >
            <span style={{width: 14, height: 14, borderRadius: '50%', background: U.gold}} />
            <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 28, whiteSpace: 'nowrap', color: chip > 0 ? U.goldLight : U.ivory2}}>mulai Rp500.000</span>
          </div>
          <div style={{display: 'flex', gap: 10}}>
            {['Silver', 'Gold', 'Platinum', 'Diamond'].map((n) => (
              <div key={n} style={{fontFamily: UF.text, fontWeight: 700, fontSize: 16, color: U.ivory2, padding: '6px 10px', borderRadius: 999, background: U.surface2}}>
                {n}
              </div>
            ))}
          </div>
        </div>
        <div style={{position: 'absolute', left: 32, right: 32, top: 620, ...BTN, padding: '22px 0', textAlign: 'center', fontFamily: UF.text, fontWeight: 700, fontSize: 28, ...s(3)}}>Ambil paket</div>
      </div>
    </div>
  );
};
