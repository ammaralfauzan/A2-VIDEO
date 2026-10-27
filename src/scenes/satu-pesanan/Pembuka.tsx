import React from 'react';
import {interpolate} from 'remotion';
import {IconInbox} from '../../components/Icons';
import {clamp, ease, sp} from '../../components/motion';
import {color, font, radius, shadow} from '../../theme';
import {CHIP_TOP, P} from './layout';

// 0–3 dtk: "Satu pesanan masuk." Chip pesanan muncul; "tujuh langkah" menempelkan badge.
// Saat langkah mulai, chip naik ke puncak pohon dan menjadi akar diagram.
export const Pembuka: React.FC<{f: number}> = ({f}) => {
  if (f < P.chipIn() - 2 || f > P.grid() + 14) return null;
  const pop = sp(f, P.chipIn(), 12);
  const lift = interpolate(f, [P.stepIn(0) - 8, P.stepIn(0) + 6], [0, 1], {...clamp, easing: ease});
  const y = 430 + (CHIP_TOP.y - 430) * lift;
  const badge = sp(f, P.badge7(), 10);
  const fade = interpolate(f, [P.grid(), P.grid() + 10], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        width: 1080,
        top: y - 44,
        display: 'flex',
        justifyContent: 'center',
        opacity: interpolate(pop, [0, 0.4], [0, 1], clamp) * fade,
        transform: `scale(${(0.7 + 0.3 * pop) * (1 - 0.12 * lift)})`,
        zIndex: 12,
      }}
    >
      <div
        style={{
          height: 88,
          padding: '0 30px 0 18px',
          borderRadius: radius.pill,
          background: color.surface,
          boxShadow: shadow,
          border: `1px solid ${color.line}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontFamily: font.family,
          fontSize: 32,
          fontWeight: 600,
          color: color.navy,
        }}
      >
        <div style={{width: 56, height: 56, borderRadius: 28, background: color.canvas, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <IconInbox size={30} />
        </div>
        Pesanan baru
        {f >= P.badge7() - 1 ? (
          <div
            style={{
              marginLeft: 6,
              padding: '6px 16px',
              borderRadius: radius.pill,
              background: color.navy,
              color: color.surface,
              fontSize: 26,
              transform: `scale(${0.6 + 0.4 * badge})`,
              opacity: badge,
            }}
          >
            7 langkah
          </div>
        ) : null}
      </div>
    </div>
  );
};
