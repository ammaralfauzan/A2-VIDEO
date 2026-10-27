import React from 'react';
import {useCurrentFrame} from 'remotion';
import {MessyDesktop} from '../components/MessyDesktop';
import {SCENES} from '../data/timeline';

// 3–9 dtk: kursor bolak-balik rekap nilai dan chat, jam berjalan ke 23.48.
export const MasalahScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.masalah.from;
  return <MessyDesktop f={f} />;
};
