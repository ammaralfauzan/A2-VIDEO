import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import type {Chunk} from '../data/timeline-satu-pesanan';
import {color, font} from '../theme';
import {clamp, ease} from './motion';

// Teks kinetik kata per kata: kata muncul tepat saat diucapkan (blur -> tajam, naik 8 px),
// sempat abu-abu sebentar lalu menggelap. Kata kunci tebal.
export const KineticText: React.FC<{chunks: Chunk[]; box: {left: number; width: number; top: number}; size?: number; hideFrom?: number}> = ({
  chunks,
  box,
  size = 64,
  hideFrom = Infinity,
}) => {
  const f = useCurrentFrame();
  if (f >= hideFrom) return null;
  const chunk = chunks.find((c) => f >= c.from - 1 && f < c.to);
  if (!chunk) return null;
  const out = interpolate(f, [chunk.to - 5, chunk.to], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: box.left,
        width: box.width,
        top: box.top,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        columnGap: size * 0.26,
        rowGap: size * 0.08,
        fontFamily: font.family,
        fontSize: size,
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
        opacity: out,
        zIndex: 50,
      }}
    >
      {chunk.words.map((w, i) => {
        const p = interpolate(f, [w.f - 1, w.f + 6], [0, 1], {...clamp, easing: ease});
        const dark = interpolate(f, [w.f + 4, w.f + 12], [0, 1], clamp);
        return (
          <span
            key={i}
            style={{
              fontWeight: w.bold ? 600 : 400,
              color: dark >= 1 ? color.navy : mix(dark),
              opacity: p,
              filter: `blur(${(1 - p) * 6}px)`,
              transform: `translateY(${(1 - p) * 8}px)`,
              display: 'inline-block',
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

// Abu-abu (muted) -> navy.
const mix = (t: number) => {
  const a = [0x6b, 0x73, 0x85];
  const b = [0x13, 0x25, 0x4a];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c.join(',')})`;
};
