import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreen} from '../components/AppScreen';
import {MessyDesktop} from '../components/MessyDesktop';
import {SCENES} from '../data/timeline';

// 9–11 dtk: jendela tersedot ke satu titik, mekar jadi A2 Sekolah, klik "Otomatiskan".
export const TitikBalikScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.titikBalik.from;
  return (
    <>
      <MessyDesktop f={f} collapseStart={SCENES.titikBalik.from + 2} />
      <AppScreen f={f} />
    </>
  );
};
