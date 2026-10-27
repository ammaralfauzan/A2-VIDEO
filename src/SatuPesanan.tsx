import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KineticText} from './components/KineticText';
import {clamp} from './components/motion';
import {CHUNKS, HAS_AUDIO, S, sf} from './data/timeline-satu-pesanan';
import {Ajakan} from './scenes/satu-pesanan/Ajakan';
import {GigiTrack} from './scenes/satu-pesanan/GigiTrack';
import {Hitung} from './scenes/satu-pesanan/Hitung';
import {Hub} from './scenes/satu-pesanan/Hub';
import {LangkahGraph} from './scenes/satu-pesanan/LangkahGraph';
import {TEXT_BOX, WATERMARK_Y} from './scenes/satu-pesanan/layout';
import {Manusia} from './scenes/satu-pesanan/Manusia';
import {Pembuka} from './scenes/satu-pesanan/Pembuka';
import {Tanya} from './scenes/satu-pesanan/Tanya';
import {color, font} from './theme';

// "Satu Pesanan, Tujuh Langkah": explainer 9:16 bergaya teks kinetik + diagram simpul + maskot Gigi.
// Tidak ada cut: semua adegan berganti lewat morf pada lapisan yang sama.
export const SatuPesanan: React.FC = () => {
  const f = useCurrentFrame();
  const outroAt = sf(S.logo);
  const toWhite = interpolate(f, [outroAt - 10, outroAt + 4], [0, 1], clamp);
  const watermark = interpolate(f, [outroAt - 10, outroAt], [1, 0], clamp);
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
      <KineticText chunks={CHUNKS} box={TEXT_BOX} hideFrom={outroAt} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: 1080,
          top: WATERMARK_Y,
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 600,
          color: color.muted,
          opacity: 0.55 * watermark,
        }}
      >
        a2automate.com
      </div>
      {HAS_AUDIO ? <Html5Audio src={staticFile('audio/vo-satu-pesanan.mp3')} /> : null}
    </AbsoluteFill>
  );
};
