import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {T, TF} from './brands/tams-consulting/theme';
import {BrollLayer} from './scenes/penghalang-waris/Broll';
import {Caption} from './scenes/penghalang-waris/Caption';
import {Kartu} from './scenes/penghalang-waris/Kartu';
import {Panggung} from './scenes/penghalang-waris/Panggung';
import {Penutup} from './scenes/penghalang-waris/Penutup';
import {Sfx} from './scenes/penghalang-waris/Sfx';

// "Hubungan Darah Belum Tentu Cukup" (Tams Consulting): dua penghalang waris. Diagram kotak keluarga ke PEWARIS;
// kunci "HUBUNGAN DARAH" menyalakan jalur waris, lalu gembok BEDA AGAMA (HR. Bukhari 6764, Muslim 1614, jumhur)
// dan MEMBUNUH PEWARIS (kesepakatan ulama) masing-masing menahan satu kotak. Penutup: bila ragu, tanyakan kepada ahlinya.
// Pola tata letak dari wasiat-maksimal-sepertiga: judul tanpa kotak, panggung ilustrasi, teks bawah.
// Bidang rata arang + oranye di latar putih, ditengahkan di x 540, tanpa makhluk bernyawa, tanpa angka, tanpa jualan.
export const PenghalangWaris: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: T.bg, fontFamily: TF.text, color: T.ink, overflow: 'hidden'}}>
      {/* dekor lengkung pudar di sudut (dari lingkaran logo) */}
      <div style={{position: 'absolute', left: -190, top: -140, width: 520, height: 520, borderRadius: '50%', border: `2px solid ${T.line}`}} />
      <div style={{position: 'absolute', right: -210, bottom: -170, width: 480, height: 480, borderRadius: '50%', background: T.orangeSoft, opacity: 0.35}} />
      <Kartu f={f} />
      <Panggung f={f} />
      <Penutup f={f} />
      <BrollLayer />
      <Caption />
      <Html5Audio src={staticFile('audio/vo-penghalang-waris.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none', zIndex: 99}} /> : null}
    </AbsoluteFill>
  );
};
