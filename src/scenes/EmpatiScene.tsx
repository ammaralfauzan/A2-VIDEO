import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {AppScreen} from '../components/AppScreen';
import {useVertical} from '../components/Layout';
import {clamp, textIn} from '../components/motion';
import {SCENES} from '../data/timeline';
import {color, font} from '../theme';

// 24,1–28,2 dtk: jendela menjauh dan memudar, kalimat empatik besar di tengah.
export const EmpatiScene: React.FC = () => {
  const vertical = useVertical();
  const f = useCurrentFrame() + SCENES.empati.from;
  const out = interpolate(f, [832, 844], [1, 0], clamp);
  return (
    <>
      <AppScreen f={f} />
      {/* Versi vertikal menata teks empati sendiri di area aman. */}
      {vertical ? null : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            fontFamily: font.family,
            opacity: out,
            zIndex: 30,
          }}
        >
          {/* Muncul saat "Kami tidak mengganti tim Anda." (24,25 dtk) */}
          <div style={{fontSize: font.caption, fontWeight: 500, color: color.muted, ...textIn(f, 727)}}>
            Kami tidak mengganti tim Anda.
          </div>
          {/* Muncul saat "Kami memberi mereka waktu pulang." (26,2 dtk) */}
          <div style={{fontSize: font.hook, fontWeight: 600, color: color.navy, letterSpacing: '-0.02em', ...textIn(f, 786)}}>
            Memberi mereka waktu pulang.
          </div>
        </div>
      )}
    </>
  );
};
