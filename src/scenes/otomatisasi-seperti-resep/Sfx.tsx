import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {BROLL, P} from './layout';
import {OUTRO} from './Penutup';

// Efek suara halus (tanpa musik), palet A2 (scripts/make-sfx.py). Satu bunyi per kejadian visual, jauh di bawah narator.
export const SFX_GAIN = 0.2;
type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [
    {f: BROLL.b1b.from, src: 'whoosh', v: 0.35},
    {f: BROLL.b3.from, src: 'whoosh', v: 0.35},
    {f: BROLL.b2a.from, src: 'whoosh', v: 0.35},
    {f: BROLL.b2b.from, src: 'whoosh', v: 0.3},
    {f: P.potDraw + 6, src: 'tick', v: 0.5},
    {f: P.cardIn + 2, src: 'chip', v: 0.4},
    {f: P.flyPemicu + 14, src: 'chip', v: 0.7},
    {f: P.ingr[0], src: 'tick', v: 0.5},
    {f: P.ingr[1], src: 'tick', v: 0.5},
    {f: P.ingr[2], src: 'tick', v: 0.5},
    {f: P.flyBahan + 14, src: 'chip', v: 0.7},
    {f: P.dataCards + 4, src: 'card-1', v: 0.5},
    {f: P.steps[0], src: 'step-1', v: 0.5},
    {f: P.steps[1], src: 'step-2', v: 0.5},
    {f: P.steps[2], src: 'step-3', v: 0.5},
    {f: P.flyLangkah + 14, src: 'chip', v: 0.7},
    {f: P.arrows[0], src: 'connect', v: 0.45},
    {f: P.arrows[1], src: 'connect', v: 0.45},
    {f: P.rowDown, src: 'whoosh', v: 0.3},
    {f: P.ask, src: 'tanya', v: 0.7},
    {f: OUTRO.gear, src: 'whoosh', v: 0.5},
    {f: OUTRO.aIn, src: 'outro'},
    {f: OUTRO.url + 6, src: 'ting'},
  ];
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
