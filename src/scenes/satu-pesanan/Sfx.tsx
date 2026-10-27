import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {CHUNKS, S, sf, wf} from '../../data/timeline-satu-pesanan';
import {P} from './layout';

// Efek suara khas hasil sintesis sendiri (scripts/make-sfx.py), tiap bunyi menempel pada kejadian visual.
// Volume dijaga jauh di bawah suara narator.
export const SFX_GAIN = 0.22;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [
    {f: P.chipIn() - 1, src: 'chip'},
    {f: P.badge7(), src: 'badge'},
    {f: P.badge7() + 2, src: 'kaget', v: 0.7},
    ...Array.from({length: 7}, (_, i) => ({f: P.stepIn(i), src: `step-${i + 1}`})),
    {f: P.grid() - 4, src: 'whoosh'},
    {f: P.grid() + 8, src: 'cascade'},
    {f: wf(S.hitung, 7) + 1, src: 'kaget', v: 0.6},
    ...Array.from({length: 7}, (_, i) => ({f: sf(S.setiapHari) + 3 + i * 3, src: 'tick', v: 0.7})),
    {f: P.pile(), src: 'pile'},
    {f: P.ring() - 12, src: 'whoosh', v: 0.6},
    {f: P.ring() + 4, src: 'connect'},
    {f: P.compact() - 2, src: 'whoosh', v: 0.6},
    ...CHUNKS.filter((c) => c.sentence === S.otomatis).map((c, i) => ({f: c.from, src: `card-${i + 1}`})),
    {f: P.out(), src: 'whoosh', v: 0.6},
    {f: sf(S.manusia) + 4, src: 'human-1'},
    {f: sf(S.sulit), src: 'human-2'},
    {f: sf(S.pelanggan), src: 'human-3'},
    {f: wf(S.tanya, 2) - 4, src: 'tanya'},
    {f: sf(S.logo) - 6, src: 'outro'},
    {f: wf(S.ajakan, 0), src: 'ting'},
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
