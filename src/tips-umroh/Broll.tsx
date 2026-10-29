import React from 'react';
import {interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../components/motion';

// B-roll layar penuh dari video H2C: masuk dengan whip-zoom (besar + buram ke tajam), bergerak pelan,
// keluar memudar. Suara klip dimatikan; narasi pembicara tetap jalan. Kartu tetap di atasnya.
// `shift` menaikkan klip tajam agar bagian penting (wajah, makanan, judul) berada di atas kartu (y < 1000);
// celah di bawahnya diisi klip yang sama diburamkan, dengan tepi bawah klip tajam memudar.
const Clip: React.FC<{src: string; dur: number; shift: number; fadeOut: boolean}> = ({src, dur, shift, fadeOut}) => {
  const t = useCurrentFrame();
  const pIn = interpolate(t, [0, 7], [0, 1], {...clamp, easing: ease});
  const out = fadeOut ? interpolate(t, [dur - 6, dur], [0, 1], {...clamp, easing: ease}) : 0;
  const drift = interpolate(t, [0, dur], [1.0, 1.05], clamp);
  const fade = 'linear-gradient(180deg, black 0%, black 78%, transparent 100%)';
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: interpolate(pIn, [0, 0.5], [0, 1], clamp) * (1 - out)}}>
      <OffthreadVideo
        src={staticFile(src)}
        muted
        style={{position: 'absolute', inset: 0, width: 1080, height: 1920, transform: 'scale(1.25)', filter: 'blur(36px) brightness(.7)'}}
      />
      <OffthreadVideo
        src={staticFile(src)}
        muted
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

// fadeOut={false} bila klip lain langsung menimpanya, agar pembicara tidak sempat terlihat di sela pergantian.
export const Broll: React.FC<{range: [number, number]; src: string; shift?: number; fadeOut?: boolean}> = ({range, src, shift = 0, fadeOut = true}) => (
  <Sequence from={range[0]} durationInFrames={range[1] - range[0]} name={`broll ${src}`} layout="none">
    <Clip src={src} dur={range[1] - range[0]} shift={shift} fadeOut={fadeOut} />
  </Sequence>
);
