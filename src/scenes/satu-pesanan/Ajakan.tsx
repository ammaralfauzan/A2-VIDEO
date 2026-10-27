import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {Button} from '../../components/Button';
import {clamp, ease, sp, textIn} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-satu-pesanan';
import {color, font, radius} from '../../theme';

// Penutup: Gigi turun ke posisi gear di huruf A, huruf A dan angka 2 masuk mengelilinginya,
// lalu Gigi menutup mata, berputar pas, dan menjadi gear logo. Wordmark, tombol, tagline menyusul.
// Logo memakai lapisan piksel asli (scripts/split-logo.py), tidak digambar ulang.

export const LOGO_SIZE = 960;
// Logo + ajakan satu kelompok, ditengahkan vertikal di area aman (y 220–1500, pusat 860):
// isi logo 0,494 x ukuran, jarak 64, label 54, jarak 20, tombol 116.
const CTA = {gap: 64, label: 54, labelGap: 20, pill: 116};
const GROUP_H = 0.494 * LOGO_SIZE + CTA.gap + CTA.label + CTA.labelGap + CTA.pill;
export const LOGO_CONTENT_TOP = Math.round(860 - GROUP_H / 2);
const SRC = 1254;
const K = LOGO_SIZE / SRC;
const LOGO_LEFT = 540 - LOGO_SIZE / 2;
const LOGO_TOP = LOGO_CONTENT_TOP - 0.231 * LOGO_SIZE;
const LABEL_TOP = LOGO_CONTENT_TOP + 0.494 * LOGO_SIZE + CTA.gap;
export const PILL_TOP = LABEL_TOP + CTA.label + CTA.labelGap;

// Gear di file asli: pusat (520, 641), ujung gigi 70 px. Ukuran Gigi = lebar viewBox 160 untuk jari-jari 70.
export const GEAR_TARGET = {x: LOGO_LEFT + 520 * K, y: LOGO_TOP + 641 * K, size: (160 / SRC) * LOGO_SIZE};

export const OUTRO = (() => {
  const start = sf(S.logo) - 12;
  const pill = wf(S.ajakan, 0) - 2; // "Konsultasi gratis di"
  const url = wf(S.ajakan, 3) - 2; // "a2automate.com" 
  return {
    start, // Gigi ancang-ancang
    hop: start + 8, // melompat
    land: start + 30, // mendarat di posisi gear
    aIn: start + 28,
    twoIn: start + 34,
    mergeFrom: start + 38, // menutup mata, berputar pas
    mergeTo: start + 52,
    swap: [start + 50, start + 56] as [number, number], // Gigi -> gear asli
    word: start + 44,
    pill,
    url,
    tag: [pill + 8, pill + 32] as [number, number],
  };
})();

const Layer: React.FC<{name: string; style?: React.CSSProperties}> = ({name, style}) => (
  <Img src={staticFile(`logo/parts/${name}.png`)} style={{position: 'absolute', left: LOGO_LEFT, top: LOGO_TOP, width: LOGO_SIZE, height: LOGO_SIZE, ...style}} />
);

// Masuk bergaya sama dengan elemen lain: spring, blur ke tajam, bergeser sedikit.
const enter = (f: number, at: number, dx: number, dy: number, origin: string): React.CSSProperties => {
  const p = sp(f, at, 14);
  return {
    opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
    filter: `blur(${(1 - p) * 8}px)`,
    transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) scale(${0.92 + 0.08 * p})`,
    transformOrigin: origin,
  };
};

// Tombol URL: muncul dengan spring sedikit membesar, lalu denyut cincin berulang.
const urlIn = (f: number, at: number): React.CSSProperties => {
  const p = sp(f, at, 14);
  return {
    opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
    filter: `blur(${(1 - p) * 8}px)`,
    transform: `translateY(${(1 - p) * 16}px) scale(${0.9 + 0.1 * p})`,
  };
};
const ring = (f: number, at: number) => {
  const t = f - at - 14;
  if (t < 0) return {spread: 0, opacity: 0};
  const u = (t % 40) / 40;
  return {spread: 4 + u * 18, opacity: 0.55 * (1 - u)};
};

const pct = (x: number, y: number) => `${((x / SRC) * 100).toFixed(1)}% ${((y / SRC) * 100).toFixed(1)}%`;

export const Ajakan: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  if (f < o.aIn - 2) return null;
  // Gear asli langsung penuh di bawah Gigi; Gigi yang memudar di atasnya (bentuknya identik),
  // sehingga tidak ada frame setengah transparan yang tampak pucat.
  const gearOn = f >= o.swap[0] ? 1 : 0;
  const tag = interpolate(f, o.tag, [0, 1], {...clamp, easing: ease});
  // Tagline muncul huruf per huruf: jendela yang melebar bertahap dari kiri.
  const tagStep = Math.round(tag * 40) / 40;
  // rentang teks tagline di file asli (tanpa garis strip)
  const tagLeft = 277;
  const tagRight = 981;
  const clipRight = ((SRC - (tagLeft + (tagRight - tagLeft) * tagStep)) / SRC) * 100;
  return (
    <>
      <Layer name="a" style={enter(f, o.aIn, 0, 40, pct(470, 730))} />
      <Layer name="two" style={enter(f, o.twoIn, 48, 0, pct(800, 520))} />
      {gearOn > 0 ? <Layer name="gear" style={{opacity: gearOn}} /> : null}
      <Layer name="word" style={{...textIn(f, o.word)}} />
      {f >= o.tag[0] ? <Layer name="tag" style={{clipPath: `inset(0 ${clipRight}% 0 0)`}} /> : null}
      {/* Ajakan dua tingkat: label kecil, lalu URL besar yang disorot. */}
      <div
        style={{
          position: 'absolute',
          left: 180,
          width: 720,
          top: LABEL_TOP,
          height: CTA.label,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: font.family,
          fontSize: 40,
          fontWeight: 500,
          color: color.navy,
          ...textIn(f, o.pill),
        }}
      >
        Konsultasi gratis di
      </div>
      <div style={{position: 'absolute', left: 180, width: 720, top: PILL_TOP, display: 'flex', justifyContent: 'center', ...urlIn(f, o.url)}}>
        <div style={{position: 'relative'}}>
          {/* cincin cahaya biru yang berdenyut pelan sebagai sorotan */}
          <div
            style={{
              position: 'absolute',
              inset: -ring(f, o.url).spread,
              borderRadius: radius.pill,
              border: `3px solid ${color.blue1}`,
              opacity: ring(f, o.url).opacity,
            }}
          />
          <Button
            label="a2automate.com"
            style={{height: CTA.pill, padding: '0 60px', fontSize: 52, letterSpacing: '-0.01em', boxShadow: '0 18px 40px rgba(11,22,48,0.22)'}}
          />
        </div>
      </div>
    </>
  );
};
