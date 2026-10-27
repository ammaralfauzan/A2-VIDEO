import React from 'react';
import {useCurrentFrame} from 'remotion';
import {MessyDesktopUmum} from '../../components/MessyDesktopUmum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 3,7–9,3 dtk: balas chat, seret invoice ke chat, isi spreadsheet; jam ke 23.50.
export const MasalahScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.masalah.from;
  return <MessyDesktopUmum f={f} />;
};
