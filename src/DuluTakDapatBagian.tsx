import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {T, TF} from './brands/tams-consulting/theme';
import {BrollLayer} from './scenes/dulu-tak-dapat-bagian/Broll';
import {Caption} from './scenes/dulu-tak-dapat-bagian/Caption';
import {Panggung} from './scenes/dulu-tak-dapat-bagian/Panggung';
import {Penutup} from './scenes/dulu-tak-dapat-bagian/Penutup';
import {Sfx} from './scenes/dulu-tak-dapat-bagian/Sfx';

// "Siapa yang Menentukan Bagian Waris?" (slug dulu-tak-dapat-bagian, Tams Consulting): riwayat Jabir bin Abdullah
// (HR. Bukhari 4577, Muslim 1616) lalu QS An-Nisa 4:11 dan 4:7. Kartu arang "SEBELUM AYAT TURUN" bergeser sudut daun
// ke kartu terang "SESUDAH AYAT TURUN". Bidang rata arang + oranye di latar putih, x 540, tanpa makhluk bernyawa,
// tanpa pecahan atau angka bagian, tanpa ajakan.
export const DuluTakDapatBagian: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: T.bg, fontFamily: TF.text, color: T.ink, overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: -190, top: -140, width: 520, height: 520, borderRadius: '50%', border: `2px solid ${T.line}`}} />
      <div style={{position: 'absolute', left: -210, bottom: -170, width: 480, height: 480, borderRadius: '50%', background: T.orangeSoft, opacity: 0.6}} />
      <Panggung f={f} />
      <Penutup f={f} />
      <BrollLayer />
      <Caption />
      <Html5Audio src={staticFile('audio/vo-dulu-tak-dapat-bagian.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none', zIndex: 99}} /> : null}
    </AbsoluteFill>
  );
};
