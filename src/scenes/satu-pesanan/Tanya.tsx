import React from 'react';
import {interpolate} from 'remotion';
import {clamp, sp} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-satu-pesanan';
import {color, font, shadow} from '../../theme';

// "Mau tahu langkah mana di bisnis Anda yang bisa otomatis?" Gelembung tanya di atas Gigi.
export const Tanya: React.FC<{f: number}> = ({f}) => {
  const start = sf(S.tanya);
  if (f < start || f > sf(S.logo) + 10) return null;
  const p = sp(f, wf(S.tanya, 2) - 4, 12); // "langkah"
  const out = interpolate(f, [sf(S.logo) - 4, sf(S.logo) + 6], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 660,
        top: 330,
        width: 120,
        height: 120,
        borderRadius: 60,
        background: color.surface,
        boxShadow: shadow,
        border: `1px solid ${color.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.family,
        fontSize: 72,
        fontWeight: 600,
        color: color.navy,
        opacity: p * out,
        transform: `scale(${0.6 + 0.4 * p}) rotate(${(1 - p) * -12}deg)`,
      }}
    >
      ?
    </div>
  );
};
