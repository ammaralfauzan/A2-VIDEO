import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {T, TF} from './brands/tams-consulting/theme';
import {BrollLayer} from './scenes/tiga-hal-sebelum-waris-dibagi/Broll';
import {Caption} from './scenes/tiga-hal-sebelum-waris-dibagi/Caption';
import {Daftar} from './scenes/tiga-hal-sebelum-waris-dibagi/Daftar';
import {Penutup} from './scenes/tiga-hal-sebelum-waris-dibagi/Penutup';
import {Sfx} from './scenes/tiga-hal-sebelum-waris-dibagi/Sfx';
import {Stage} from './scenes/tiga-hal-sebelum-waris-dibagi/Stage';

// "Tiga Hal Sebelum Waris Dibagi" (Tams Consulting): satu blok harta mengalir turun melewati tiga gerbang
// (perawatan jenazah, utang, wasiat); sisanya baru sampai ke kotak ahli waris. Bidang rata arang + oranye di
// latar putih, tanpa orang/tangan, tanpa angka, tanpa ajakan. Sisipan B-roll klip Bos (slot di layout.ts).
export const TigaHalSebelumWaris: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: T.bg, fontFamily: TF.text, color: T.ink, overflow: 'hidden'}}>
      {/* dekor lengkung pudar di sudut (dari lingkaran logo) */}
      <div style={{position: 'absolute', right: -190, top: -140, width: 520, height: 520, borderRadius: '50%', border: `2px solid ${T.line}`}} />
      <div style={{position: 'absolute', left: -210, bottom: -170, width: 480, height: 480, borderRadius: '50%', background: T.orangeSoft, opacity: 0.6}} />
      <Stage f={f} />
      <Daftar f={f} />
      <Penutup f={f} />
      <BrollLayer />
      <Caption />
      <Html5Audio src={staticFile('audio/vo-tiga-hal-sebelum-waris-dibagi.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none', zIndex: 99}} /> : null}
    </AbsoluteFill>
  );
};
