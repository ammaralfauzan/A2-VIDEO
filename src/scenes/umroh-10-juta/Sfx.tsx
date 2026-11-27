import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {P} from './layout';

// Efek suara halus (tanpa musik, sesuai naskah), palet umroh (scripts/make-sfx-umroh.py). Jauh di bawah narator.
export const SFX_GAIN = 0.2;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [
    {f: P.titleIn, src: 'umroh/wush', v: 0.5},
    {f: P.bisa + 2, src: 'umroh/dentum', v: 0.6},
    {f: P.phone[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.chip500, src: 'umroh/ting-1', v: 0.55},
    {f: P.row[0], src: 'umroh/wush', v: 0.45},
    {f: P.coupon, src: 'umroh/sset', v: 0.5},
    {f: P.stamp + 3, src: 'umroh/dentum', v: 0.7},
    {f: P.fair[0], src: 'umroh/wush', v: 0.4},
    {f: P.utuh, src: 'umroh/ting-2', v: 0.5},
    {f: P.hadiah, src: 'umroh/ting-3', v: 0.5},
    {f: P.halal, src: 'umroh/ting', v: 0.7},
    {f: P.tiers[0], src: 'umroh/wush-besar', v: 0.45},
    {f: P.diamondPulse, src: 'umroh/dentum', v: 0.55},
    {f: P.syarat[0], src: 'umroh/wush', v: 0.4},
    {f: P.teaser[0], src: 'umroh/wush', v: 0.45},
    {f: P.outro, src: 'umroh/wush-besar', v: 0.55},
    {f: P.btn + 6, src: 'umroh/ting-5', v: 0.6},
  ];
  P.coins !== undefined && [0, 1, 2, 3].forEach((i) => ev.push({f: P.coins + i * 4, src: 'tick', v: 0.5}));
  P.tierOn.forEach((at, i) => ev.push({f: at, src: `umroh/ting-${i + 1}`, v: 0.5}));
  P.dots.forEach((at) => ev.push({f: at, src: 'tick', v: 0.7}));
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
