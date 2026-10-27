import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreen} from '../components/AppScreen';
import {SCENES} from '../data/timeline';

// 22–24 dtk: grafik "jam admin dihemat" menggambar dirinya, jam pojok 15.30.
export const LaporanScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.laporan.from;
  return <AppScreen f={f} />;
};
