import React from 'react';
import {interpolate} from 'remotion';
import {CARD, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {inP, pop, win} from './anim';
import {P, TIERS} from './layout';

// Warna bingkai per tingkat (dari token saja): perak = sage, emas = gold, platinum = gading, diamond = emas terang.
export const TIER_COLOR = [U.sage, U.gold, U.ivory2, U.goldLight] as const;

// Koin pemenang (bintang emas) berputar di sumbu tegak.
const Koin: React.FC<{f: number; size?: number}> = ({f, size = 64}) => {
  const sx = Math.cos(f / 9);
  const face = sx > 0;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{display: 'block', transform: `scaleX(${Math.max(0.08, Math.abs(sx))})`}}>
      <circle cx="32" cy="32" r="30" fill={face ? U.gold : U.goldDeep} />
      <circle cx="32" cy="32" r="23" fill="none" stroke={U.goldLight} strokeWidth="2.5" />
      {face ? <path d="M32 17 L36 28 L47.5 28.4 L38.4 35.5 L41.6 46.5 L32 40 L22.4 46.5 L25.6 35.5 L16.5 28.4 L28 28 Z" fill={U.goldLight} /> : null}
    </svg>
  );
};

// Empat kartu tingkat + koin pemenang, lalu kupon berkode unik (contoh) meluncur masuk.
// Pada "gratis" kartu naik keluar, kupon pindah ke tengah dan cap GRATIS menekan.
export const Undian: React.FC<{f: number}> = ({f}) => {
  const rowV = win(f, P.row, 10, 12);
  const cIn = inP(f, P.coupon, 16);
  const cMid = inP(f, P.couponCenter, 16);
  const cOut = interpolate(f, [P.couponOut, P.couponOut + 10], [1, 0], clamp);
  const st = pop(f, P.stamp);
  if (rowV <= 0.001 && (cIn <= 0.001 || cOut <= 0.001)) return null;
  // kupon: masuk dari kanan di bawah kartu (y 860), lalu ke tengah (y 520) dan membesar
  const cy = interpolate(cMid, [0, 1], [858, 470]);
  const cs = interpolate(cMid, [0, 1], [0.92, 1.08]);
  return (
    <>
      {rowV > 0.001 ? (
        <div style={{position: 'absolute', left: 180, top: 0, width: 720, height: 1080, opacity: rowV, transform: `translateY(${-90 * inP(f, P.row[1] - 12, 12)}px)`}}>
          {TIERS.map((t, i) => {
            const p = interpolate(f, [P.row[0] + i * 5, P.row[0] + i * 5 + 14], [0, 1], {...clamp, easing: ease});
            const cp = pop(f, P.coins + i * 4);
            return (
              <div key={t.name} style={{position: 'absolute', left: i * 185, top: 470, width: 165, opacity: p, transform: `translateY(${(1 - p) * 60}px)`}}>
                <div style={{position: 'absolute', left: 50, top: -84, opacity: Math.min(1, cp), transform: `scale(${cp}) translateY(${Math.sin((f + i * 11) / 14) * 4}px)`}}>
                  <Koin f={f + i * 7} />
                </div>
                <div style={{...CARD, borderRadius: 28, border: `3px solid ${TIER_COLOR[i]}`, height: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18}}>
                  <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 25, color: TIER_COLOR[i], letterSpacing: 0.5}}>{t.name.toUpperCase()}</div>
                  <div style={{width: 60, height: 3, borderRadius: 2, background: U.goldLine}} />
                  <div style={{fontFamily: UF.display, fontSize: 52, color: U.ivory, lineHeight: 1}}>1</div>
                  <div style={{fontFamily: UF.text, fontWeight: 600, fontSize: 20, color: U.sage}}>pemenang</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {cIn > 0.001 && cOut > 0.001 ? (
        <div style={{position: 'absolute', left: 240, top: cy, width: 600, opacity: cIn * cOut, transform: `translateX(${(1 - cIn) * 420}px) scale(${cs * (1 - 0.08 * (1 - cOut))}) rotate(${(1 - cIn) * 6}deg)`}}>
          <Kupon />
          {st > 0.001 ? (
            <div style={{position: 'absolute', left: 150, top: 232, width: 300, display: 'flex', justifyContent: 'center'}}>
              <div
                style={{
                  fontFamily: UF.big,
                  fontSize: 96,
                  lineHeight: 1,
                  color: U.leafLight,
                  padding: '10px 34px 14px',
                  border: `6px solid ${U.leaf}`,
                  borderRadius: 20,
                  transform: `rotate(-8deg) scale(${interpolate(st, [0, 1, 1.08], [2.2, 1, 0.96])})`,
                  opacity: Math.min(1, st * 1.4),
                }}
              >
                GRATIS
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

// Kupon: tiket bertakik dengan kode unik contoh.
export const Kupon: React.FC = () => (
  <div style={{position: 'relative', height: 200}}>
    <svg width={600} height={200} viewBox="0 0 600 200" style={{position: 'absolute', inset: 0}}>
      <path d="M28 0 H572 Q600 0 600 28 V76 A24 24 0 0 0 600 124 V172 Q600 200 572 200 H28 Q0 200 0 172 V124 A24 24 0 0 0 0 76 V28 Q0 0 28 0 Z" fill={U.surface} stroke={U.gold} strokeWidth={3} />
      <line x1="150" y1="22" x2="150" y2="178" stroke={U.goldLine} strokeWidth={3} strokeDasharray="10 10" />
      <circle cx="75" cy="100" r="34" fill="none" stroke={U.gold} strokeWidth={3} />
      <path d="M75 78 L81 94 L98 94.6 L84.6 105 L89.4 121 L75 111.6 L60.6 121 L65.4 105 L52 94.6 L69 94 Z" fill={U.gold} />
    </svg>
    <div style={{position: 'absolute', left: 150, right: 0, top: 34, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
        <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 22, color: U.sage, letterSpacing: 2}}>KODE UNDIAN</span>
        <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 16, color: U.sage, padding: '2px 10px', borderRadius: 999, border: `1.5px solid ${U.line}`}}>contoh</span>
      </div>
      <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 40, color: U.goldLight, letterSpacing: 1.5}}>UND-XXXXXXXX</div>
    </div>
  </div>
);
