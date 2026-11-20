import React from 'react';
import {interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../../components/motion';
import {BROLL} from './layout';

// Pola src/tips-umroh/Broll.tsx: layar penuh, masuk whip-zoom (besar + buram ke tajam), suara klip dimatikan,
// keluar memudar. solid = tanpa pudar masuk (klip menimpa klip lain, tanpa celah di sambungan). `shift` menaikkan klip tajam agar bagian penting di atas kartu teks (y 1090–1300);
// celah di bawahnya diisi klip yang sama diburamkan, tepi bawah klip tajam memudar.
const Clip: React.FC<{src: string; dur: number; shift: number; start: number; whip: boolean; solid: boolean; fadeOut: boolean}> = ({src, dur, shift, start, whip, solid, fadeOut}) => {
  const t = useCurrentFrame();
  const pIn = whip ? interpolate(t, [0, 7], [0, 1], {...clamp, easing: ease}) : 1;
  const out = fadeOut ? interpolate(t, [dur - 6, dur], [0, 1], {...clamp, easing: ease}) : 0;
  const drift = interpolate(t, [0, dur], [1.0, 1.05], clamp);
  const fade = 'linear-gradient(180deg, black 0%, black 78%, transparent 100%)';
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: (whip && !solid ? interpolate(pIn, [0, 0.5], [0, 1], clamp) : 1) * (1 - out)}}>
      <OffthreadVideo
        src={staticFile(src)}
        muted
        trimBefore={start}
        style={{position: 'absolute', inset: 0, width: 1080, height: 1920, transform: 'scale(1.25)', filter: 'blur(36px) brightness(.8)'}}
      />
      <OffthreadVideo
        src={staticFile(src)}
        muted
        trimBefore={start}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          transformOrigin: '50% 30%',
          transform: `translateY(${shift}px) scale(${(1.22 - 0.22 * pIn) * drift})`,
          filter: `blur(${(1 - pIn) * 14}px)`,
          WebkitMaskImage: fade,
          maskImage: fade,
        }}
      />
    </div>
  );
};

export const Broll: React.FC<{range: {from: number; to: number}; src: string; start?: number; shift?: number; whip?: boolean; solid?: boolean; fadeOut?: boolean}> = ({
  range,
  src,
  start = 0,
  shift = 0,
  whip = true,
  solid = false,
  fadeOut = true,
}) => (
  <Sequence from={range.from} durationInFrames={range.to - range.from} name={`broll ${src}`} layout="none">
    <Clip src={src} dur={range.to - range.from} shift={shift} start={start} whip={whip} solid={solid} fadeOut={fadeOut} />
  </Sequence>
);

// 0..1: seberapa penuh B-roll menutup layar pada frame f (rampa 5 frame; klip pertama tanpa rampa masuk).
export const brollOn = (f: number) => {
  let best = 0;
  for (const r of Object.values(BROLL)) {
    const a = r.from <= 0 ? 1 : interpolate(f, [r.from, r.from + 5], [0, 1], clamp);
    const b = interpolate(f, [r.to - 5, r.to], [1, 0], clamp);
    best = Math.max(best, Math.min(a, b));
  }
  // dua klip B2 berurutan: tidak ada celah di sambungannya
  const joint = BROLL.b2a.to;
  if (f >= joint - 5 && f <= joint + 5) best = 1;
  return best;
};

// Bagian B-roll lengkap (disisipkan di bawah kartu teks dan di atas ilustrasi).
export const BrollLayer: React.FC = () => (
  <>
    <Broll range={BROLL.b1a} src="broll/resep-b1-panci.mp4" shift={-700} whip={false} />
    <Broll range={BROLL.b1b} src="broll/resep-b1-panci.mp4" start={120} shift={-700} />
    <Broll range={BROLL.b3} src="broll/resep-b3.mp4" shift={-400} />
    <Broll range={BROLL.b2a} src="broll/resep-b2-mi-bumbu.mp4" start={10} shift={-420} fadeOut={false} />
    <Broll range={BROLL.b2b} src="broll/resep-b2-mi-bumbu.mp4" start={160} shift={-420} solid />
  </>
);
