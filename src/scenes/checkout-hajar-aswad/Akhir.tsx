import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {CARD, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp} from '../../components/motion';
import {inP, pop, rise, win} from '../umroh-10-juta/anim';
import {COL, P, STAGE, TIER_RIM} from './layout';
import {Ikon} from './Langkah';
import {big, Lencana, Tombol} from './Web';

// Pengumuman pemenang tahap 1 (01 JAN 2027), bebas pilih Promo atau Reguler 9D bintang 3, berangkat 2027.
export const Pengumuman: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.umum, 12, 10);
  if (v <= 0.001) return null;
  const cal = inP(f, P.januari, 12);
  const beat = 1 + 0.05 * Math.max(0, Math.sin(((f - P.januari) / 30) * Math.PI * 2)) * cal;
  const cards = (k: number) => inP(f, P.bebas + k * 6, 12);
  const pr = inP(f, P.promo, 8);
  const rg = inP(f, P.reguler, 8);
  const stars = [0, 1, 2].map((k) => pop(f, P.bintang + k * 4));
  const fly = inP(f, P.berangkat, 14);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v, transform: `translateX(${(1 - inP(f, P.umum[0], 12)) * 140}px)`}}>
      {/* kalender */}
      <div style={{position: 'absolute', left: COL.cx - 190, top: STAGE.y + 10, width: 380, height: 380, ...CARD, borderRadius: 48, overflow: 'hidden', ...rise(inP(f, P.umum[0] + 8, 12), 40), transform: `${rise(inP(f, P.umum[0] + 8, 12), 40).transform} scale(${beat})`}}>
        <div style={{height: 104, background: U.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}>
          <Ikon id="kalender" size={52} color={U.bg} />
          <span style={{fontFamily: UF.text, fontWeight: 800, fontSize: 46, color: U.bg, letterSpacing: 3}}>JAN</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 276, opacity: cal}}>
          <span style={{...big, fontSize: 150, lineHeight: 1, marginBottom: 6}}>01</span>
          <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 58, color: U.goldLight, lineHeight: 1}}>2027</span>
        </div>
      </div>
      {/* Promo vs Reguler 9D */}
      {[0, 1].map((k) => {
        const on = k ? rg : pr;
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: COL.x + 15 + k * 375,
              top: 910,
              width: 345,
              height: 300,
              ...CARD,
              borderRadius: 36,
              boxSizing: 'border-box',
              border: `3px solid ${on > 0.05 ? U.gold : U.goldLine}`,
              boxShadow: `0 0 0 ${12 * on}px ${U.goldSoft}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '32px 24px',
              ...rise(cards(k), 60),
            }}
          >
            {k === 0 ? (
              <>
                <Img src={staticFile('brands/h2c-umroh/paket/hajar-aswad-standar.webp')} style={{width: 120, height: 120, borderRadius: 22}} />
                <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 52, color: U.goldLight}}>Promo</span>
              </>
            ) : (
              <>
                <span style={{...big, fontSize: 92, lineHeight: 1}}>9D</span>
                <div style={{display: 'flex', gap: 8}}>
                  {stars.map((st, j) => (
                    <span key={j} style={{fontSize: 44, lineHeight: 1, color: U.gold, transform: `scale(${st})`, display: 'inline-block', opacity: st > 0 ? 1 : 0.2}}>
                      ★
                    </span>
                  ))}
                </div>
                <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 42, lineHeight: 1.1, color: U.ivory}}>Reguler</span>
              </>
            )}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: COL.cx - 44, top: 1020, width: 88, height: 88, borderRadius: '50%', background: U.bg2, border: `2px solid ${U.goldLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: UF.text, fontWeight: 800, fontSize: 26, color: U.sage, opacity: cards(1)}}>atau</div>
      {/* pesawat berangkat 2027 */}
      {fly > 0.001 ? (
        <div style={{position: 'absolute', left: COL.x, width: COL.w, top: 860, height: 40, opacity: fly * (1 - inP(f, P.umum[1] - 6, 6))}}>
          <div style={{position: 'absolute', left: 40, right: 40, top: 18, borderTop: `3px dashed ${U.gold}`, opacity: 0.6}} />
          <span style={{position: 'absolute', top: -14, left: `${interpolate(fly, [0, 1], [2, 88], clamp)}%`, fontSize: 52, color: U.goldLight}}>✈</span>
        </div>
      ) : null}
    </div>
  );
};

// "Ingin berkesempatan besar...? Ikuti saja semua paketnya.": empat lencana menyala berurutan,
// lalu dua paket Hajar Aswad masuk di atasnya saat "Ikuti saja semua paketnya".
export const SemuaTingkat: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.semua, 12, 10);
  if (v <= 0.001) return null;
  const glowEnd = P.ikuti - 6;
  const pk = (k: number) => inP(f, P.ikuti + k * 6, 14);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v}}>
      <div style={{position: 'absolute', left: COL.x, width: COL.w, top: 470, display: 'flex', justifyContent: 'center', gap: 40}}>
        {[0, 1].map((k) => (
          <div key={k} style={{...rise(pk(k), 60)}}>
            <Img src={staticFile(`brands/h2c-umroh/paket/hajar-aswad-${k ? 'premium' : 'standar'}.webp`)} style={{width: 300, height: 300, borderRadius: 36, border: `3px solid ${U.gold}`, boxShadow: '0 40px 90px -30px rgba(0,0,0,.7)'}} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: COL.x, width: COL.w, top: 900, display: 'flex', justifyContent: 'space-between'}}>
        {[0, 1, 2, 3].map((i) => {
          const at = P.semua[0] + 6 + Math.round((i * (glowEnd - P.semua[0] - 6)) / 4);
          const d = pop(f, at);
          const glow = inP(f, at + 4, 10);
          return (
            <div key={i} style={{width: 180, height: 180, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle, ${TIER_RIM[i]}55 0%, rgba(0,0,0,0) 65%)`, opacity: d > 0 ? 0.35 + 0.65 * glow : 0, transform: `scale(${d})`}}>
              <Lencana i={i} size={150} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Penutup: logo bulat asli + tombol emas umroh.h2c.or.id.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const p = inP(f, P.outro, 14);
  if (p <= 0.001) return null;
  const b = pop(f, P.btn);
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 60}}>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 300, height: 300, borderRadius: '50%', border: `4px solid ${U.gold}`, opacity: p, transform: `scale(${0.85 + 0.15 * p})`, boxShadow: '0 40px 90px -30px rgba(0,0,0,.7)'}} />
      <div style={{transform: `scale(${b})`, opacity: b > 0 ? 1 : 0}}>
        <Tombol text="umroh.h2c.or.id" w={640} h={120} fs={50} />
      </div>
    </div>
  );
};
