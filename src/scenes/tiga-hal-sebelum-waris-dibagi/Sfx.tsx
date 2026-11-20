import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {P} from './layout';

// Efek suara halus (tanpa musik), jauh di bawah narator. Memakai bunyi netral dari public/sfx (tick, chip, ting, whoosh).
export const SFX_GAIN = 0.2;
type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] =>
  [
    {f: P.blockIn, src: 'tick', v: 0.5},
    {f: P.morph, src: 'whoosh', v: 0.3},
    ...P.gates.map((f) => ({f, src: 'tick', v: 0.45})),
    ...P.peel.map((f) => ({f: f + 2, src: 'chip', v: 0.7})),
    {f: P.fill, src: 'ting', v: 0.7},
    ...P.list.map((f) => ({f, src: 'tick', v: 0.55})),
    {f: P.headline, src: 'whoosh', v: 0.3},
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
