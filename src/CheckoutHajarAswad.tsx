import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {U, UF} from './brands/h2c-umroh/theme';
import {Pengumuman, Penutup, SemuaTingkat} from './scenes/checkout-hajar-aswad/Akhir';
import {Langkah1, Langkah2, Langkah3, Langkah4, Langkah5, Pembuka} from './scenes/checkout-hajar-aswad/Langkah';
import {Sfx} from './scenes/checkout-hajar-aswad/Sfx';
import {Jalur, Kepala, Ketuk, Label, Latar} from './scenes/checkout-hajar-aswad/Web';

// "Cara Checkout Paket Hajar Aswad" (Video 2 promo, brand H2C Umroh, 9:16), full visual.
// Bingkai = tampilan mobile web umroh.h2c.or.id (replika dari repo h2c-umroh), jalur lima langkah, titik ketuk emas,
// lencana tingkat dan gambar paket asli dari repo. Teks layar 1-3 kata. Data fiktif berlabel "contoh".
// Tanpa makhluk bernyawa. Suara Jefri dari Bos, tidak dipercepat.
export const CheckoutHajarAswad: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: U.bg, fontFamily: UF.text, overflow: 'hidden'}}>
      <Latar f={f} />
      <Kepala f={f} />
      <Jalur f={f} />
      <Pembuka f={f} />
      <Langkah1 f={f} />
      <Langkah2 f={f} />
      <Langkah3 f={f} />
      <Langkah4 f={f} />
      <Langkah5 f={f} />
      <Pengumuman f={f} />
      <SemuaTingkat f={f} />
      <Penutup f={f} />
      <Ketuk f={f} />
      <Label f={f} />
      <Html5Audio src={staticFile('audio/vo-checkout-hajar-aswad.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} /> : null}
    </AbsoluteFill>
  );
};
