import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Outro} from '../../components/Outro';
import {U_OUTRO} from '../../data/timeline-a2-umum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 28,7–34 dtk: logo asli, tagline huruf per huruf, tombol pill navy.
export const AjakanScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.ajakan.from;
  return <Outro f={f} timing={U_OUTRO} />;
};
