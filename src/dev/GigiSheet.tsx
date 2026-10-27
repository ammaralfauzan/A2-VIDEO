import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Gigi, Mood} from '../components/Gigi';
import {color, font} from '../theme';

// Lembar ekspresi Gigi untuk review desain maskot (tidak dirender ke video).
const MOODS: Mood[] = ['biasa', 'senang', 'puas', 'kaget', 'cemas', 'lelah', 'mikir', 'kedip'];

export const GigiSheet: React.FC = () => (
  <AbsoluteFill style={{background: color.canvas, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', rowGap: 30, columnGap: 40, padding: 40, fontFamily: font.family}}>
    {MOODS.map((m) => (
      <div key={m} style={{width: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        <Gigi size={190} mood={m} sweat={m === 'lelah' || m === 'cemas' ? 1 : 0} />
        <div style={{fontSize: 30, fontWeight: 600, color: color.navy}}>{m}</div>
      </div>
    ))}
  </AbsoluteFill>
);
