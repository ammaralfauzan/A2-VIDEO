import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease, textIn} from '../components/motion';
import {Eyebrow, Title} from './parts';
import {W} from './theme';
import {INTRO} from './timeline';

// Efek masuk: aerial Masjidil Haram (foto web umroh H2C) bergerak pelan dengan judul,
// lalu lingkaran berbingkai emas membuka dari wajah pembicara.

const R_MAX = 1420; // cukup untuk menutup sudut terjauh dari pusat wajah
export const revealRadius = (f: number) => interpolate(f, INTRO.reveal, [0, R_MAX], {...clamp, easing: ease});

export const IntroBackdrop: React.FC<{f: number}> = ({f}) => {
  if (f > INTRO.reveal[1] + 1) return null;
  const push = interpolate(f, [0, INTRO.reveal[1]], [1.0, 1.1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: W.bgDeep}}>
      <Img
        src={staticFile('broll/haram-aerial.jpg')}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '42% 60%', transform: `scale(${push})`}}
      />
      {/* gradasi hutan malam agar senada dengan kartu dan judul terbaca */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(4, 13, 8, .55) 0%, rgba(4, 13, 8, .15) 35%, rgba(4, 13, 8, .35) 60%, rgba(4, 13, 8, .88) 100%)',
        }}
      />
    </div>
  );
};

export const IntroTitle: React.FC<{f: number}> = ({f}) => {
  if (f > INTRO.reveal[0] + 10) return null;
  const out = interpolate(f, [INTRO.reveal[0] - 2, INTRO.reveal[0] + 8], [0, 1], {...clamp, easing: ease});
  return (
    <div
      style={{
        position: 'absolute',
        left: 180,
        width: 720,
        top: 1120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 26,
        opacity: 1 - out,
        filter: `blur(${out * 10}px)`,
        transform: `scale(${1 + out * 0.06})`,
      }}
    >
      <div style={textIn(f, INTRO.title)}>
        <Eyebrow text="Tips umroh" />
      </div>
      <Title f={f} at={INTRO.title + 4} size={96} align="center" lines={[[{t: 'Sebelum'}], [{t: 'daftar umroh', hl: true}]]} />
    </div>
  );
};

// Cincin emas tipis yang mengikuti tepi bukaan.
export const RevealRing: React.FC<{f: number}> = ({f}) => {
  if (f < INTRO.reveal[0] || f > INTRO.reveal[1]) return null;
  const r = revealRadius(f);
  const o = interpolate(f, [INTRO.reveal[0], INTRO.reveal[0] + 3, INTRO.reveal[1] - 4, INTRO.reveal[1]], [0, 1, 0.6, 0], clamp);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <circle cx={INTRO.center.x} cy={INTRO.center.y} r={r} fill="none" stroke={W.gold} strokeWidth={5} opacity={o} />
      <circle cx={INTRO.center.x} cy={INTRO.center.y} r={r + 16} fill="none" stroke={W.gold} strokeWidth={2} opacity={o * 0.4} />
    </svg>
  );
};
