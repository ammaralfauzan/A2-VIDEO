import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {color, font, radius} from '../theme';
import {IconClock} from './Icons';
import {clamp, ease, sp} from './motion';

const fmt = (mins: number) => {
  const m = Math.floor(mins);
  return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}.${String(m % 60).padStart(2, '0')}`;
};

// Jam pojok kanan atas. Malam: 21.07 -> 23.48 di adegan masalah. Setelah otomatis: 15.30.
export const Clock: React.FC = () => {
  const frame = useCurrentFrame();
  const night = interpolate(frame, [103, 302], [21 * 60 + 7, 23 * 60 + 48], {...clamp, easing: ease});
  const isDay = frame >= 585;
  const mins = isDay ? 15 * 60 + 30 : night;
  const nightOp = interpolate(frame, [317, 332], [1, 0], clamp);
  const dayIn = sp(frame, 664);
  const dayOut = interpolate(frame, [724, 738], [1, 0], clamp);
  const opacity = isDay ? dayIn * dayOut : nightOp;
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        right: 48,
        height: 60,
        padding: '0 24px',
        borderRadius: radius.pill,
        background: color.surface,
        border: `1px solid ${color.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: font.family,
        fontWeight: 600,
        fontSize: font.ui,
        fontVariantNumeric: 'tabular-nums',
        color: isDay ? color.success : color.navy,
        opacity,
        transform: isDay ? `translateY(${(1 - dayIn) * 8}px)` : undefined,
        zIndex: 40,
      }}
    >
      <IconClock size={28} stroke={isDay ? color.success : color.navy} />
      {fmt(mins)}
    </div>
  );
};
