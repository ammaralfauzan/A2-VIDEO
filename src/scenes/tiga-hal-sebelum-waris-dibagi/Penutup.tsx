import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CX, P} from './layout';

// Penutup edukasi, ditengahkan di x 540 (revisi 1): kalimat penutup, garis oranye pendek, logo asli. Tanpa ajakan.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const h = interpolate(f, [P.headline, P.headline + 12], [0, 1], {...clamp, easing: ease});
  const l = interpolate(f, [P.logo, P.logo + 14], [0, 1], {...clamp, easing: ease});
  if (h <= 0) return null;
  return (
    <>
      <div style={{position: 'absolute', left: CX - 360, width: 720, top: 400, textAlign: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 68, lineHeight: 1.1, letterSpacing: -1, color: T.ink, opacity: h, filter: `blur(${(1 - h) * 8}px)`, transform: `translateY(${(1 - h) * 10}px)`}}>
        Urutan yang benar,
        <br />
        <span style={{color: T.orange}}>baru dibagi.</span>
      </div>
      <div style={{position: 'absolute', left: CX - 48, top: 640, width: 96, height: 6, borderRadius: 3, background: T.orange, opacity: h, transform: `scaleX(${h})`}} />
      {l > 0 ? (
        <Img src={staticFile('brands/tams-consulting/logo-lengkap.png')} style={{position: 'absolute', left: CX - 280, top: 740, width: 560, opacity: l, transform: `scale(${0.96 + 0.04 * l})`}} />
      ) : null}
    </>
  );
};
