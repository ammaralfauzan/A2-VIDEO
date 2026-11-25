import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {T, TF} from '../../brands/tams-consulting/theme';
import {CX, P} from './layout';

// Penutup di tengah x 540: "Kebiasaan keluarga" dicoret, lalu "Ketetapan Allah subhanahu wa ta'ala" oranye, garis pendek, logo asli. Tanpa ajakan.
export const Penutup: React.FC<{f: number}> = ({f}) => {
  const k = interpolate(f, [P.kebiasaan, P.kebiasaan + 12], [0, 1], {...clamp, easing: ease});
  const c = interpolate(f, [P.coret, P.coret + 10], [0, 1], {...clamp, easing: ease});
  const h = interpolate(f, [P.ketetapan, P.ketetapan + 12], [0, 1], {...clamp, easing: ease});
  const l = interpolate(f, [P.logo, P.logo + 14], [0, 1], {...clamp, easing: ease});
  if (k <= 0) return null;
  return (
    <>
      <div style={{position: 'absolute', left: CX - 360, width: 720, top: 470, textAlign: 'center', opacity: k * (1 - 0.45 * c), filter: `blur(${(1 - k) * 8}px)`, transform: `translateY(${(1 - k) * 10}px)`}}>
        <span style={{position: 'relative', display: 'inline-block', fontFamily: TF.head, fontWeight: 800, fontSize: 54, letterSpacing: -0.5, color: T.ink2}}>
          Kebiasaan keluarga
          <span style={{position: 'absolute', left: -10, right: -10, top: '52%', height: 7, borderRadius: 4, background: T.ink, transformOrigin: 'left center', transform: `scaleX(${c})`}} />
        </span>
      </div>
      {h > 0 ? (
        <div style={{position: 'absolute', left: CX - 360, width: 720, top: 590, textAlign: 'center', opacity: h, filter: `blur(${(1 - h) * 8}px)`, transform: `translateY(${(1 - h) * 10}px)`}}>
          <div style={{fontFamily: TF.head, fontWeight: 800, fontSize: 74, lineHeight: 1.08, letterSpacing: -1, color: T.ink}}>
            Ketetapan <span style={{color: T.orange}}>Allah</span>
          </div>
          <div style={{fontFamily: TF.text, fontWeight: 600, fontSize: 32, color: T.ink2, marginTop: 8}}>subhanahu wa ta&apos;ala</div>
          <div style={{width: 96, height: 6, borderRadius: 3, background: T.orange, margin: '26px auto 0', transform: `scaleX(${h})`}} />
        </div>
      ) : null}
      {l > 0 ? (
        <Img src={staticFile('brands/tams-consulting/logo-lengkap.png')} style={{position: 'absolute', left: CX - 240, top: 880, width: 480, opacity: l, transform: `scale(${0.96 + 0.04 * l})`}} />
      ) : null}
    </>
  );
};
