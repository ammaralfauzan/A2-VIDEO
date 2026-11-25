import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {P} from './layout';

// Efek suara halus (tanpa musik), jauh di bawah narator. Bunyi netral dari public/sfx.
export const SFX_GAIN = 0.2;
type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] =>
  [
    {f: P.hookIn, src: 'tick', v: 0.5},
    {f: P.tanda, src: 'chip', v: 0.5},
    {f: P.cardIn, src: 'whoosh', v: 0.3},
    {f: P.jenguk, src: 'tick', v: 0.45},
    {f: P.abuBakar, src: 'tick', v: 0.45},
    {f: P.percik, src: 'ting', v: 0.45},
    {f: P.tanya, src: 'tick', v: 0.45},
    {f: P.wipe, src: 'whoosh', v: 0.35},
    {f: P.ayat11, src: 'ting', v: 0.6},
    {f: P.ayat7, src: 'tick', v: 0.45},
    {f: P.perempuan, src: 'chip', v: 0.55},
    {f: P.tetap, src: 'ting', v: 0.55},
    {f: P.coret, src: 'chip', v: 0.6},
    {f: P.ketetapan, src: 'whoosh', v: 0.3},
    {f: P.logo, src: 'ting', v: 0.5},
  ].sort((a, b) => a.f - b.f);

export const Sfx: React.FC = () => (
  <>
    {sfxEvents().map((e, i) => (
      <Sequence key={i} from={Math.max(0, e.f)} durationInFrames={110} name={`sfx ${e.src}`}>
        <Html5Audio src={staticFile(`sfx/${e.src}.wav`)} volume={SFX_GAIN * (e.v ?? 1)} />
      </Sequence>
    ))}
  </>
);
