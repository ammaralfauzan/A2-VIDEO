import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KineticText} from './components/KineticText';
import {clamp} from './components/motion';
import {CHUNKS, HAS_AUDIO, S, sf} from './data/timeline-satu-pesanan';
import {Ajakan, OUTRO} from './scenes/satu-pesanan/Ajakan';
import {GigiTrack} from './scenes/satu-pesanan/GigiTrack';
import {Hitung} from './scenes/satu-pesanan/Hitung';
import {Hub} from './scenes/satu-pesanan/Hub';
import {LangkahGraph} from './scenes/satu-pesanan/LangkahGraph';
import {TEXT_BOX} from './scenes/satu-pesanan/layout';
import {Manusia} from './scenes/satu-pesanan/Manusia';
import {Pembuka} from './scenes/satu-pesanan/Pembuka';
import {Sfx} from './scenes/satu-pesanan/Sfx';
import {Tanya} from './scenes/satu-pesanan/Tanya';
import {color, font} from './theme';

// "Satu Pesanan, Tujuh Langkah": explainer 9:16 bergaya teks kinetik + diagram simpul + maskot Gigi.
// Tidak ada cut: semua adegan berganti lewat morf pada lapisan yang sama.
export const SatuPesanan: React.FC = () => {
  const f = useCurrentFrame();
  const toWhite = interpolate(f, [OUTRO.start, OUTRO.start + 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: color.surface, opacity: toWhite}} />
      <Pembuka f={f} />
      <Hitung f={f} />
      <LangkahGraph f={f} />
      <Hub f={f} />
      <Manusia f={f} />
      <Tanya f={f} />
      <Ajakan f={f} />
      <GigiTrack f={f} />
      <KineticText chunks={CHUNKS} box={TEXT_BOX} hideFrom={OUTRO.start + 2} />
      {HAS_AUDIO ? <Html5Audio src={staticFile('audio/vo-satu-pesanan.mp3')} /> : null}
      <Sfx />
    </AbsoluteFill>
  );
};
