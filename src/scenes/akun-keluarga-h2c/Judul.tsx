import React from 'react';
import {interpolate} from 'remotion';
import {BIG_GRADIENT, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {P, POP, STEP_AT, STEP_LABEL} from './layout';

// Pita judul atas (y 236-440) dan angka langkah besar yang muncul di tengah lalu mengecil jadi lencana.
const big: React.CSSProperties = {
  fontFamily: UF.big,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  background: BIG_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: 1,
};
const band: React.CSSProperties = {position: 'absolute', left: 60, top: 232, width: 840, display: 'flex', flexDirection: 'column', alignItems: 'center'};

const stag = (f: number, start: number, k: number, end: number) => {
  const p = interpolate(f, [start + k * 5, start + k * 5 + 10], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [end - 7, end], [1, 0], clamp);
  return {opacity: p * o, transform: `translateY(${(1 - p) * 24}px) scale(${0.96 + 0.04 * p})`};
};

const Duo: React.FC<{f: number; from: number; to: number; script: string; scriptAt?: number; word: string; size?: number}> = ({f, from, to, script, scriptAt, word, size = 120}) => {
  if (f < from - 1 || f > to + 1) return null;
  return (
    <div style={band}>
      <div style={{fontFamily: UF.script, fontSize: 84, lineHeight: 1.05, color: U.ivory, padding: '0 12px', ...stag(f, scriptAt ?? from, 0, to)}}>{script}</div>
      <div style={{...big, fontSize: size, marginTop: -6, ...stag(f, from, 1, to)}}>{word}</div>
    </div>
  );
};

export const PitaAtas: React.FC<{f: number}> = ({f}) => (
  <>
    <Duo f={f} from={-6} to={P.introAt} script="Umroh" word="sekeluarga" />
    <Duo f={f} from={P.introAt} to={STEP_AT[0] - 2} script="pelan-pelan saja" scriptAt={P.pelan - 2} word="empat langkah" />
    <Duo f={f} from={P.done + 6} to={P.cta} script="satu akun" word="sekeluarga" />
  </>
);

// Lencana langkah + label setelah angka besar tiba.
const Lencana: React.FC<{f: number; i: number}> = ({f, i}) => {
  const a = STEP_AT[i] + POP.pre + POP.hold + POP.move - 2;
  const b = i < 3 ? STEP_AT[i + 1] - 2 : P.done;
  if (f < a - 1 || f > b + 1) return null;
  const o = interpolate(f, [a, a + 3, b - 6, b], [0, 1, 1, 0], clamp);
  const lp = interpolate(f, [a + 2, a + 12], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', left: 60, top: 268, width: 840, height: 128, display: 'flex', alignItems: 'center', gap: 26, opacity: o}}>
      <div style={{width: 124, height: 124, flex: 'none', borderRadius: '50%', border: `3px solid ${U.gold}`, background: U.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px rgba(212,175,106,.12)'}}>
        <span style={{...big, fontSize: 92, lineHeight: 1, marginTop: 4}}>{i + 1}</span>
      </div>
      <div style={{opacity: lp, transform: `translateX(${(1 - lp) * 30}px)`}}>
        <div style={{fontSize: 24, fontWeight: 700, letterSpacing: 3, color: U.sage, fontFamily: UF.text}}>LANGKAH {i + 1}</div>
        <div style={{...big, fontSize: 80, marginTop: 2}}>{STEP_LABEL[i]}</div>
      </div>
    </div>
  );
};

const AngkaBesar: React.FC<{f: number; i: number}> = ({f, i}) => {
  const s = STEP_AT[i] - POP.pre;
  const e = s + POP.hold;
  const m = e + POP.move;
  if (f < s || f > m) return null;
  const pin = interpolate(f, [s, s + 7, s + 11], [0, 1.1, 1], clamp);
  const mv = interpolate(f, [e, m], [0, 1], {...clamp, easing: ease});
  // tengah (480,730) ke lencana (122,332), skala 480 -> 92 px
  const x = 480 + (122 - 480) * mv;
  const y = 730 + (332 - 730) * mv;
  const sc = pin * (1 - (1 - 92 / 480) * mv);
  const halo = interpolate(f, [s, s + 6, e, m], [0, 1, 1, 0], clamp);
  return (
    <>
      <div style={{position: 'absolute', left: 480 - 420, top: 730 - 420, width: 840, height: 840, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,31,23,.92) 0%, rgba(10,31,23,.6) 45%, rgba(10,31,23,0) 70%)', opacity: halo}} />
      <div style={{position: 'absolute', left: x - 300, top: y - 260, width: 600, height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sc}) rotate(${(1 - Math.min(1, pin)) * -6}deg)`}}>
        <span style={{...big, fontSize: 480, lineHeight: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.6))'}}>{i + 1}</span>
      </div>
      {mv < 0.4 ? (
        <div style={{position: 'absolute', left: 60, top: 1010, width: 840, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [s + 6, s + 12], [0, 1], clamp) * (1 - mv * 2.5)}}>
          <div style={{...RIBBON, fontFamily: UF.script, fontSize: 60, lineHeight: 1, padding: '6px 34px 14px'}}>Langkah {['satu', 'dua', 'tiga', 'empat'][i]}</div>
        </div>
      ) : null}
    </>
  );
};

export const Langkah: React.FC<{f: number}> = ({f}) => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <React.Fragment key={i}>
        <Lencana f={f} i={i} />
        <AngkaBesar f={f} i={i} />
      </React.Fragment>
    ))}
  </>
);
