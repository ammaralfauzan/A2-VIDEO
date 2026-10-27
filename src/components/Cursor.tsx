import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CLICK_LIST, CURSOR_PATH, CURSOR_VISIBLE, DRAG} from '../data/timeline';
import {color} from '../theme';
import {clamp, ease} from './motion';

const positionAt = (f: number) => {
  const path = CURSOR_PATH;
  if (f <= path[0].f) return path[0];
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = interpolate(f, [a.f, b.f], [0, 1], {...clamp, easing: ease});
      return {x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t};
    }
  }
  return path[path.length - 1];
};

// Seberapa "ditekan" tombol mouse (0..1) pada frame f.
export const pressAt = (f: number) => {
  let p = 0;
  for (const c of CLICK_LIST) {
    p = Math.max(p, interpolate(f, [c - 2, c, c + 3, c + 6], [0, 1, 1, 0], clamp));
  }
  p = Math.max(p, interpolate(f, [DRAG.from - 2, DRAG.from, DRAG.to, DRAG.to + 3], [0, 1, 1, 0], clamp));
  return p;
};

// Kursor global: satu lapisan di atas semua adegan agar gerakannya tidak terputus.
export const Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  const {x, y} = positionAt(frame);
  const press = pressAt(frame);
  const opacity = interpolate(frame, [CURSOR_VISIBLE.fadeOutFrom, CURSOR_VISIBLE.fadeOutTo], [1, 0], clamp);
  if (opacity <= 0) return null;
  const scale = 1 - press * 0.14;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `translate(-6px, -4px) scale(${scale})`,
        transformOrigin: '6px 4px',
        filter: 'drop-shadow(0 6px 10px rgba(11,22,48,0.25))',
        zIndex: 100,
      }}
    >
      <svg width="44" height="52" viewBox="0 0 22 26">
        <path
          d="M3 2 L3 21 L8 16.5 L11.5 24 L14.5 22.6 L11 15.2 L18 15.2 Z"
          fill={color.navyInk}
          stroke={color.surface}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
