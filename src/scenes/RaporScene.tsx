import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreen} from '../components/AppScreen';
import {SCENES} from '../data/timeline';

// 11–15 dtk: progress "Rapor Kelas 8A" 0/32 -> 32/32.
export const RaporScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.rapor.from;
  return <AppScreen f={f} />;
};
