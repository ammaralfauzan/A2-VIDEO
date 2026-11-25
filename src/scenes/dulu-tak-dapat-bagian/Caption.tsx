import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {CHUNKS} from '../../data/timeline-dulu-tak-dapat-bagian';
import {T, TF} from '../../brands/tams-consulting/theme';
import {TEXT_BOX} from './layout';

// Teks bawah: kata muncul saat diucapkan (blur -> tajam, naik 8 px), kata kunci tebal, satu sorotan oranye.
// Lafaz penghormatan (shallallahu 'alaihi wa sallam, radhiyallahu 'anhu, subhanahu wa ta'ala) tampil utuh, lebih kecil.
export const Caption: React.FC = () => {
  const f = useCurrentFrame();
  const chunk = CHUNKS.find((c) => f >= c.from - 1 && f < c.to);
  if (!chunk) return null;
  const out = interpolate(f, [chunk.to - 5, chunk.to], [1, 0], clamp);
  const size = 56;
  return (
    <div style={{position: 'absolute', left: TEXT_BOX.left, width: TEXT_BOX.width, top: TEXT_BOX.top, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-start', alignItems: 'baseline', columnGap: size * 0.26, rowGap: size * 0.1, fontFamily: TF.text, fontSize: size, lineHeight: 1.14, letterSpacing: '-0.02em', opacity: out, zIndex: 50}}>
      {chunk.words.map((w, i) => {
        const p = interpolate(f, [w.f - 1, w.f + 6], [0, 1], {...clamp, easing: ease});
        const st = {opacity: p, filter: `blur(${(1 - p) * 6}px)`, transform: `translateY(${(1 - p) * 8}px)`};
        if (w.small) return <span key={i} style={{display: 'inline-block', fontSize: 36, fontWeight: 600, letterSpacing: 0, color: T.ink2, ...st}}>{w.text}</span>;
        return <span key={i} style={{display: 'inline-block', fontWeight: w.bold || w.orange ? 800 : 500, color: w.orange ? T.orange : T.ink, ...st}}>{w.text}</span>;
      })}
    </div>
  );
};
