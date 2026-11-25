import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {U, UF} from './brands/h2c-umroh/theme';
import {clamp} from './components/motion';
import {Caption} from './scenes/akun-keluarga-h2c/Caption';
import {Langkah, PitaAtas} from './scenes/akun-keluarga-h2c/Judul';
import {camAt, camTransform} from './scenes/akun-keluarga-h2c/Kamera';
import {Kursor} from './scenes/akun-keluarga-h2c/Kursor';
import {BROLL, P} from './scenes/akun-keluarga-h2c/layout';
import {Broll} from './tips-umroh/Broll';
import {Meja} from './scenes/akun-keluarga-h2c/Meja';
import {Penutup} from './scenes/akun-keluarga-h2c/Penutup';
import {Sfx} from './scenes/akun-keluarga-h2c/Sfx';

// "Satu Akun untuk Sekeluarga" (brand H2C Umroh, 9:16). Meja 3D semu: kamera mendekat ke monitor tiap langkah,
// pindah ke ponsel saat ID dan sandi dikirim, angka langkah besar, empat kartu nama berdiri di meja.
// Penutup logo + tombol emas umroh.h2c.or.id. Data fiktif berlabel "contoh"; tanpa makhluk bernyawa.
export const AkunKeluargaH2C: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  const cam = camAt(f);
  const world = 1 - interpolate(f, [P.outro + 6, P.outro + 16], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: U.bg, fontFamily: UF.text, overflow: 'hidden'}}>
      {world > 0.001 ? (
        <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transformOrigin: '0 0', transform: camTransform(cam), opacity: world}}>
          <Meja f={f} dof={cam.dof} />
          <Kursor f={f} />
        </div>
      ) : null}
      {/* vinyet lembut agar tepi gelap seperti kamera nyata */}
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 45% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.45) 100%)', pointerEvents: 'none'}} />
      <PitaAtas f={f} />
      <Langkah f={f} />
      <Penutup f={f} />
      {BROLL.filter((b) => b.src).map((b) => (
        <Broll key={b.id} range={[b.from, b.to]} src={b.src as string} shift={b.shift ?? 0} />
      ))}
      <Caption f={f} />
      <Html5Audio src={staticFile('audio/vo-akun-keluarga-h2c.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} /> : null}
    </AbsoluteFill>
  );
};
