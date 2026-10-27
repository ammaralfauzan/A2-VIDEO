import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Captions} from './components/Caption';
import {Clock} from './components/Clock';
import {Cursor} from './components/Cursor';
import {clamp} from './components/motion';
import {SCENES} from './data/timeline';
import {AjakanScene} from './scenes/AjakanScene';
import {EmpatiScene} from './scenes/EmpatiScene';
import {HookScene} from './scenes/HookScene';
import {KirimScene} from './scenes/KirimScene';
import {LaporanScene} from './scenes/LaporanScene';
import {MasalahScene} from './scenes/MasalahScene';
import {RaporScene} from './scenes/RaporScene';
import {SppScene} from './scenes/SppScene';
import {TitikBalikScene} from './scenes/TitikBalikScene';
import {color, font} from './theme';

const ORDER = [
  ['hook', HookScene],
  ['masalah', MasalahScene],
  ['titikBalik', TitikBalikScene],
  ['rapor', RaporScene],
  ['kirim', KirimScene],
  ['spp', SppScene],
  ['laporan', LaporanScene],
  ['empati', EmpatiScene],
  ['ajakan', AjakanScene],
] as const;

// Adegan + kursor, tanpa latar, suara, jam, dan caption. Dipakai juga oleh versi 9:16.
export const MainStage: React.FC = () => (
  <>
    {ORDER.map(([key, Scene]) => (
      <Sequence key={key} name={key} from={SCENES[key].from} durationInFrames={SCENES[key].dur}>
        <Scene />
      </Sequence>
    ))}
    <Cursor />
  </>
);

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  // Kanvas berubah ke putih permukaan menjelang logo (file logo berlatar putih).
  const toWhite = interpolate(frame, [830, 844], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      <MainStage />
      <Html5Audio src={staticFile('audio/vo.mp3')} />
      <Clock />
      <Captions />
    </AbsoluteFill>
  );
};
