import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Outro} from '../components/Outro';
import {SCENES} from '../data/timeline';

// 28,2–34 dtk: logo asli, tagline muncul huruf per huruf, tombol pill navy.
export const AjakanScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.ajakan.from;
  return <Outro f={f} timing={{logoIn: 846, tagline: [856, 884], pillIn: 900}} />;
};
