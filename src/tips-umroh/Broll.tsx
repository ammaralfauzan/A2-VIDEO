import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease, sp} from '../components/motion';
import {Pill} from './parts';
import {W} from './theme';

// B-roll: foto asli H2C menyela pembicara. Latar diisi foto yang sama diburamkan (bukan diperbesar pecah),
// foto tajam dibingkai emas di area atas (y 370–900) agar tidak bertabrakan dengan kartu di bawahnya.
const FRAME = {left: 140, top: 370, width: 800, height: 530} as const;

export const Broll: React.FC<{f: number; range: [number, number]; src: string; caption: string; focus?: string}> = ({f, range, src, caption, focus = '50% 50%'}) => {
  const [from, to] = range;
  if (f < from - 1 || f > to) return null;
  const fill = interpolate(f, [from, from + 8, to - 8, to], [0, 1, 1, 0], {...clamp, easing: ease});
  const pIn = sp(f, from + 2, 18);
  const pOut = interpolate(f, [to - 8, to], [0, 1], {...clamp, easing: ease});
  const ken = interpolate(f, [from, to], [1.04, 1.14], clamp);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: fill}}>
        <Img src={staticFile(src)} style={{position: 'absolute', inset: -80, width: 1240, height: 2080, objectFit: 'cover', filter: 'blur(40px) saturate(120%)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4, 13, 8, .55) 0%, rgba(4, 13, 8, .45) 50%, rgba(4, 13, 8, .8) 100%)'}} />
      </div>
      <div
        style={{
          position: 'absolute',
          ...FRAME,
          borderRadius: 40,
          overflow: 'hidden',
          border: `2px solid ${W.goldLine}`,
          boxShadow: '0 60px 120px -50px rgba(0, 0, 0, .9)',
          opacity: interpolate(pIn, [0, 0.4], [0, 1], clamp) * (1 - pOut),
          filter: `blur(${(1 - pIn) * 10 + pOut * 8}px)`,
          transform: `translateY(${(1 - pIn) * 50 - pOut * 24}px) scale(${0.94 + 0.06 * pIn}) rotate(${(1 - pIn) * -2}deg)`,
        }}
      >
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, transform: `scale(${ken})`}} />
        <div style={{position: 'absolute', left: 28, bottom: 28, opacity: interpolate(f, [from + 10, from + 18], [0, 1], clamp)}}>
          <Pill text={caption} style={{fontSize: 28, padding: '12px 26px'}} />
        </div>
      </div>
    </>
  );
};
