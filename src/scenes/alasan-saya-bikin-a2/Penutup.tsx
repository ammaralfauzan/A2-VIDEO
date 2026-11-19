import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {clamp, ease, sp, textIn} from '../../components/motion';
import {ef, S} from '../../data/timeline-alasan-saya-bikin-a2';

// Penutup halus tanpa ajakan (keputusan Bos): Gigi turun ke posisi gear di huruf A,
// huruf A dan angka 2 masuk mengelilinginya, Gigi menjadi gear logo, wordmark dan tagline menyusul.
// Logo memakai lapisan piksel asli (scripts/split-logo.py), tidak digambar ulang.

export const LOGO_SIZE = 960;
// Tanpa ajakan, kelompok = isi logo saja (0,494 x ukuran), ditengahkan di y 860.
const LOGO_CONTENT_TOP = Math.round(860 - (0.494 * LOGO_SIZE) / 2);
const SRC = 1254;
const K = LOGO_SIZE / SRC;
const LOGO_LEFT = 540 - LOGO_SIZE / 2;
const LOGO_TOP = LOGO_CONTENT_TOP - 0.231 * LOGO_SIZE;

// Gear di file asli: pusat (520, 641), ujung gigi 70 px.
export const GEAR_TARGET = {x: LOGO_LEFT + 520 * K, y: LOGO_TOP + 641 * K, size: (160 / SRC) * LOGO_SIZE};

export const OUTRO = (() => {
  const start = ef(S.alasan) + 40; // Gigi sudah di dalam lingkaran, ancang-ancang
  return {
    start,
    hop: start + 8,
    land: start + 30, // tepat saat "A Dua Automation"
    aIn: start + 28,
    twoIn: start + 34,
    mergeFrom: start + 38,
    mergeTo: start + 52,
    swap: [start + 50, start + 56] as [number, number],
    word: start + 44,
    tag: [start + 58, start + 82] as [number, number],
  };
})();

const Layer: React.FC<{name: string; style?: React.CSSProperties}> = ({name, style}) => (
  <Img src={staticFile(`logo/parts/${name}.png`)} style={{position: 'absolute', left: LOGO_LEFT, top: LOGO_TOP, width: LOGO_SIZE, height: LOGO_SIZE, ...style}} />
);

const enter = (f: number, at: number, dx: number, dy: number, origin: string): React.CSSProperties => {
  const p = sp(f, at, 14);
  return {
    opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
    filter: `blur(${(1 - p) * 8}px)`,
    transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) scale(${0.92 + 0.08 * p})`,
    transformOrigin: origin,
  };
};

const pct = (x: number, y: number) => `${((x / SRC) * 100).toFixed(1)}% ${((y / SRC) * 100).toFixed(1)}%`;

export const Penutup: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  if (f < o.aIn - 2) return null;
  const gearOn = f >= o.swap[0];
  const tag = interpolate(f, o.tag, [0, 1], {...clamp, easing: ease});
  const tagStep = Math.round(tag * 40) / 40;
  const tagLeft = 277;
  const tagRight = 981;
  const clipRight = ((SRC - (tagLeft + (tagRight - tagLeft) * tagStep)) / SRC) * 100;
  return (
    <>
      <Layer name="a" style={enter(f, o.aIn, 0, 40, pct(470, 730))} />
      <Layer name="two" style={enter(f, o.twoIn, 48, 0, pct(800, 520))} />
      {gearOn ? <Layer name="gear" /> : null}
      <Layer name="word" style={{...textIn(f, o.word)}} />
      {f >= o.tag[0] ? <Layer name="tag" style={{clipPath: `inset(0 ${clipRight}% 0 0)`}} /> : null}
    </>
  );
};
