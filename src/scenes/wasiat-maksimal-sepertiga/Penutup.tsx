import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CX, P} from './layout';

// Penutup edukasi: kalimat penutup di zona judul (tanpa bingkai), rumah dinaungi lengkung oranye di panggung
// (Panggung.tsx), logo asli di bawahnya. Tanpa ajakan.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const h = interpolate(f, [P.headline, P.headline + 12], [0, 1], {...clamp, easing: ease});
  const l = interpolate(f, [P.logo, P.logo + 14], [0, 1], {...clamp, easing: ease});
  if (h <= 0) return null;
  return (
    <>
      <div style={{position: 'absolute', left: CX - 360, width: 720, top: 330, textAlign: 'center', fontFamily: TF.head, fontWeight: 800, fontSize: 68, lineHeight: 1.1, letterSpacing: -1.5, color: T.ink, opacity: h, filter: `blur(${(1 - h) * 8}px)`, transform: `translateY(${(1 - h) * 12}px)`}}>
        Batas yang
        <br />
        <span style={{color: T.orange}}>menjaga keluarga.</span>
      </div>
      {l > 0 ? (
        <Img src={staticFile('brands/tams-consulting/logo-lengkap.png')} style={{position: 'absolute', left: CX - 200, top: 985, width: 400, opacity: l, transform: `scale(${0.96 + 0.04 * l})`}} />
      ) : null}
    </>
  );
};
