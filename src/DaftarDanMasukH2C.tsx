import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {U, UF} from './brands/h2c-umroh/theme';
import {clamp, ease} from './components/motion';
import {Broll} from './tips-umroh/Broll';
import {Caption} from './scenes/daftar-dan-masuk-h2c/Caption';
import {Bagian1, Bagian2, ChipBagian, Hook, Selesai} from './scenes/daftar-dan-masuk-h2c/Judul';
import {Kursor} from './scenes/daftar-dan-masuk-h2c/Kursor';
import {Layar} from './scenes/daftar-dan-masuk-h2c/Layar';
import {BROLL, P} from './scenes/daftar-dan-masuk-h2c/layout';
import {Penutup} from './scenes/daftar-dan-masuk-h2c/Penutup';
import {Sfx} from './scenes/daftar-dan-masuk-h2c/Sfx';

// "Daftar dan Masuk Akun H2C, Satu Video Selesai" (brand H2C Umroh, 9:16).
// Replika web umroh H2C tampilan HP di jendela peramban, kursor manusiawi, kartu bagian 1 DAFTAR / 2 MASUK,
// teks besar mengikuti suara, penutup logo + tombol emas umroh.h2c.or.id. Data fiktif.
export const DaftarDanMasukH2C: React.FC<{safeGuide?: boolean}> = ({safeGuide = false}) => {
  const f = useCurrentFrame();
  // jendela: naik masuk setelah judul, meredup saat kartu bagian/selesai, keluar saat penutup
  const enter = interpolate(f, [P.frameIn, P.frameIn + 16], [0, 1], {...clamp, easing: ease});
  const leave = interpolate(f, [P.outro, P.outro + 10], [0, 1], {...clamp, easing: ease});
  const dimOf = (r: [number, number]) => interpolate(f, [r[0], r[0] + 8, r[1] - 6, r[1] + 2], [0, 1, 1, 0], clamp);
  const dim = Math.max(dimOf(P.sec1), dimOf(P.sec2), dimOf(P.done));
  const frameOpacity = enter * (1 - leave) * (1 - dim);
  const frameScale = (0.94 + 0.06 * enter) * (1 - 0.05 * dim) * (1 - 0.06 * leave);
  return (
    <AbsoluteFill style={{background: U.bg, fontFamily: UF.text, overflow: 'hidden'}}>
      {/* cahaya lembut dan lingkaran pudar */}
      <div style={{position: 'absolute', left: -300, top: -260, width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,78,56,.85) 0%, rgba(10,31,23,0) 70%)'}} />
      <div style={{position: 'absolute', right: -260, bottom: 120, width: 640, height: 640, borderRadius: '50%', border: `2px solid ${U.goldLine}`, opacity: 0.45, transform: `rotate(${f * 0.05}deg)`}} />
      {frameOpacity > 0.001 ? (
        <div style={{position: 'absolute', inset: 0, opacity: frameOpacity, transform: `translateY(${(1 - enter) * 120}px) scale(${frameScale})`, transformOrigin: '540px 795px'}}>
          <Layar f={f} />
        </div>
      ) : null}
      <Hook f={f} />
      <Bagian1 f={f} />
      <Selesai f={f} />
      <Bagian2 f={f} />
      <ChipBagian f={f} />
      <Penutup f={f} />
      <Kursor f={f} />
      {BROLL.filter((b) => b.src).map((b) => (
        <Broll key={b.id} range={[b.from, b.to]} src={b.src as string} shift={b.shift ?? 0} />
      ))}
      <Caption f={f} />
      <Html5Audio src={staticFile('audio/vo-daftar-dan-masuk-h2c.mp3')} />
      <Sfx />
      {safeGuide ? <div style={{position: 'absolute', left: 60, top: 220, width: 840, height: 1280, border: '3px dashed #E5484D', pointerEvents: 'none'}} /> : null}
    </AbsoluteFill>
  );
};
