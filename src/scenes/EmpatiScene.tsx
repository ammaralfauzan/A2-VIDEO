import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {AppScreen} from '../components/AppScreen';
import {clamp, textIn} from '../components/motion';
import {SCENES} from '../data/timeline';
import {color, font} from '../theme';

// 24–28 dtk: jendela menjauh dan memudar, kalimat empatik besar di tengah.
export const EmpatiScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.empati.from;
  const out = interpolate(f, [822, 834], [1, 0], clamp);
  return (
    <>
      <AppScreen f={f} />
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
        <div style={{fontSize: font.caption, fontWeight: 500, color: color.muted, ...textIn(f, 738)}}>
          Kami tidak mengganti tim Anda.
        </div>
        <div style={{fontSize: font.hook, fontWeight: 600, color: color.navy, letterSpacing: '-0.02em', ...textIn(f, 770)}}>
          Memberi mereka waktu pulang.
        </div>
      </div>
    </>
  );
};
