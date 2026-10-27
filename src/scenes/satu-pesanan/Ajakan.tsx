import React from 'react';
import {interpolate} from 'remotion';
import {Button} from '../../components/Button';
import {Logo} from '../../components/Logo';
import {clamp, ease, sp, textIn} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-satu-pesanan';

// "A2 Automation. Konsultasi gratis di a2automate.com." Logo asli, tagline huruf per huruf, tombol pill navy.
export const LOGO_SIZE = 960;
export const LOGO_CONTENT_TOP = 330;
export const PILL_TOP = LOGO_CONTENT_TOP + 0.494 * LOGO_SIZE + 56;

export const Ajakan: React.FC<{f: number}> = ({f}) => {
  const start = sf(S.logo);
  if (f < start - 2) return null;
  const s = sp(f, start, 12);
  const raw = interpolate(f, [start + 10, start + 38], [0, 1], {...clamp, easing: ease});
  const tagline = Math.round(raw * 40) / 40;
  const pillAt = wf(S.ajakan, 0) - 2;
  return (
    <>
      <Logo
        size={LOGO_SIZE}
        taglineReveal={tagline}
        style={{position: 'absolute', left: 540 - LOGO_SIZE / 2, top: LOGO_CONTENT_TOP - 0.231 * LOGO_SIZE, opacity: s, transform: `scale(${0.96 + 0.04 * s})`}}
      />
      <div style={{position: 'absolute', left: 180, width: 720, top: PILL_TOP, display: 'flex', justifyContent: 'center', ...textIn(f, pillAt)}}>
        <Button label="Konsultasi gratis · a2automate.com" style={{height: 88, padding: '0 40px', fontSize: 32}} />
      </div>
    </>
  );
};
