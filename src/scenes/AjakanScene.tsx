import React from 'react';
import {useCurrentFrame} from 'remotion';
import {useVertical} from '../components/Layout';
import {Outro} from '../components/Outro';
import {SCENES} from '../data/timeline';

// 28,2–34 dtk: logo asli, tagline muncul huruf per huruf, tombol pill navy.
export const AjakanScene: React.FC = () => {
  const vertical = useVertical();
  const f = useCurrentFrame() + SCENES.ajakan.from;
  // Versi vertikal memakai penutup yang ditata ulang di area aman.
  return vertical ? null : <Outro f={f} timing={{logoIn: 846, tagline: [856, 884], pillIn: 900}} />;
};
