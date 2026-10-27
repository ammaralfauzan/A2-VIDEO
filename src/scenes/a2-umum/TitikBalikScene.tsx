import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreenUmum} from '../../components/AppScreenUmum';
import {MessyDesktopUmum} from '../../components/MessyDesktopUmum';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 9,3–12,5 dtk: jendela tersedot, mekar jadi dashboard, Otomatiskan -> gear -> centang.
export const TitikBalikScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.titikBalik.from;
  return (
    <>
      <MessyDesktopUmum f={f} collapseStart={U_SCENES.titikBalik.from + 2} />
      <AppScreenUmum f={f} />
    </>
  );
};
