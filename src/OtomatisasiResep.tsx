import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KineticText} from './components/KineticText';
import {clamp} from './components/motion';
import {CHUNKS} from './data/timeline-otomatisasi-seperti-resep';
import {Alur} from './scenes/otomatisasi-seperti-resep/Alur';
import {BrollLayer, brollOn} from './scenes/otomatisasi-seperti-resep/Broll';
import {Dapur} from './scenes/otomatisasi-seperti-resep/Dapur';
import {Judul} from './scenes/otomatisasi-seperti-resep/Judul';
import {TEXT_BOX} from './scenes/otomatisasi-seperti-resep/layout';
import {OUTRO, Penutup} from './scenes/otomatisasi-seperti-resep/Penutup';
import {Sfx} from './scenes/otomatisasi-seperti-resep/Sfx';
import {color, font, radius, shadow} from './theme';

// "Otomatisasi Itu Seperti Resep": ilustrasi garis dapur 9:16 (panci, bahan, langkah) yang bermorf jadi
// simpul alur PEMICU -> BAHAN -> LANGKAH, dengan sisipan B-roll klip Bos; penutup logo + ajakan halus. Tanpa Gigi.
export const OtomatisasiResep: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  const toWhite = interpolate(f, [OUTRO.start, OUTRO.start + 14], [0, 1], clamp);
  const on = brollOn(f);
  const cardOn = f < OUTRO.start ? on : 0;
  return (
    <AbsoluteFill style={{background: color.canvas, fontFamily: font.family, overflow: 'hidden'}}>
      <Dapur f={f} end={OUTRO.start} />
      <Alur f={f} />
      <BrollLayer />
      {/* kartu putih di bawah teks saat B-roll menutup layar (tanpa backdrop-filter) */}
      <div style={{position: 'absolute', left: 140, width: 800, top: 1088, height: 210, borderRadius: radius.card, background: color.surface, boxShadow: shadow, opacity: cardOn * 0.96, zIndex: 40}} />
      <AbsoluteFill style={{background: color.surface, opacity: toWhite, zIndex: 45}} />
      <Judul f={f} />
      <Penutup f={f} />
      <KineticText chunks={CHUNKS} box={TEXT_BOX} hideFrom={OUTRO.start} />
      <Html5Audio src={staticFile('audio/vo-otomatisasi-seperti-resep.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none', zIndex: 99}} /> : null}
    </AbsoluteFill>
  );
};
