import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Captions} from './components/Caption';
import {Clock} from './components/Clock';
import {Cursor} from './components/Cursor';
import {clamp} from './components/motion';
import {U_CAPTIONS, U_CLICK_LIST, U_CLOCK, U_CURSOR_FADE, U_CURSOR_PATH, U_DRAG_LIST, U_SCENES} from './data/timeline-a2-umum';
import {AjakanScene} from './scenes/a2-umum/AjakanScene';
import {EmpatiScene} from './scenes/a2-umum/EmpatiScene';
import {HookScene} from './scenes/a2-umum/HookScene';
import {InboxScene} from './scenes/a2-umum/InboxScene';
import {IndustriScene} from './scenes/a2-umum/IndustriScene';
import {LaporanScene} from './scenes/a2-umum/LaporanScene';
import {MasalahScene} from './scenes/a2-umum/MasalahScene';
import {TagihanScene} from './scenes/a2-umum/TagihanScene';
import {TitikBalikScene} from './scenes/a2-umum/TitikBalikScene';
import {color, font} from './theme';

const ORDER = [
  ['hook', HookScene],
  ['masalah', MasalahScene],
  ['titikBalik', TitikBalikScene],
  ['inbox', InboxScene],
  ['tagihan', TagihanScene],
  ['laporan', LaporanScene],
  ['industri', IndustriScene],
  ['empati', EmpatiScene],
  ['ajakan', AjakanScene],
] as const;

// Adegan + kursor, tanpa latar, suara, jam, dan caption. Dipakai juga oleh versi 9:16.
export const A2UmumStage: React.FC = () => (
  <>
    {ORDER.map(([key, Scene]) => (
      <Sequence key={key} name={key} from={U_SCENES[key].from} durationInFrames={U_SCENES[key].dur}>
        <Scene />
      </Sequence>
    ))}
    <Cursor path={U_CURSOR_PATH} clicks={U_CLICK_LIST} drags={U_DRAG_LIST} fadeOut={U_CURSOR_FADE} />
  </>
);

// "Makin Tumbuh, Makin Sibuk": soft selling A2 Automation untuk usaha, klinik, sekolah, yayasan.
export const A2Umum: React.FC = () => {
  const frame = useCurrentFrame();
  // Kanvas berubah ke putih permukaan menjelang logo (file logo berlatar putih).
  const toWhite = interpolate(frame, [846, 860], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      <A2UmumStage />
      <Html5Audio src={staticFile('audio/vo-a2-umum.mp3')} />
      <Clock schedule={U_CLOCK} />
      <Captions cues={U_CAPTIONS} />
    </AbsoluteFill>
  );
};
