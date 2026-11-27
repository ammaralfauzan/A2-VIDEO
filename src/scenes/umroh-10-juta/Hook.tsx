import React from 'react';
import {interpolate} from 'remotion';
import {BIG_GRADIENT, RIBBON, U, UF} from '../../brands/h2c-umroh/theme';
import {clamp} from '../../components/motion';
import {Batu} from './Batu';
import {inP, pop} from './anim';
import {P} from './layout';

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

// Hook 0-6 dtk: batu sudah bergerak di frame pertama, "10 JUTA" naik dari bawah,
// goyang pada "Apa?!", tegak lagi pada "Iya", pita "Bisa!" + denyut sekali. Kamera maju pelan.
export const Hook: React.FC<{f: number}> = ({f}) => {
  if (f > P.hookOut + 10) return null;
  const out = interpolate(f, [P.hookOut, P.hookOut + 10], [1, 0], clamp);
  const cam = 1 + 0.05 * interpolate(f, [0, P.hookOut], [0, 1], clamp);
  const t = inP(f, P.titleIn, 14);
  const shake = f >= P.apa && f < P.iya ? Math.sin((f - P.apa) * 1.3) * interpolate(f, [P.apa, P.apa + 24], [7, 1.5], clamp) : 0;
  const pulse = 1 + 0.1 * interpolate(f, [P.bisa, P.bisa + 5, P.bisa + 14], [0, 1, 0], clamp);
  const rb = pop(f, P.bisa);
  const q = inP(f, P.apa, 6) * (1 - inP(f, P.iya, 6));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out, transform: `scale(${cam * (1 - 0.06 * (1 - out))})`, transformOrigin: '540px 640px'}}>
      <div style={{position: 'absolute', left: 390, top: 268, transform: `translateY(${Math.sin(f / 26) * 5}px)`}}>
        <Batu f={f} w={300} />
      </div>
      <div style={{position: 'absolute', left: 180, top: 664, width: 720, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: t, transform: `translateY(${(1 - t) * 160}px)`}}>
        <div style={{fontFamily: UF.script, fontSize: 96, color: U.goldLight, lineHeight: 1, marginBottom: 8}}>Umroh</div>
        <div style={{display: 'flex', alignItems: 'baseline', transform: `rotate(${shake}deg) scale(${pulse})`}}>
          <div style={{...big, fontSize: 190}}>10 JUTA</div>
          <div style={{...big, fontSize: 140, width: 84 * q, overflow: 'hidden', opacity: q, marginLeft: 10 * q}}>?!</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 180, top: 990, width: 720, display: 'flex', justifyContent: 'center'}}>
        <div style={{...RIBBON, fontFamily: UF.script, fontSize: 64, lineHeight: 1, padding: '6px 44px 16px', opacity: Math.min(1, rb), transform: `rotate(-2deg) scale(${rb})`}}>Bisa!</div>
      </div>
    </div>
  );
};
