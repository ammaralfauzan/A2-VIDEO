import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {color, font, radius} from '../theme';
import {IconClock} from './Icons';
import {clamp, ease, sp} from './motion';

const fmt = (mins: number) => {
  const m = Math.floor(mins);
  return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}.${String(m % 60).padStart(2, '0')}`;
};

export type ClockSchedule = {
  night: {from: number; to: number; start: number; end: number}; // menit sejak 00.00
  nightFade: [number, number];
  dayAt: number; // frame mulai mode siang/pagi
  dayMinutes: number;
  dayIn: number;
  dayFade: [number, number];
};

// Jadwal "Jam 9 Malam": 21.07 -> 23.48 di adegan masalah, setelah otomatis 15.30.
const DEFAULT_SCHEDULE: ClockSchedule = {
  night: {from: 103, to: 302, start: 21 * 60 + 7, end: 23 * 60 + 48},
  nightFade: [317, 332],
  dayAt: 585,
  dayMinutes: 15 * 60 + 30,
  dayIn: 664,
  dayFade: [724, 738],
};

// Jam pojok kanan atas.
export const Clock: React.FC<{schedule?: ClockSchedule}> = ({schedule = DEFAULT_SCHEDULE}) => {
  const frame = useCurrentFrame();
  const {night: n} = schedule;
  const night = interpolate(frame, [n.from, n.to], [n.start, n.end], {...clamp, easing: ease});
  const isDay = frame >= schedule.dayAt;
  const mins = isDay ? schedule.dayMinutes : night;
  const nightOp = interpolate(frame, schedule.nightFade, [1, 0], clamp);
  const dayIn = sp(frame, schedule.dayIn);
  const dayOut = interpolate(frame, schedule.dayFade, [1, 0], clamp);
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
