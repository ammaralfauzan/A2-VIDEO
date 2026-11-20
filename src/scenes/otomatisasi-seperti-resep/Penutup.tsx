// Penutup tanpa Gigi (naskah: logo A2 asli, wordmark, lalu ajakan dua tingkat). Salinan pola
// src/scenes/tiga-salah-kaprah-otomatisasi/Penutup.tsx dengan timing video ini; lapisan logo asli, tidak digambar ulang.
import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {Button} from '../../components/Button';
import {clamp, ease, sp, textIn} from '../../components/motion';
import {S, sf, wf} from '../../data/timeline-otomatisasi-seperti-resep';
import {color, font, radius} from '../../theme';

export const LOGO_SIZE = 960;
const CTA = {gap: 64, label: 54, labelGap: 20, pill: 116};
const GROUP_H = 0.494 * LOGO_SIZE + CTA.gap + CTA.label + CTA.labelGap + CTA.pill;
export const LOGO_CONTENT_TOP = Math.round(860 - GROUP_H / 2);
const SRC = 1254;
const LOGO_LEFT = 540 - LOGO_SIZE / 2;
const LOGO_TOP = LOGO_CONTENT_TOP - 0.231 * LOGO_SIZE;
const LABEL_TOP = LOGO_CONTENT_TOP + 0.494 * LOGO_SIZE + CTA.gap;
export const PILL_TOP = LABEL_TOP + CTA.label + CTA.labelGap;

export const OUTRO = (() => {
  const start = sf(S.nama) - 12;
  const pill = sf(S.ajakan) - 2; // "Konsultasi gratis di"
  const url = wf(S.ajakan, 3) - 2; // "a2automate.com"
  return {start, gear: start + 10, aIn: start + 16, twoIn: start + 22, word: start + 30, pill, url, tag: [pill + 8, pill + 32] as [number, number]};
})();

const Layer: React.FC<{name: string; style?: React.CSSProperties}> = ({name, style}) => (
  <Img src={staticFile(`logo/parts/${name}.png`)} style={{position: 'absolute', left: LOGO_LEFT, top: LOGO_TOP, width: LOGO_SIZE, height: LOGO_SIZE, ...style}} />
);

const enter = (f: number, at: number, dx: number, dy: number, origin: string): React.CSSProperties => {
  const p = sp(f, at, 14);
  return {opacity: interpolate(p, [0, 0.5], [0, 1], clamp), filter: `blur(${(1 - p) * 8}px)`, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) scale(${0.92 + 0.08 * p})`, transformOrigin: origin};
};
const urlIn = (f: number, at: number): React.CSSProperties => {
  const p = sp(f, at, 14);
  return {opacity: interpolate(p, [0, 0.5], [0, 1], clamp), filter: `blur(${(1 - p) * 8}px)`, transform: `translateY(${(1 - p) * 16}px) scale(${0.9 + 0.1 * p})`};
};
const ring = (f: number, at: number) => {
  const t = f - at - 14;
  if (t < 0) return {spread: 0, opacity: 0};
  const u = (t % 40) / 40;
  return {spread: 4 + u * 18, opacity: 0.55 * (1 - u)};
};
const pct = (x: number, y: number) => `${((x / SRC) * 100).toFixed(1)}% ${((y / SRC) * 100).toFixed(1)}%`;

export const Penutup: React.FC<{f: number}> = ({f}) => {
  const o = OUTRO;
  if (f < o.gear - 2) return null;
  const tag = interpolate(f, o.tag, [0, 1], {...clamp, easing: ease});
  const tagStep = Math.round(tag * 40) / 40;
  const clipRight = ((SRC - (277 + (981 - 277) * tagStep)) / SRC) * 100;
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 50}}>
      <Layer name="gear" style={enter(f, o.gear, 0, 0, pct(520, 641))} />
      <Layer name="a" style={enter(f, o.aIn, 0, 40, pct(470, 730))} />
      <Layer name="two" style={enter(f, o.twoIn, 48, 0, pct(800, 520))} />
      <Layer name="word" style={{...textIn(f, o.word)}} />
      {f >= o.tag[0] ? <Layer name="tag" style={{clipPath: `inset(0 ${clipRight}% 0 0)`}} /> : null}
      <div style={{position: 'absolute', left: 180, width: 720, top: LABEL_TOP, height: CTA.label, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.family, fontSize: 40, fontWeight: 500, color: color.navy, ...textIn(f, o.pill)}}>
        Konsultasi gratis di
      </div>
      <div style={{position: 'absolute', left: 180, width: 720, top: PILL_TOP, display: 'flex', justifyContent: 'center', ...urlIn(f, o.url)}}>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', inset: -ring(f, o.url).spread, borderRadius: radius.pill, border: `3px solid ${color.blue1}`, opacity: ring(f, o.url).opacity}} />
          <Button label="a2automate.com" style={{height: CTA.pill, padding: '0 60px', fontSize: 52, letterSpacing: '-0.01em', boxShadow: '0 18px 40px rgba(11,22,48,0.22)'}} />
        </div>
      </div>
    </div>
  );
};
