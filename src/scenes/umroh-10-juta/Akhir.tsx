import React from 'react';
import {Img, staticFile} from 'remotion';
import {BTN, CARD, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {Batu} from './Batu';
import {inP, pop, rise, win} from './anim';
import {P} from './layout';

// Syarat: batu kembali di belakang, kartu syarat kecil di depannya.
export const Syarat: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.syarat, 12, 10);
  if (v <= 0.001) return null;
  const b = inP(f, P.syarat[0], 16);
  const c = rise(inP(f, P.syarat[0] + 6, 14), 40);
  const l2 = inP(f, P.syarat2, 10);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v}}>
      <div style={{position: 'absolute', left: 350, top: 250, opacity: 0.55 * b, transform: `scale(${0.85 + 0.05 * b})`, transformOrigin: '190px 240px'}}>
        <Batu f={f} w={380} />
      </div>
      <div style={{position: 'absolute', left: 180, top: 800, width: 720, ...CARD, borderRadius: 40, padding: '44px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, ...c}}>
        <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 22, color: U.goldLight, letterSpacing: 3, padding: '6px 20px', borderRadius: 999, border: `2px solid ${U.goldLine}`}}>SYARAT</div>
        <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 48, color: U.ivory, textAlign: 'center', lineHeight: 1.25}}>
          Belum mengambil
          <br />
          paket umroh 2027
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: l2}}>
          <span style={{width: 14, height: 14, borderRadius: '50%', background: U.leaf}} />
          <span style={{fontFamily: UF.text, fontWeight: 600, fontSize: 32, color: U.sage}}>1 kupon per akun per tingkat</span>
        </div>
      </div>
    </div>
  );
};

// Isyarat Video 2: monitor dengan tombol putar besar, lima titik langkah menyala berurutan.
export const Teaser: React.FC<{f: number}> = ({f}) => {
  const v = win(f, P.teaser, 12, 10);
  if (v <= 0.001) return null;
  const m = inP(f, P.teaser[0], 16);
  const play = pop(f, P.teaser[0] + 10);
  const chip = inP(f, P.teaserChip, 12);
  const breath = 1 + 0.04 * Math.sin(f / 8);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v}}>
      <div style={{position: 'absolute', left: 190, top: 280, width: 700, opacity: m, transform: `translateY(${(1 - m) * 80}px) scale(${0.94 + 0.06 * m})`}}>
        <div style={{height: 560, borderRadius: 34, background: U.bg2, border: `10px solid ${U.surface2}`, boxShadow: '0 50px 110px -40px rgba(0,0,0,.75)', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: -120, top: -160, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,106,.18) 0%, rgba(212,175,106,0) 70%)'}} />
          <div style={{position: 'absolute', left: 250, top: 110, width: 180, height: 180, borderRadius: '50%', background: U.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${play * breath})`, boxShadow: '0 0 0 18px rgba(212,175,106,.16)'}}>
            <svg width="78" height="78" viewBox="0 0 64 64">
              <path d="M20 12 L54 32 L20 52 Z" fill={U.bg} strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 370, display: 'flex', justifyContent: 'center', opacity: chip, transform: `translateY(${(1 - chip) * 12}px)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 28px 12px 20px', borderRadius: 999, border: `2px solid ${U.goldLine}`, background: U.bg}}>
              <span style={{width: 14, height: 14, borderRadius: '50%', background: U.gold, boxShadow: '0 0 0 7px rgba(212,175,106,.25)'}} />
              <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 34, color: U.goldLight}}>Segera: cara ikutnya</span>
            </div>
          </div>
        </div>
        <div style={{width: 70, height: 70, background: U.surface2, margin: '0 auto'}} />
        <div style={{width: 280, height: 18, borderRadius: 999, background: U.surface2, margin: '0 auto'}} />
      </div>
      <div style={{position: 'absolute', left: 180, top: 1110, width: 720, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, opacity: m}}>
        {P.dots.map((at, k) => {
          const on = inP(f, at, 8);
          return (
            <React.Fragment key={k}>
              {k > 0 ? <div style={{width: 38, height: 4, borderRadius: 2, background: on > 0 ? `linear-gradient(90deg, ${U.gold}, ${U.leaf})` : U.line, opacity: 0.4 + 0.6 * on}} /> : null}
              <div style={{width: 84, height: 84, borderRadius: '50%', boxSizing: 'border-box', border: `3px solid ${on > 0.05 ? U.gold : U.goldLine}`, background: on > 0.5 ? U.gold : U.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.12 * Math.sin(Math.PI * Math.min(1, on))})`}}>
                <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 34, color: on > 0.5 ? U.bg : U.sage}}>{k + 1}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// Penutup: logo lingkaran asli + nama + pita, chip PAKET PROMO, lalu tombol emas umroh.h2c.or.id.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const a = P.outro;
  if (f < a) return null;
  const s = (k: number) => rise(inP(f, a + 6 + k * 6, 12), 24);
  const pp = inP(f, P.promo, 10);
  const bp = pop(f, P.btn);
  const glow = inP(f, P.btn + 12, 28);
  return (
    <div style={{position: 'absolute', left: 180, top: 330, width: 720, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 300, height: 300, borderRadius: '50%', border: `4px solid ${U.goldLine}`, boxShadow: '0 30px 80px -30px rgba(0,0,0,.7)', ...s(0)}} />
      <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 50, color: U.ivory, marginTop: 44, ...s(1)}}>H2C Wisata Mandiri</div>
      <div style={{...s(2)}}>
        <div style={{...RIBBON, fontFamily: UF.script, fontSize: 66, lineHeight: 1, padding: '6px 38px 16px', marginTop: 32}}>Umroh Aman &amp; Amanah</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 64, padding: '14px 32px 14px 24px', borderRadius: 999, border: `2px solid ${U.goldLine}`, background: U.bg2, fontFamily: UF.text, fontWeight: 700, fontSize: 32, color: U.goldLight, letterSpacing: 1, opacity: pp, transform: `translateY(${(1 - pp) * 16}px)`}}>
        <span style={{width: 14, height: 14, borderRadius: '50%', background: U.gold, boxShadow: '0 0 0 7px rgba(212,175,106,.25)'}} />
        PAKET PROMO HAJAR ASWAD
      </div>
      <div
        style={{
          ...BTN,
          marginTop: 40,
          padding: '34px 72px',
          fontFamily: UF.text,
          fontWeight: 700,
          fontSize: 52,
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
