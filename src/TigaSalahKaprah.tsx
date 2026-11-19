import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KineticText} from './components/KineticText';
import {clamp} from './components/motion';
import {CHUNKS} from './data/timeline-tiga-salah-kaprah-otomatisasi';
import {GigiMelayang} from './scenes/tiga-salah-kaprah-otomatisasi/GigiMelayang';
import {Judul} from './scenes/tiga-salah-kaprah-otomatisasi/Judul';
import {Kartu} from './scenes/tiga-salah-kaprah-otomatisasi/Kartu';
import {TEXT_BOX} from './scenes/tiga-salah-kaprah-otomatisasi/layout';
import {OUTRO, Penutup} from './scenes/tiga-salah-kaprah-otomatisasi/Penutup';
import {Sfx} from './scenes/tiga-salah-kaprah-otomatisasi/Sfx';
import {color, font} from './theme';

// "Tiga Salah Kaprah soal Otomatisasi": explainer kinetik 9:16. Tiga kartu MITOS dicap lalu dibalik
// jadi FAKTA, teks kinetik di bawah, Gigi makin lega tiap kartu terbalik; penutup logo + ajakan halus.
export const TigaSalahKaprah: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  const toWhite = interpolate(f, [OUTRO.start, OUTRO.start + 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      <Judul f={f} />
      <Kartu f={f} />
      <Penutup f={f} />
      <GigiMelayang f={f} />
      <KineticText chunks={CHUNKS} box={TEXT_BOX} hideFrom={OUTRO.start} />
      <Html5Audio src={staticFile('audio/vo-tiga-salah-kaprah-otomatisasi.mp3')} />
      <Sfx />
      {safeGuide ? (
        <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} />
      ) : null}
    </AbsoluteFill>
  );
};
