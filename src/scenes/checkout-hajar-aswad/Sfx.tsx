import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {TAP_FRAMES} from './LangkahWeb';
import {P} from './layout';

// Efek suara halus (tanpa musik, sesuai naskah), palet umroh. Jauh di bawah narator.
export const SFX_GAIN = 0.2;
type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [
    {f: P.titleIn, src: 'umroh/wush', v: 0.5},
    {f: P.cards, src: 'umroh/sset', v: 0.45},
    {f: P.ribbon, src: 'umroh/ting-1', v: 0.5},
    {f: P.step1[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.step2[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.keDetail, src: 'umroh/wush', v: 0.4},
    {f: P.step3[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.step4[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.step5[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.dicek + 1, src: 'umroh/ting', v: 0.7},
    {f: P.kode + 20, src: 'umroh/ting-5', v: 0.55},
    {f: P.umum[0], src: 'umroh/wush', v: 0.45},
    {f: P.januari, src: 'umroh/dentum', v: 0.55},
    {f: P.berangkat, src: 'umroh/sset', v: 0.45},
    {f: P.semua[0], src: 'umroh/wush', v: 0.45},
    {f: P.outro, src: 'umroh/wush-besar', v: 0.55},
    {f: P.btn + 4, src: 'umroh/ting-5', v: 0.6},
  ];
  P.dots.forEach((at) => ev.push({f: at, src: 'tick', v: 0.6}));
  TAP_FRAMES.forEach((at) => ev.push({f: at, src: 'tick', v: 0.9}));
  P.tierOn.forEach((at, i) => ev.push({f: at + 2, src: `umroh/ting-${i + 1}`, v: 0.5}));
  [0, 1, 2, 3].forEach((i) => ev.push({f: P.semua[0] + 6 + Math.round((i * (P.ikuti - 12 - P.semua[0])) / 4), src: `umroh/ting-${i + 1}`, v: 0.45}));
  ev.push({f: P.ikuti, src: 'umroh/sset', v: 0.45});
  return ev.sort((a, b) => a.f - b.f);
};

export const Sfx: React.FC = () => (
  <>
    {sfxEvents().map((e, i) => (
      <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={60} name={`sfx ${e.src}`}>
        <Html5Audio src={staticFile(`sfx/${e.src}.wav`)} volume={SFX_GAIN * (e.v ?? 1)} />
      </Sequence>
    ))}
  </>
);
