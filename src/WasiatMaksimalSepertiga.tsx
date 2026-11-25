import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {T, TF} from './brands/tams-consulting/theme';
import {BrollLayer} from './scenes/wasiat-maksimal-sepertiga/Broll';
import {Caption} from './scenes/wasiat-maksimal-sepertiga/Caption';
import {Kartu} from './scenes/wasiat-maksimal-sepertiga/Kartu';
import {Panggung} from './scenes/wasiat-maksimal-sepertiga/Panggung';
import {Penutup} from './scenes/wasiat-maksimal-sepertiga/Penutup';
import {Sfx} from './scenes/wasiat-maksimal-sepertiga/Sfx';

// "Kenapa Wasiat Dibatasi Sepertiga?" (Tams Consulting): kisah Sa'd bin Abi Waqqash. Satu batang harta arang:
// tawaran "seluruh" dan "setengah" dicoret, garis oranye terkunci di sepertiga, sisanya ke ahli waris; lalu sisa harta
// setelah kewajiban, dan tidak ada wasiat untuk ahli waris. Kartu atas memuat penjelasan dan sumber hadits bernomor.
// Revisi 25 Nov 2026: judul atas tanpa kotak, panggung ilustrasi benda per adegan (Panggung.tsx).
// Bidang rata arang + oranye di latar putih, ditengahkan di x 540, tanpa makhluk bernyawa, tanpa angka hitungan, tanpa ajakan.
export const WasiatMaksimalSepertiga: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: T.bg, fontFamily: TF.text, color: T.ink, overflow: 'hidden'}}>
      {/* dekor lengkung pudar di sudut (dari lingkaran logo) */}
      <div style={{position: 'absolute', right: -190, top: -140, width: 520, height: 520, borderRadius: '50%', border: `2px solid ${T.line}`}} />
      <div style={{position: 'absolute', left: -210, bottom: -170, width: 480, height: 480, borderRadius: '50%', background: T.orangeSoft, opacity: 0.35}} />
      <Kartu f={f} />
      <Panggung f={f} />
      <Penutup f={f} />
      <BrollLayer />
      <Caption />
      <Html5Audio src={staticFile('audio/vo-wasiat-maksimal-sepertiga.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none', zIndex: 99}} /> : null}
    </AbsoluteFill>
  );
};
