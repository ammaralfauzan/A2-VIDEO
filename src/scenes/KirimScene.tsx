import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AppScreen, T} from '../components/AppScreen';
import {Island} from '../components/Island';
import {SCENES} from '../data/timeline';

// 15–19 dtk: klik "Kirim ke wali murid", island "32 rapor terkirim", balasan wali murid.
export const KirimScene: React.FC = () => {
  const f = useCurrentFrame() + SCENES.kirim.from;
  return (
    <>
      <AppScreen f={f} />
      <Island frame={f} start={T.island} end={T.islandEnd} text="32 rapor terkirim" />
    </>
  );
};
