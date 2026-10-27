import React from 'react';
import {interpolate} from 'remotion';
import {Button} from './Button';
import {Logo} from './Logo';
import {clamp, ease, sp, textIn} from './motion';

export type OutroTiming = {logoIn: number; tagline: [number, number]; pillIn: number};

// Penutup: logo asli, tagline muncul huruf per huruf, tombol pill navy.
export const Outro: React.FC<{f: number; timing: OutroTiming}> = ({f, timing}) => {
  const s = sp(f, timing.logoIn, 12);
  // Reveal bertahap per huruf (±40 karakter tagline).
  const raw = interpolate(f, timing.tagline, [0, 1], {...clamp, easing: ease});
  const tagline = Math.round(raw * 40) / 40;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Logo size={820} taglineReveal={tagline} style={{marginTop: 70, opacity: s, transform: `scale(${0.96 + 0.04 * s})`}} />
      <div style={{position: 'absolute', top: 730, ...textIn(f, timing.pillIn)}}>
        <Button label="Konsultasi gratis · a2automate.com" style={{height: 88, padding: '0 48px', fontSize: 36}} />
      </div>
    </div>
  );
};
