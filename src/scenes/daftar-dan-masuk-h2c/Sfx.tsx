import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';
import {CLICK_FRAMES} from './Kursor';
import {P, SCREENS, TYPE} from './layout';
import {typedEnd} from './Layar';

// Efek suara halus (tanpa musik, sesuai naskah): klik kursor, ketikan pelan, wush saat kartu bagian, ting saat selesai.
// Palet umroh (scripts/make-sfx-umroh.py) + tick. Jauh di bawah narator.
export const SFX_GAIN = 0.2;

type Ev = {f: number; src: string; v?: number};

export const sfxEvents = (): Ev[] => {
  const ev: Ev[] = [];
  CLICK_FRAMES.forEach((f) => ev.push({f, src: 'tick', v: 0.9}));
  // ketikan: satu tick lembut tiap 3 frame selama mengetik
  Object.values(TYPE).forEach((t) => {
    for (let f = t.from + 2; f < typedEnd(t); f += 3) ev.push({f, src: 'tick', v: 0.22});
  });
  for (let f = P.digitsFrom; f < P.digitsTo; f += Math.round((P.digitsTo - P.digitsFrom) / 6)) ev.push({f, src: 'tick', v: 0.3});
  ev.push({f: P.frameIn, src: 'umroh/wush', v: 0.5});
  ev.push({f: P.sec1[0], src: 'umroh/wush-besar', v: 0.5});
  ev.push({f: P.sec2[0], src: 'umroh/wush-besar', v: 0.5});
  ev.push({f: P.notif, src: 'umroh/ting-1', v: 0.5});
  ev.push({f: P.digitsTo + 2, src: 'umroh/ting-3', v: 0.6});
  ev.push({f: P.done[0] + 2, src: 'umroh/ting', v: 0.8});
  ev.push({f: P.chipEmail, src: 'umroh/ting-2', v: 0.5});
  ev.push({f: P.chipPass, src: 'umroh/ting-4', v: 0.5});
  ev.push({f: P.outro, src: 'umroh/wush', v: 0.6});
  ev.push({f: P.outro + 12, src: 'umroh/ting-5', v: 0.6});
  void SCREENS;
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
