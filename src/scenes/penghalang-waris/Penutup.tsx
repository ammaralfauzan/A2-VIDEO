import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CX, P} from './layout';

// Penutup netral: "Bila ragu, tanyakan kepada ahlinya." di zona judul (tanpa bingkai), logo Tams asli di panggung.
// Tanpa nomor, tanpa URL, tanpa ajakan jualan.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const h = interpolate(f, [P.headline, P.headline + 12], [0, 1], {...clamp, easing: ease});
  const r = interpolate(f, [P.headline + 10, P.headline + 24], [0, 1], {...clamp, easing: ease});
  const l = interpolate(f, [P.logo, P.logo + 14], [0, 1], {...clamp, easing: ease});
  if (h <= 0) return null;
  return (
    <>
      <div style={{position: 'absolute', left: CX - 360, width: 720, top: 300, textAlign: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 62, lineHeight: 1.1, letterSpacing: -1.5, color: T.ink, opacity: h, filter: `blur(${(1 - h) * 8}px)`, transform: `translateY(${(1 - h) * 12}px)`}}>
        Bila ragu,
        <br />
        <span style={{color: T.orange}}>
          tanyakan kepada
          <br />
          ahlinya.
        </span>
      </div>
      <div style={{position: 'absolute', left: CX - 40, top: 535, width: 80, height: 6, borderRadius: 3, background: T.orange, transform: `scaleX(${r})`}} />
      {l > 0 ? (
        <Img src={staticFile('brands/tams-consulting/logo-lengkap.png')} style={{position: 'absolute', left: CX - 220, top: 760, width: 440, opacity: l, transform: `scale(${0.96 + 0.04 * l})`}} />
      ) : null}
    </>
  );
};
