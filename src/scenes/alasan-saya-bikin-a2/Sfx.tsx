import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {S, sf} from '../../data/timeline-alasan-saya-bikin-a2';
import {P} from './layout';
import {OUTRO} from './Penutup';

// Efek suara halus (tanpa musik, sesuai naskah): bunyi sintesis sendiri (scripts/make-sfx.py),
// satu bunyi per kejadian visual, jauh di bawah suara narator.
export const SFX_GAIN = 0.2;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [
    {f: P.grow()[0], src: 'whoosh', v: 0.45},
    {f: P.pointIn(0), src: 'step-1', v: 0.8},
    {f: P.pointIn(1), src: 'step-3', v: 0.8},
    {f: sf(S.waktu), src: 'kaget', v: 0.55},
    {f: P.pointIn(2), src: 'step-5', v: 0.8},
    {f: P.connect() + 2, src: 'connect', v: 0.8},
    {f: P.merge()[0] + 2, src: 'whoosh', v: 0.45},
    {f: P.ring()[0], src: 'whoosh', v: 0.55},
    {f: P.gigiIn()[1] - 2, src: 'chip', v: 0.7},
    {f: OUTRO.hop, src: 'whoosh', v: 0.65},
    {f: OUTRO.land, src: 'chip', v: 0.8},
    {f: OUTRO.aIn, src: 'outro'},
    {f: OUTRO.swap[0] - 2, src: 'ting'},
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
