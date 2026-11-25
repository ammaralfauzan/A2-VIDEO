import React from 'react';
import {interpolate, spring} from 'remotion';
import {U} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {FAMILY_ID, CARD, CARD_X, DESK_Y, L, MON, NAMES, P, PHONE, SANDI, SCR} from './layout';
import {Layar} from './Layar';

// Set meja 3D semu: dinding zamrud dengan cahaya jendela emas, meja berperspektif, monitor, ponsel, tumbuhan,
// empat kartu nama berdiri. Semua gerak dari benda (kartu, layar, ponsel, daun); tanpa makhluk bernyawa.
const pin = (f: number, a: number, d = 8) => interpolate(f, [a, a + d], [0, 1], {...clamp, easing: ease});
const pop = (f: number, at: number) => spring({frame: f - at, fps: 30, config: {damping: 11, stiffness: 160, mass: 0.8}});

export const Ruang: React.FC<{f: number}> = ({f}) => (
  <>
    {/* dinding: cahaya hangat dari kiri atas, garis tirai emas jatuh miring */}
    <div style={{position: 'absolute', left: -400, top: -200, width: 1880, height: DESK_Y + 240, background: `linear-gradient(180deg, ${U.bg} 0%, ${U.bg2} 70%, ${U.surface} 100%)`}} />
    <div style={{position: 'absolute', left: -380, top: -320, width: 1300, height: 1300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,106,.20) 0%, rgba(212,175,106,0) 65%)'}} />
    <div
      style={{
        position: 'absolute',
        left: -300,
        top: 60,
        width: 1700,
        height: 900,
        transform: `skewX(-24deg) translateX(${Math.sin(f / 90) * 6}px)`,
        background: 'repeating-linear-gradient(180deg, rgba(227,199,140,.075) 0px, rgba(227,199,140,.075) 46px, rgba(227,199,140,0) 46px, rgba(227,199,140,0) 92px)',
        WebkitMaskImage: 'radial-gradient(ellipse at 30% 30%, black 0%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse at 30% 30%, black 0%, transparent 70%)',
      }}
    />
    {/* cahaya layar di dinding belakang monitor */}
    <div style={{position: 'absolute', left: 30, top: 380, width: 900, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(140,198,63,.10) 0%, rgba(27,78,56,.25) 35%, rgba(10,31,23,0) 70%)'}} />
    {/* meja */}
    <div style={{position: 'absolute', left: -500, top: DESK_Y, width: 2080, height: 1400, background: `linear-gradient(180deg, ${U.surface2} 0%, ${U.surface} 22%, ${U.bg2} 60%, ${U.bg} 100%)`}} />
    <svg width={2080} height={1400} style={{position: 'absolute', left: -500, top: DESK_Y}}>
      {Array.from({length: 17}, (_, i) => {
        const x0 = 980 + (i - 8) * 26; // titik hilang di belakang monitor
        const x1 = 980 + (i - 8) * 260;
        return <line key={i} x1={x0} y1={0} x2={x1} y2={1400} stroke="rgba(244,239,225,.05)" strokeWidth={2} />;
      })}
    </svg>
    <div style={{position: 'absolute', left: -500, top: DESK_Y - 2, width: 2080, height: 4, background: 'linear-gradient(90deg, rgba(212,175,106,0) 0%, rgba(227,199,140,.75) 30%, rgba(227,199,140,.75) 70%, rgba(212,175,106,0) 100%)'}} />
  </>
);

const Tumbuhan: React.FC<{f: number}> = ({f}) => {
  const leaves = [
    [-38, 0, 0.9],
    [-12, 1.3, 1.05],
    [14, 2.1, 1],
    [38, 3.4, 0.85],
    [-60, 4.2, 0.7],
    [60, 5.1, 0.72],
  ];
  return (
    <div style={{position: 'absolute', left: 4, top: 860}}>
      <div style={{position: 'absolute', left: 6, top: 196, width: 120, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,.45)', filter: 'blur(6px)'}} />
      {leaves.map(([rot, ph, sc], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 46,
            top: 40,
            width: 34,
            height: 110 * sc,
            borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
            background: i % 2 ? U.leaf : U.surface2,
            border: `2px solid rgba(181,227,107,.35)`,
            opacity: i % 2 ? 0.75 : 1,
            transformOrigin: '50% 100%',
            transform: `translateY(${110 - 110 * sc}px) rotate(${rot + Math.sin(f / 26 + ph) * 3.5}deg)`,
          }}
        />
      ))}
      <div style={{position: 'absolute', left: 22, top: 140, width: 86, height: 70, borderRadius: '10px 10px 26px 26px', background: `linear-gradient(90deg, ${U.goldDeep}, ${U.gold} 55%, ${U.goldDeep})`}} />
    </div>
  );
};

const Monitor: React.FC<{f: number; dof: number}> = ({f, dof}) => (
  <div style={{position: 'absolute', inset: 0, filter: dof > 0.02 ? `blur(${dof * 7}px)` : undefined, opacity: 1 - 0.62 * Math.min(1, dof * 2.5)}}>
    {/* bayangan kontak dan kaki */}
    <div style={{position: 'absolute', left: 300, top: DESK_Y + 14, width: 360, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,.5)', filter: 'blur(8px)'}} />
    <div style={{position: 'absolute', left: 448, top: MON.y + MON.h - 4, width: 64, height: 70, background: `linear-gradient(90deg, ${U.bg}, ${U.surface2} 50%, ${U.bg})`}} />
    <div style={{position: 'absolute', left: 350, top: DESK_Y + 2, width: 260, height: 30, borderRadius: '50%', background: `linear-gradient(180deg, ${U.surface2}, ${U.bg})`, border: `2px solid ${U.goldLine}`}} />
    {/* badan monitor */}
    <div style={{position: 'absolute', left: MON.x, top: MON.y, width: MON.w, height: MON.h, borderRadius: 30, background: '#06120D', border: `3px solid ${U.goldLine}`, boxSizing: 'border-box', boxShadow: '0 50px 90px -30px rgba(0,0,0,.8), 0 0 80px -10px rgba(140,198,63,.12)'}} />
    <div style={{position: 'absolute', left: SCR.x, top: SCR.y, width: SCR.w, height: SCR.h}}>
      <Layar f={f} />
    </div>
  </div>
);

const Ponsel: React.FC<{f: number; dof: number}> = ({f, dof}) => {
  const on = interpolate(f, [P.phoneIn - 6, P.phoneIn + 6, P.phoneOut - 4, P.phoneOut + 2], [0, 1, 1, 0], clamp);
  const bub = pin(f, P.bubble, 9);
  const sent = pin(f, P.sent, 6);
  const sw = PHONE.w - 20;
  return (
    <div style={{position: 'absolute', left: PHONE.x, top: PHONE.y, width: PHONE.w, height: PHONE.h}}>
      <div style={{position: 'absolute', left: 10, top: PHONE.h - 6, width: 190, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,.5)', filter: 'blur(8px)'}} />
      <div style={{position: 'absolute', left: 60, top: PHONE.h - 40, width: 80, height: 56, background: `linear-gradient(90deg, ${U.goldDeep}, ${U.gold})`, clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)'}} />
      <div style={{position: 'absolute', inset: 0, borderRadius: 34, background: '#050D0A', border: `3px solid ${U.goldLine}`, boxShadow: '0 30px 60px -20px rgba(0,0,0,.8)'}} />
      <div style={{position: 'absolute', left: 10, top: 10, width: sw, height: PHONE.h - 20, borderRadius: 26, overflow: 'hidden', background: U.bg2}}>
        <div style={{position: 'absolute', left: sw / 2 - 22, top: 10, width: 44, height: 8, borderRadius: 4, background: '#050D0A'}} />
        {on > 0.01 ? (
          <div style={{position: 'absolute', inset: 0, opacity: on, fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
            <div style={{position: 'absolute', left: 0, top: 26, width: sw, height: 50, borderBottom: `2px solid ${U.goldLine}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', boxSizing: 'border-box'}}>
              <span style={{width: 28, height: 28, borderRadius: '50%', background: U.gold, color: U.bg, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{NAMES[0][0]}</span>
              <span style={{fontSize: 17, fontWeight: 700, color: U.ivory}}>Pesan</span>
            </div>
            <div style={{position: 'absolute', right: 10, top: 110, width: 156, borderRadius: '18px 18px 4px 18px', background: U.surface2, border: `2px solid ${U.goldLine}`, padding: '10px 12px', boxSizing: 'border-box', opacity: bub, transform: `translateY(${(1 - bub) * 30}px) scale(${0.9 + 0.1 * bub})`, transformOrigin: '100% 100%'}}>
              <div style={{fontSize: 13, fontWeight: 700, color: U.sage}}>ID keluarga</div>
              <div style={{fontSize: 17, fontWeight: 700, color: U.goldLight}}>{FAMILY_ID}</div>
              <div style={{fontSize: 13, fontWeight: 700, color: U.sage, marginTop: 6}}>Sandi</div>
              <div style={{fontSize: 17, fontWeight: 700, color: U.goldLight}}>{SANDI}</div>
              <div style={{fontSize: 12, fontWeight: 600, color: U.sage, marginTop: 6}}>contoh</div>
            </div>
            <div style={{position: 'absolute', right: 12, top: 290, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: U.leafLight, opacity: sent}}>
              <svg width={18} height={14} viewBox="0 0 18 14"><path d="M1 7 L6 12 L17 1" fill="none" stroke={U.leafLight} strokeWidth={2.6} strokeLinecap="round" /></svg>
              Terkirim
            </div>
          </div>
        ) : null}
      </div>
      <div style={{position: 'absolute', inset: 0, borderRadius: 34, background: 'linear-gradient(130deg, rgba(255,250,240,.10) 0%, rgba(255,250,240,0) 40%)'}} />
    </div>
  );
};

// Kartu nama berdiri (tent card): gading, pita emas di atas, lingkaran inisial (bukan wajah), nama fiktif.
const Kartu: React.FC<{f: number; i: number; dof: number}> = ({f, i, dof}) => {
  const p = pop(f, 1 + i * 5);
  const nameAt = i === 0 ? P.clickSave + 4 : P.addMore[i - 1];
  const np = pin(f, nameAt, 8);
  const land = pop(f, nameAt);
  // langkah 3: kartu anggota menyala dan maju; langkah 4: meluncur ke kartu paket di layar, lalu kembali saat selesai
  const fwd = i === 0 ? interpolate(f, [P.forward, P.forward + 10, P.paketOpen - 10, P.paketOpen], [0, 1, 1, 0], {...clamp, easing: ease}) : 0;
  const fly = i === 0 ? pin(f, P.fly, 18) : 0;
  const back = i === 0 ? pop(f, P.done + 4) : 1;
  const glowAll = pin(f, P.rowGlow, 10) * (1 - pin(f, P.cta + 20, 12));
  const glow = Math.max(fwd, glowAll);
  const x0 = CARD_X[i];
  const y0 = CARD.y;
  const target = L(262, 420);
  const flyOn = i === 0 && f >= P.fly && f < P.done + 4;
  const fx = flyOn ? (target.x - CARD.w / 2 - x0) * fly : 0;
  const fy = flyOn ? (target.y - CARD.h / 2 - y0) * fly - Math.sin(fly * Math.PI) * 120 : 0;
  const fs = flyOn ? 1 - 0.7 * fly : 1;
  const fo = flyOn ? 1 - pin(f, P.fly + 12, 6) : 1;
  const sq = 1 + (land - 1) * 0.12 * (f >= nameAt ? 1 : 0);
  const scale = p * (i === 0 && f >= P.done + 4 ? back : 1) * (1 + 0.12 * fwd) * fs;
  return (
    <div
      style={{
        position: 'absolute',
        left: x0,
        top: y0,
        width: CARD.w,
        height: CARD.h,
        transformOrigin: '50% 100%',
        transform: `translate(${fx}px, ${fy - 26 * fwd - (1 - p) * 60}px) scale(${scale}) scaleY(${sq})`,
        opacity: Math.min(1, p * 3) * fo * (1 - 0.62 * Math.min(1, dof * 2.5)),
        filter: dof > 0.02 ? `blur(${dof * 6}px)` : undefined,
      }}
    >
      <div style={{position: 'absolute', left: 8, top: CARD.h - 10, width: CARD.w - 16, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,.5)', filter: 'blur(5px)'}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 18,
          background: `linear-gradient(180deg, ${U.ivory} 0%, ${U.ivory2} 100%)`,
          overflow: 'hidden',
          boxShadow: `0 18px 30px -14px rgba(0,0,0,.7), 0 0 0 ${glow * 6}px rgba(212,175,106,${0.45 * glow}), 0 0 ${glow * 50}px rgba(227,199,140,${0.55 * glow})`,
          transform: 'perspective(600px) rotateX(10deg)',
          transformOrigin: '50% 100%',
        }}
      >
        <div style={{height: 18, background: `linear-gradient(90deg, #C18A36, #D9AB5B 55%, #B67D2C)`}} />
        <div style={{position: 'absolute', left: CARD.w / 2 - 22, top: 28, width: 44, height: 44, borderRadius: '50%', border: `3px solid ${U.gold}`, background: np > 0 ? U.gold : 'transparent', color: U.bg, fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
          {np > 0.45 ? NAMES[i][0] : ''}
        </div>
        {np > 0.01 ? (
          <div style={{position: 'absolute', left: 0, top: 80, width: CARD.w, textAlign: 'center', opacity: np, fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
            <div style={{fontSize: 25, fontWeight: 700, color: U.bg, lineHeight: 1.1}}>{NAMES[i]}</div>
            <div style={{fontSize: 14, fontWeight: 600, color: U.surface2}}>contoh</div>
          </div>
        ) : (
          <div style={{position: 'absolute', left: 30, top: 92, width: CARD.w - 60, height: 10, borderRadius: 5, background: 'rgba(18,59,42,.15)'}} />
        )}
      </div>
    </div>
  );
};

export const Meja: React.FC<{f: number; dof: number}> = ({f, dof}) => (
  <>
    <Ruang f={f} />
    <Tumbuhan f={f} />
    <Ponsel f={f} dof={dof} />
    <Monitor f={f} dof={dof} />
    {[0, 1, 2, 3].map((i) => (
      <Kartu key={i} f={f} i={i} dof={dof} />
    ))}
  </>
);
