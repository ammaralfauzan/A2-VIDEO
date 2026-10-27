import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
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

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  // Kanvas berubah ke putih permukaan menjelang logo (file logo berlatar putih).
  const toWhite = interpolate(frame, [820, 834], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      {ORDER.map(([key, Scene]) => (
        <Sequence key={key} name={key} from={SCENES[key].from} durationInFrames={SCENES[key].dur}>
          <Scene />
        </Sequence>
      ))}
      <Clock />
      <Captions />
      <Cursor />
    </AbsoluteFill>
  );
};
