import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Button} from '../components/Button';
import {Logo} from '../components/Logo';
import {clamp, ease, sp, textIn} from '../components/motion';
import {SCENES} from '../data/timeline';

// 28–30 dtk: logo asli, tagline muncul huruf per huruf, tombol pill navy.
export const AjakanScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.ajakan.from;
  const s = sp(f, 834, 12);
  // Reveal bertahap per huruf (±40 karakter tagline).
  const raw = interpolate(f, [850, 874], [0, 1], {...clamp, easing: ease});
  const tagline = Math.round(raw * 40) / 40;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Logo size={820} taglineReveal={tagline} style={{marginTop: 70, opacity: s, transform: `scale(${0.96 + 0.04 * s})`}} />
      <div style={{position: 'absolute', top: 730, ...textIn(f, 868)}}>
        <Button label="Konsultasi gratis · a2automate.com" style={{height: 88, padding: '0 48px', fontSize: 36}} />
      </div>
    </div>
  );
};
