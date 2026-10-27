import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreenUmum, UT} from '../../components/AppScreenUmum';
import {Island} from '../../components/Island';
import {U_SCENES} from '../../data/timeline-a2-umum';

// 15,6–18,1 dtk: seret toggle pengingat tagihan ke ON, island "128 tagihan terkirim".
export const TagihanScene: React.FC = () => {
  const f = useCurrentFrame() + U_SCENES.tagihan.from;
  return (
    <>
      <AppScreenUmum f={f} />
      <Island frame={f} start={UT.island} end={UT.islandEnd} text="128 tagihan terkirim" />
    </>
  );
};
