import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreen} from '../components/AppScreen';
import {SCENES} from '../data/timeline';

// 19–22 dtk: kursor seret toggle "Pengingat SPP otomatis" ke ON.
export const SppScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.spp.from;
  return <AppScreen f={f} />;
};
