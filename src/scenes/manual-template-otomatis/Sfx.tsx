import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {P} from './layout';
import {OUTRO} from './Penutup';

// Efek suara halus (tanpa musik, sesuai naskah): palet A2 yang sudah ada (scripts/make-sfx.py).
// Satu bunyi per kejadian visual, jauh di bawah narator.
export const SFX_GAIN = 0.2;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [];
  P.stepIn.forEach((f, k) => ev.push({f, src: 'whoosh', v: 0.25 + k * 0.05}));
  [0, 1, 2].forEach((k) => ev.push({f: P.label(k), src: `step-${k + 1}`, v: 0.6}));
  [0, 1, 2].forEach((k) => ev.push({f: P.t1Card(k) + 2, src: 'tick', v: 0.7}));
  [0, 1, 2].forEach((k) => ev.push({f: P.t2Card(k) + 2, src: 'card-' + (k + 1), v: 0.55}));
  ev.push({f: P.t2Btn() + 2, src: 'chip', v: 0.5});
  ev.push({f: P.t2Press() + 4, src: 'tick', v: 0.8});
  [0, 1, 2].forEach((k) => ev.push({f: P.node(k) + 2, src: 'connect', v: 0.55}));
  ev.push({f: P.flowIn() + 2, src: 'whoosh', v: 0.3});
  ev.push({f: P.flowMove(1) + 2, src: 'whoosh', v: 0.25});
  ev.push({f: P.flowMove(2) + 2, src: 'whoosh', v: 0.25});
  [0, 1].forEach((k) => ev.push({f: P.chip(k) + 2, src: 'chip', v: 0.6}));
  ev.push({f: P.report() + 4, src: 'cascade', v: 0.5});
  ev.push({f: P.task() + 2, src: 'chip', v: 0.5});
  ev.push({f: P.taskUp() + 2, src: 'whoosh', v: 0.35});
  ev.push({f: P.compose() + 2, src: 'tanya', v: 0.7});
  ev.push({f: OUTRO.hop, src: 'whoosh', v: 0.6});
  ev.push({f: OUTRO.land, src: 'chip', v: 0.75});
  ev.push({f: OUTRO.aIn, src: 'outro'});
  ev.push({f: OUTRO.swap[0] - 2, src: 'ting'});
  return ev.sort((a, b) => a.f - b.f);
};

export const Sfx: React.FC = () => (
  <>
    {sfxEvents().map((e, i) => (
      <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={110} name={`sfx ${e.src}`}>
        <Html5Audio src={staticFile(`sfx/${e.src}.wav`)} volume={SFX_GAIN * (e.v ?? 1)} />
      </Sequence>
    ))}
  </>
);
