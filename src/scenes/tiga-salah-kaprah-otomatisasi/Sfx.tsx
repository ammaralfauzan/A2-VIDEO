import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {P} from './layout';
import {OUTRO} from './Penutup';

// Efek suara halus (tanpa musik, sesuai naskah): cap dan kartu dibalik (scripts/make-sfx-tiga.py),
// sisanya palet A2 (scripts/make-sfx.py). Satu bunyi per kejadian visual, jauh di bawah narator.
export const SFX_GAIN = 0.2;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [
    {f: P.stackIn, src: 'whoosh', v: 0.4},
    {f: P.spread(), src: 'whoosh', v: 0.35},
    {f: P.park() + 2, src: 'whoosh', v: 0.3},
    {f: P.task(0) + 6, src: 'chip', v: 0.55},
    {f: P.task(1) + 6, src: 'chip', v: 0.4},
    {f: P.gather(), src: 'whoosh', v: 0.3},
    {f: P.ask(), src: 'tanya', v: 0.7},
    {f: OUTRO.hop, src: 'whoosh', v: 0.6},
    {f: OUTRO.land, src: 'chip', v: 0.75},
    {f: OUTRO.aIn, src: 'outro'},
    {f: OUTRO.swap[0] - 2, src: 'ting'},
  ];
  for (const i of [0, 1, 2]) {
    if (i > 0) ev.push({f: P.advance(i), src: 'whoosh', v: 0.3});
    ev.push({f: P.showMyth(i) + 4, src: 'tiga/balik-0', v: 0.7});
    ev.push({f: P.stamp(i) + 3, src: 'tiga/cap', v: 0.85});
    ev.push({f: P.flipFact(i) + 4, src: `tiga/balik-${i + 1}`, v: 0.8});
    ev.push({f: P.back(i), src: 'whoosh', v: 0.25});
  }
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
