import React from 'react';
import {interpolate} from 'remotion';
import {U, UF} from '../../brands/h2c-umroh/theme';
import {clamp, ease} from '../../components/motion';
import {CHUNKS} from '../../data/timeline-umroh-10-juta';
import {CAPTION_BOX} from './layout';

// Teks besar di bawah panggung (maks. 6 kata), muncul kata per kata mengikuti suara; kata kunci emas.
export const Caption: React.FC<{f: number}> = ({f}) => {
  const c = CHUNKS.find((x) => f >= x.from && f < x.to);
  if (!c) return null;
  const out = interpolate(f, [c.to - 5, c.to], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: CAPTION_BOX.x,
        top: CAPTION_BOX.y,
        width: CAPTION_BOX.w,
        height: CAPTION_BOX.h,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        columnGap: 14,
        fontFamily: UF.text,
        fontWeight: 700,
        fontSize: 56,
        lineHeight: 1.18,
        textAlign: 'center',
        opacity: out,
      }}
    >
      {c.words.map((w, i) => {
        const p = interpolate(f, [w.f - 3, w.f + 4], [0, 1], {...clamp, easing: ease});
        return (
          <span key={i} style={{color: w.bold ? U.goldLight : U.ivory, opacity: 0.25 + 0.75 * p, transform: `translateY(${(1 - p) * 8}px)`, display: 'inline-block', textShadow: '0 4px 18px rgba(0,0,0,.45)'}}>
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
