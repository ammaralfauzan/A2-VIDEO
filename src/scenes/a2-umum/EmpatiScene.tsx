import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {AppScreenUmum} from '../../components/AppScreenUmum';
import {useVertical} from '../../components/Layout';
import {clamp, textIn} from '../../components/motion';
import {U_SCENES} from '../../data/timeline-a2-umum';
import {color, font} from '../../theme';

// 23,6–28,7 dtk: dashboard menjauh dan memudar, kalimat empatik besar di tengah.
export const EmpatiScene: React.FC = () => {
  const vertical = useVertical();
  const f = useCurrentFrame() + U_SCENES.empati.from;
  const out = interpolate(f, [848, 860], [1, 0], clamp);
  return (
    <>
      <AppScreenUmum f={f} />
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
          {/* "Kami tidak mengganti tim Anda." (23,64 dtk) */}
          <div style={{fontSize: font.caption, fontWeight: 500, color: color.muted, ...textIn(f, 712)}}>
            Kami tidak mengganti tim Anda.
          </div>
          {/* "Kami memberi mereka waktu untuk hal yang lebih penting." (25,56 dtk) */}
          <div style={{fontSize: font.hook, fontWeight: 600, color: color.navy, letterSpacing: '-0.02em', ...textIn(f, 767)}}>
            Waktu untuk yang lebih penting.
          </div>
        </div>
      )}
    </>
  );
};
