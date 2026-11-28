import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {BIG_GRADIENT, BTN, CARD, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {inP, pop, win} from '../umroh-10-juta/anim';
import {SUBS} from '../../data/timeline-checkout-hajar-aswad';
import {COL, HEADER, LABEL, P, stepAt, TAPS, TIER_RIM, TIERS, TRACK} from './layout';

// Bagian bersama: latar web, kepala situs mobile, jalur 5 langkah, lencana, kartu tiket, titik ketuk, label.

export const big: React.CSSProperties = {
  fontFamily: UF.big,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  background: BIG_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: 0.95,
};

export const Latar: React.FC<{f: number}> = ({f}) => (
  <>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${U.bg} 0%, ${U.bg2} 100%)`}} />
    <div style={{position: 'absolute', left: -320, top: -200, width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,56,.8) 0%, rgba(10,31,23,0) 70%)'}} />
    <div style={{position: 'absolute', right: -300, bottom: 160, width: 680, height: 680, borderRadius: '50%', border: `2px solid ${U.goldLine}`, opacity: 0.35, transform: `rotate(${f * 0.05}deg)`}} />
  </>
);

// Kepala situs mobile: logo bulat + H2C / WISATA MANDIRI, tombol WhatsApp hijau, pil Masuk, menu.
export const Kepala: React.FC<{f: number}> = ({f}) => {
  const p = inP(f, 0, 12) * (1 - inP(f, P.outro, 10));
  if (p <= 0.001) return null;
  return (
    <div style={{position: 'absolute', left: 60, width: 840, top: HEADER.y, height: HEADER.h, display: 'flex', alignItems: 'center', gap: 18, opacity: p, transform: `translateY(${(1 - p) * -30}px)`}}>
      <Img src={staticFile('brands/h2c-umroh/logo.jpeg')} style={{width: 84, height: 84, borderRadius: '50%', border: `2px solid ${U.goldLine}`}} />
      <div style={{display: 'flex', flexDirection: 'column', flex: 1, lineHeight: 1.05}}>
        <span style={{fontFamily: UF.display, fontWeight: 700, fontSize: 40, color: U.ivory}}>H2C</span>
        <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 17, letterSpacing: 2.5, color: U.sage}}>WISATA MANDIRI</span>
      </div>
      <div style={{width: 68, height: 68, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IkonWa size={38} color="#FFFFFF" />
      </div>
      <div style={{height: 64, padding: '0 26px', borderRadius: 999, border: `2px solid ${U.goldLine}`, display: 'flex', alignItems: 'center', fontFamily: UF.text, fontWeight: 700, fontSize: 26, color: U.ivory}}>Masuk</div>
      <div style={{width: 68, height: 68, borderRadius: 20, border: `2px solid ${U.goldLine}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7}}>
        {[0, 1, 2].map((k) => (
          <span key={k} style={{width: 30, height: 3.5, borderRadius: 2, background: U.ivory}} />
        ))}
      </div>
    </div>
  );
};

export const IkonWa: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.4 21.6l4.8-1.3A9.7 9.7 0 1 0 12 2.2Z" fill="none" stroke={color} strokeWidth={1.9} strokeLinejoin="round" />
    <path d="M8.6 7.4c.3-.6.6-.6.9-.6h.6c.2 0 .5 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.6.8c-.1.2-.2.4 0 .6.6 1.1 1.6 2 2.7 2.6.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l2 .9c.3.1.4.3.4.5 0 .5-.2 1.3-.8 1.7-.6.5-1.6.7-2.7.3a10 10 0 0 1-5.5-5c-.5-1.1-.6-2.2-.1-3.3l.5-.7Z" fill={color} />
  </svg>
);

// Jalur lima langkah: titik bernomor, garis emas-limau terisi sampai langkah aktif.
export const Jalur: React.FC<{f: number}> = ({f}) => {
  const p = inP(f, P.dots[0] - 4, 10) * (1 - inP(f, P.outro, 10));
  if (p <= 0.001) return null;
  const step = stepAt(f);
  const fill = interpolate(f, [P.step1[0], P.step2[0], P.step3[0], P.step4[0], P.step5[0], P.umum[0]], [0, 1, 2, 3, 4, 4], clamp);
  const x = (k: number) => TRACK.x0 + k * TRACK.gap;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: p, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: x(0), top: TRACK.y - 2, width: TRACK.gap * 4, height: 4, borderRadius: 2, background: U.line}} />
      <div style={{position: 'absolute', left: x(0), top: TRACK.y - 2, width: TRACK.gap * fill, height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${U.gold}, ${U.leaf})`}} />
      {[0, 1, 2, 3, 4].map((k) => {
        const d = pop(f, P.dots[k]);
        const on = step === k + 1;
        const done = step > k + 1;
        const r = TRACK.r * (on ? 1.3 : 1);
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: x(k) - r,
              top: TRACK.y - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              boxSizing: 'border-box',
              background: on ? U.gold : done ? U.surface2 : U.bg2,
              border: `3px solid ${on || done ? U.gold : U.goldLine}`,
              boxShadow: on ? `0 0 0 10px ${U.goldSoft}` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: UF.text,
              fontWeight: 800,
              fontSize: on ? 36 : 28,
              color: on ? U.bg : done ? U.leafLight : U.ivory2,
              transform: `scale(${d})`,
            }}
          >
            {done ? '✓' : k + 1}
          </div>
        );
      })}
    </div>
  );
};

// Angka langkah besar: muncul di tengah panggung lalu menyusut ke titiknya di jalur.
export const AngkaBesar: React.FC<{f: number; k: number; at: number}> = ({f, k, at}) => {
  if (f < at || f > at + 26) return null;
  const a = inP(f, at, 6);
  const fly = interpolate(f, [at + 12, at + 24], [0, 1], {...clamp, easing: ease});
  const x = COL.cx + (TRACK.x0 + k * TRACK.gap - COL.cx) * fly;
  const y = 760 + (TRACK.y - 760) * fly;
  const sc = (0.6 + 0.4 * a) * (1 - 0.82 * fly);
  return (
    <div style={{position: 'absolute', left: x - 200, top: y - 200, width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: a * (1 - interpolate(fly, [0.4, 0.85], [0, 1], clamp)), transform: `scale(${sc})`, pointerEvents: 'none'}}>
      <span style={{...big, fontSize: 380, lineHeight: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.5))'}}>{k + 1}</span>
    </div>
  );
};

export const Lencana: React.FC<{i: number; size: number; style?: React.CSSProperties}> = ({i, size, style}) => (
  <Img src={staticFile(`brands/h2c-umroh/lencana/${TIERS[i].id}.svg`)} style={{width: size, height: size, ...style}} />
);

// Kartu paket gaya tiket (lekuk bulat di tepi, garis putus-putus, IDN ✈ KSA).
export const Tiket: React.FC<{jenis: 'standar' | 'premium'; w: number; glow?: number; picked?: number}> = ({jenis, w, glow = 0, picked = 0}) => {
  const img = w - 36;
  return (
    <div
      style={{
        position: 'relative',
        width: w,
        ...CARD,
        borderRadius: 34,
        boxSizing: 'border-box',
        padding: 18,
        border: `${3 + 3 * picked}px solid ${glow > 0.05 || picked > 0.05 ? U.gold : U.goldLine}`,
        boxShadow: `0 40px 90px -40px rgba(0,0,0,.7), 0 0 0 ${14 * Math.max(glow, picked)}px rgba(212,175,106,${0.16 * Math.max(glow, picked)})`,
        transform: `translateY(${-14 * glow}px) scale(${1 + 0.04 * glow})`,
      }}
    >
      <Img src={staticFile(`brands/h2c-umroh/paket/hajar-aswad-${jenis}.webp`)} style={{width: img, height: img, borderRadius: 22, display: 'block'}} />
      <div style={{fontFamily: UF.text, fontWeight: 700, fontSize: 20, letterSpacing: 2.5, color: U.sage, marginTop: 18, marginBottom: 10, lineHeight: 1, textAlign: 'center'}}>HAJAR ASWAD</div>
      <div style={{fontFamily: UF.display, fontWeight: 700, fontSize: 46, color: U.goldLight, textAlign: 'center', lineHeight: 1.1}}>{jenis === 'standar' ? 'Standar' : 'Premium'}</div>
      {/* lekuk tiket + garis putus-putus */}
      <div style={{position: 'relative', height: 40, marginTop: 6}}>
        <div style={{position: 'absolute', left: -38, top: 6, width: 36, height: 36, borderRadius: '50%', background: U.bg2, borderRight: `2px solid ${U.goldLine}`}} />
        <div style={{position: 'absolute', right: -38, top: 6, width: 36, height: 36, borderRadius: '50%', background: U.bg2, borderLeft: `2px solid ${U.goldLine}`}} />
        <div style={{position: 'absolute', left: 14, right: 14, top: 23, borderTop: `2px dashed ${U.goldLine}`}} />
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: UF.text, fontWeight: 700, fontSize: 22, color: U.ivory2}}>
        <span>IDN</span>
        <span style={{flex: 1, borderTop: `2px dashed ${U.sage}`, opacity: 0.6}} />
        <span style={{color: U.gold, fontSize: 26}}>✈</span>
        <span style={{flex: 1, borderTop: `2px dashed ${U.sage}`, opacity: 0.6}} />
        <span>KSA</span>
      </div>
    </div>
  );
};

// Titik ketuk emas (pengganti jari): muncul, menekan, riak.
export const Ketuk: React.FC<{f: number}> = ({f}) => {
  const t = TAPS.find(([at]) => f >= at - 10 && f <= at + 18);
  if (!t) return null;
  const [at, x, y] = t;
  const show = inP(f, at - 10, 6) * (1 - inP(f, at + 10, 8));
  const press = interpolate(f, [at - 3, at, at + 5], [0, 1, 0], clamp);
  const ring = interpolate(f, [at, at + 18], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {f >= at ? <div style={{position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120, borderRadius: '50%', border: `5px solid ${U.gold}`, transform: `scale(${0.3 + ring})`, opacity: 1 - ring}} /> : null}
      <div style={{position: 'absolute', left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: '50%', background: 'rgba(227,199,140,.9)', border: `4px solid ${U.ribbonInk}`, boxShadow: '0 8px 22px rgba(0,0,0,.45)', opacity: show, transform: `scale(${1 - 0.25 * press})`}} />
    </div>
  );
};

// Subtitle penuh (Bos 28 Nov: visual diperbanyak, subtitle tetap ada): kata asli dari transkrip, muncul saat diucapkan.
export const Subtitle: React.FC<{f: number}> = ({f}) => {
  const c = SUBS.find((x) => f >= x.from && f < x.to);
  if (!c) return null;
  const out = interpolate(f, [c.to - 5, c.to], [1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: LABEL.x, top: LABEL.y, width: LABEL.w, height: LABEL.h, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', columnGap: 14, fontFamily: UF.text, fontWeight: 700, fontSize: 52, lineHeight: 1.2, textAlign: 'center', opacity: out}}>
      {c.words.map((w, i) => {
        const p = interpolate(f, [w.f - 3, w.f + 4], [0, 1], {...clamp, easing: ease});
        return (
          <span key={i} style={{color: w.bold ? U.goldLight : U.ivory, opacity: 0.25 + 0.75 * p, transform: `translateY(${(1 - p) * 8}px)`, display: 'inline-block', textShadow: '0 4px 18px rgba(0,0,0,.55)'}}>
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

// Pil kecil "contoh" untuk data fiktif.
export const Contoh: React.FC<{style?: React.CSSProperties}> = ({style}) => (
  <span style={{fontFamily: UF.text, fontWeight: 700, fontSize: 20, color: U.sage, padding: '4px 14px', borderRadius: 999, border: `1.5px solid ${U.line}`, ...style}}>contoh</span>
);

export const Tombol: React.FC<{text: string; w: number; h?: number; fs?: number; press?: number}> = ({text, w, h = 96, fs = 36, press = 0}) => (
  <div style={{width: w, height: h, ...BTN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: UF.text, fontWeight: 800, fontSize: fs, boxShadow: `0 20px 40px -18px rgba(0,0,0,.6), 0 0 0 ${10 * press}px rgba(212,175,106,.25)`, transform: `scale(${1 - 0.04 * press})`}}>{text}</div>
);

export {TIER_RIM, win};
