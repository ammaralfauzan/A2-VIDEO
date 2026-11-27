import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {U, UF} from './brands/h2c-umroh/theme';
import {Adil} from './scenes/umroh-10-juta/Adil';
import {Penutup, Syarat, Teaser} from './scenes/umroh-10-juta/Akhir';
import {Caption} from './scenes/umroh-10-juta/Caption';
import {Hook} from './scenes/umroh-10-juta/Hook';
import {Layar} from './scenes/umroh-10-juta/Layar';
import {Sfx} from './scenes/umroh-10-juta/Sfx';
import {Tingkat} from './scenes/umroh-10-juta/Tingkat';
import {Undian} from './scenes/umroh-10-juta/Undian';

// "Umroh 10 Juta" (promo paket Hajar Aswad, brand H2C Umroh, 9:16, jalur 2D motion).
// Batu hitam berbingkai perak (benda), 10 JUTA, layar H2C (replika "contoh"), empat kartu tingkat,
// kupon kode unik (contoh), tabungan utuh vs hadiah terpisah, syarat, isyarat Video 2, penutup tombol emas.
// Tanpa makhluk bernyawa. Suara Jefri dari Bos, tidak dipercepat.
export const Umroh10Juta: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: U.bg, fontFamily: UF.text, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -300, top: -240, width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,56,.85) 0%, rgba(10,31,23,0) 70%)'}} />
      <div style={{position: 'absolute', right: -280, bottom: 140, width: 660, height: 660, borderRadius: '50%', border: `2px solid ${U.goldLine}`, opacity: 0.4, transform: `rotate(${f * 0.05}deg)`}} />
      {/* meja: bidang zamrud sedikit lebih terang di bawah panggung */}
      <div style={{position: 'absolute', left: -100, right: -100, top: 1060, height: 900, background: `linear-gradient(180deg, ${U.bg2} 0%, ${U.bg} 70%)`, borderTop: `2px solid ${U.goldSoft}`}} />
      <Hook f={f} />
      <Layar f={f} />
      <Undian f={f} />
      <Adil f={f} />
      <Tingkat f={f} />
      <Syarat f={f} />
      <Teaser f={f} />
      <Penutup f={f} />
      <Caption f={f} />
      <Html5Audio src={staticFile('audio/vo-umroh-10-juta.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} /> : null}
    </AbsoluteFill>
  );
};
