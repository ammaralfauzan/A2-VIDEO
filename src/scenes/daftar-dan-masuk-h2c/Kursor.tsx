import React from 'react';
import {Easing, interpolate} from 'remotion';
import {U} from '../../brands/h2c-umroh/theme';
import {clamp} from '../../components/motion';
import {CURSOR_KEYS, Key} from './layout';

// Kursor manusiawi: lintasan melengkung (bezier kuadrat, sisi lengkung berganti), cepat di awal lalu
// melambat sebelum tiba, sedikit goyang saat diam, mengecil saat klik + riak emas.
const land = Easing.bezier(0.3, 0.05, 0.12, 1);

export const cursorAt = (f: number): {x: number; y: number; vis: number} => {
  const K = CURSOR_KEYS;
  if (f <= K[0].f) return {x: K[0].x, y: K[0].y, vis: K[0].hide ? 0 : 1};
  let i = 0;
  while (i < K.length - 1 && K[i + 1].f <= f) i++;
  const a: Key = K[i];
  if (i === K.length - 1) return {x: a.x, y: a.y, vis: a.hide ? 0 : 1};
  const b: Key = K[i + 1];
  const t = land((f - a.f) / Math.max(1, b.f - a.f));
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const side = i % 2 === 0 ? 1 : -1;
  const cx = (a.x + b.x) / 2 + (-dy / (dist || 1)) * dist * 0.16 * side;
  const cy = (a.y + b.y) / 2 + (dx / (dist || 1)) * dist * 0.16 * side;
  const x = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * cx + t * t * b.x;
  const y = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * cy + t * t * b.y;
  const va = a.hide ? 0 : 1;
  const vb = b.hide ? 0 : 1;
  const vis = va === vb ? va : interpolate(f, [a.f, b.f], [va, vb], clamp);
  // goyang kecil seperti tangan (hanya terasa saat diam)
  const idle = dist < 4 ? 1 : 0.25;
  return {x: x + Math.sin(f / 17) * 1.6 * idle, y: y + Math.cos(f / 23) * 1.3 * idle, vis};
};

export const CLICK_FRAMES = CURSOR_KEYS.filter((k) => k.click).map((k) => k.f);

export const Kursor: React.FC<{f: number}> = ({f}) => {
  const {x, y, vis} = cursorAt(f);
  if (vis <= 0.01) return null;
  const near = CLICK_FRAMES.find((c) => f >= c - 3 && f <= c + 16);
  const press = near === undefined ? 0 : interpolate(f, [near - 3, near, near + 6], [0, 1, 0], clamp);
  const ring = near === undefined ? 0 : interpolate(f, [near, near + 16], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, pointerEvents: 'none', opacity: vis}}>
      {near !== undefined && f >= near ? (
        <div
          style={{
            position: 'absolute',
            left: x - 46,
            top: y - 46,
            width: 92,
            height: 92,
            borderRadius: '50%',
            border: `4px solid ${U.gold}`,
            transform: `scale(${0.3 + ring * 0.9})`,
            opacity: 1 - ring,
          }}
        />
      ) : null}
      <svg
        width={56}
        height={66}
        viewBox="0 0 28 33"
        style={{position: 'absolute', left: x - 4, top: y - 3, transform: `scale(${1 - press * 0.18})`, transformOrigin: '4px 3px', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.45))'}}
      >
        <path d="M2 2 L2 26 L8.5 20 L13 30.5 L17.5 28.6 L13.2 18.4 L22 18.4 Z" fill={U.ivory} stroke={U.bg} strokeWidth={2.2} strokeLinejoin="round" />
      </svg>
    </div>
  );
};
