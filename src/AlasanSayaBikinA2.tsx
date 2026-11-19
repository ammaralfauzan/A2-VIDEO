import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KineticText} from './components/KineticText';
import {clamp} from './components/motion';
import {CHUNKS} from './data/timeline-alasan-saya-bikin-a2';
import {GarisWaktu} from './scenes/alasan-saya-bikin-a2/GarisWaktu';
import {GigiJalan} from './scenes/alasan-saya-bikin-a2/GigiJalan';
import {Judul} from './scenes/alasan-saya-bikin-a2/Judul';
import {TEXT_BOX} from './scenes/alasan-saya-bikin-a2/layout';
import {OUTRO, Penutup} from './scenes/alasan-saya-bikin-a2/Penutup';
import {Sfx} from './scenes/alasan-saya-bikin-a2/Sfx';
import {color, font} from './theme';

// "Alasan Saya Bikin A2": cerita asal 9:16. Satu garis waktu pelan, tiga titik cerita,
// teks kinetik, Gigi menemani; garis melingkar jadi gear lalu logo. Tanpa cut, tanpa ajakan.
export const AlasanSayaBikinA2: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  const toWhite = interpolate(f, [OUTRO.start, OUTRO.start + 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      <Judul f={f} />
      <GarisWaktu f={f} />
      <Penutup f={f} />
      <GigiJalan f={f} />
      <KineticText chunks={CHUNKS} box={TEXT_BOX} hideFrom={OUTRO.start} />
      <Html5Audio src={staticFile('audio/vo-alasan-saya-bikin-a2.mp3')} />
      <Sfx />
      {safeGuide ? (
        <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} />
      ) : null}
    </AbsoluteFill>
  );
};
