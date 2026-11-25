import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {CHUNKS} from '../../data/timeline-wasiat-maksimal-sepertiga';
import {T, TF} from '../../brands/tams-consulting/theme';
import {TEXT_BOX} from './layout';

// Teks bawah: kata muncul saat diucapkan (blur -> tajam, naik 8 px), kata kunci tebal, satu sorotan oranye.
// Aturan Brand Kit Tams (25 Nov 2026): kata "Nabi" di layar selalu diikuti "shallallahu 'alaihi wa sallam" (teks kecil abu).
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
        const nabi = /^Nabi\b/.test(w.text);
        return (
          <React.Fragment key={i}>
            <span style={{display: 'inline-block', fontWeight: w.bold || w.orange ? 800 : 500, color: w.orange ? T.orange : T.ink, ...st}}>{nabi ? w.text.replace(/[,:]$/, '') : w.text}</span>
            {nabi ? (
              <span style={{display: 'inline-block', fontSize: 26, fontWeight: 600, letterSpacing: 0, color: T.ink3, ...st}}>
                shallallahu &apos;alaihi wa sallam{/[,:]$/.test(w.text) ? w.text.slice(-1) : ''}
              </span>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
